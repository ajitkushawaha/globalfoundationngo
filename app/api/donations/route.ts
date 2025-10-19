import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Donation from '@/lib/models/Donation'
import DonationCategory from '@/lib/models/DonationCategory'

// POST: create a pending donation (no counters increment here)
export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const items = Array.isArray(body?.items) ? body.items : []
    const donor = body?.donor || {}
    const totalAmount = Number(body?.totalAmount || 0)

    // Helper: basic email validation
    const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email)
    const donorName = String(donor?.name || '').trim()
    const donorEmailRaw = String(donor?.email || '').trim()
    const donorEmail = donorEmailRaw.toLowerCase()

    if (!items.length) {
      return NextResponse.json({ success: false, error: 'No donation items' }, { status: 400 })
    }
    if (!donorName || !donorEmail) {
      return NextResponse.json({ success: false, error: 'Donor name and email are required' }, { status: 400 })
    }
    if (!isValidEmail(donorEmail)) {
      return NextResponse.json({ success: false, error: 'Invalid donor email address' }, { status: 400 })
    }

    const donationRef = `DON-${Date.now()}`

    const doc = await Donation.create({
      donor: {
        name: donorName,
        email: donorEmail,
        phone: donor.phone ? String(donor.phone) : '',
        instagram: donor.instagram ? String(donor.instagram) : '',
        message: donor.message ? String(donor.message) : '',
        anonymous: !!donor.anonymous,
      },
      items: items.map((it: any) => ({
        categoryId: String(it.categoryId),
        categoryName: String(it.categoryName || ''),
        unit: String(it.unit || ''),
        unitPrice: Number(it.unitPrice || 0),
        quantity: Number(it.quantity || 0),
        total: Number(it.total || 0),
      })),
      totalAmount,
      status: 'pending',
      donationRef,
    })

    console.log('New donation received (pending):', { donationRef, totalAmount, itemsCount: items.length })

    // Send admin notification
    try {
      const { sendAdminNotification } = await import('@/lib/mail')
      // Convert Mongoose document to plain object
      const donationData = doc.toObject()
      await sendAdminNotification(donationData)
    } catch (e) {
      console.warn('Admin notification not sent:', e)
    }

    return NextResponse.json({ success: true, message: 'Donation submitted successfully', donationId: donationRef })
  } catch (error) {
    console.error('Error processing donation:', error)
    return NextResponse.json({ success: false, error: 'Failed to process donation' }, { status: 500 })
  }
}

// GET: list donations (optionally by status)
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || undefined
    const limit = Math.min(Number(searchParams.get('limit') || 50), 100)

    const filter: any = {}
    if (status) filter.status = status

    const donations = await Donation.find(filter).sort({ createdAt: -1 }).limit(limit).lean()
    return NextResponse.json({ success: true, data: donations })
  } catch (error) {
    console.error('Error listing donations:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch donations' }, { status: 500 })
  }
}

// PATCH: approve or reject a donation
export async function PATCH(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    const { donationRef, action } = body || {}

    if (!donationRef || !action) {
      return NextResponse.json({ success: false, error: 'donationRef and action are required' }, { status: 400 })
    }

    const donation = await Donation.findOne({ donationRef })
    if (!donation) return NextResponse.json({ success: false, error: 'Donation not found' }, { status: 404 })

    if (action === 'approve') {
      if (donation.status === 'approved') {
        return NextResponse.json({ success: true, message: 'Already approved' })
      }

      // increment categories: currentFunded by quantity; donors +1 per category
      const updates = donation.items.map(async (it: any) => {
        const filter: any = { $or: [{ slug: it.categoryId }] }
        // Also try ObjectId if matches
        // We keep it simple: try slug match; if no doc updated, try by _id
        let updated = await DonationCategory.findOneAndUpdate({ slug: it.categoryId }, { $inc: { currentFunded: it.quantity, donors: 1 } })
        if (!updated) {
          try {
            updated = await DonationCategory.findOneAndUpdate({ _id: it.categoryId as any }, { $inc: { currentFunded: it.quantity, donors: 1 } })
          } catch {}
        }
      })
      await Promise.all(updates)

      donation.status = 'approved'
      donation.approvedAt = new Date()
      await donation.save()

      // best-effort email
      try {
        const { sendDonationEmail } = await import('@/lib/mail')
        await sendDonationEmail({
          to: donation.donor.email,
          subject: '🎉 Donation Received - Thank You for Your Support!'
        }, {
          donorName: donation.donor.name,
          donationRef: donation.donationRef,
          totalAmount: donation.totalAmount,
          status: 'approved',
          items: donation.items,
          donorMessage: donation.donor.message,
          approvedAt: donation.approvedAt,
          createdAt: donation.createdAt
        })
      } catch (e) {
        console.warn('Email not sent:', e)
      }

      return NextResponse.json({ success: true, message: 'Donation approved' })
    }

    if (action === 'reject') {
      donation.status = 'rejected'
      await donation.save()

      // best-effort email on rejection
      try {
        const { sendDonationEmail } = await import('@/lib/mail')
        await sendDonationEmail({
          to: donation.donor.email,
          subject: 'Important Update: Your Donation Request'
        }, {
          donorName: donation.donor.name,
          donationRef: donation.donationRef,
          totalAmount: donation.totalAmount,
          status: 'rejected',
          items: donation.items,
          donorMessage: donation.donor.message,
          createdAt: donation.createdAt
        })
      } catch (e) {
        console.warn('Email not sent (reject):', e)
      }

      return NextResponse.json({ success: true, message: 'Donation rejected' })
    }

    if (action === 'bank_verification') {
      const { bankVerified, bankVerificationNotes } = body
      
      donation.bankVerified = bankVerified
      if (bankVerificationNotes) {
        donation.bankVerificationNotes = bankVerificationNotes
      }
      await donation.save()

      return NextResponse.json({ success: true, message: 'Bank verification updated' })
    }

    return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 400 })
  } catch (error) {
    console.error('Error updating donation:', error)
    return NextResponse.json({ success: false, error: 'Failed to update donation' }, { status: 500 })
  }
}

// DELETE: Clear all donations (admin only)
export async function DELETE(request: NextRequest) {
  try {
    await connectDB()

    // Delete all donations
    const result = await Donation.deleteMany({})
    
    console.log(`🗑️ Deleted ${result.deletedCount} donations from database`)

    return NextResponse.json({ 
      success: true, 
      message: `Successfully deleted ${result.deletedCount} donations`,
      deletedCount: result.deletedCount
    })

  } catch (error) {
    console.error('Error clearing donations:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to clear donations' 
    }, { status: 500 })
  }
}
