import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import OrganizationSettings from '@/lib/models/OrganizationSettings'

export const dynamic = 'force-dynamic'

// GET /api/organization-settings - Get organization settings
export async function GET() {
  try {
    await connectToDatabase()
    
    let settings = await OrganizationSettings.findOne({ isActive: true }).lean()
    
    // If no settings exist, create default settings
    if (!settings) {
      const defaultSettings = new OrganizationSettings({
        lastUpdatedBy: 'System'
      })
      await defaultSettings.save()
      settings = defaultSettings.toObject()
    }
    
    return NextResponse.json({
      success: true,
      data: settings
    })
  } catch (error) {
    console.error('Error fetching organization settings:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch organization settings' },
      { status: 500 }
    )
  }
}

// PUT /api/organization-settings - Update organization settings
export async function PUT(request: NextRequest) {
  try {
    await connectToDatabase()
    
    const body = await request.json()
    
    // Find existing active settings or create new ones
    let settings = await OrganizationSettings.findOne({ isActive: true })
    
    if (!settings) {
      settings = new OrganizationSettings({
        lastUpdatedBy: body.lastUpdatedBy || 'Admin'
      })
    } else {
      settings.lastUpdatedBy = body.lastUpdatedBy || 'Admin'
    }
    
    // Update fields
    if (body.organizationName) settings.organizationName = body.organizationName
    if (body.legalName) settings.legalName = body.legalName
    if (body.registrationNumber) settings.registrationNumber = body.registrationNumber
    
    if (body.address) {
      if (body.address.street) settings.address.street = body.address.street
      if (body.address.city) settings.address.city = body.address.city
      if (body.address.state) settings.address.state = body.address.state
      if (body.address.country) settings.address.country = body.address.country
      if (body.address.zipCode) settings.address.zipCode = body.address.zipCode
    }
    
    if (body.contact) {
      if (body.contact.phone) settings.contact.phone = body.contact.phone
      if (body.contact.email) settings.contact.email = body.contact.email
      if (body.contact.website) settings.contact.website = body.contact.website
    }
    
    if (body.bankDetails) {
      if (body.bankDetails.accountName) settings.bankDetails.accountName = body.bankDetails.accountName
      if (body.bankDetails.accountNumber) settings.bankDetails.accountNumber = body.bankDetails.accountNumber
      if (body.bankDetails.ifscCode) settings.bankDetails.ifscCode = body.bankDetails.ifscCode
      if (body.bankDetails.bankName) settings.bankDetails.bankName = body.bankDetails.bankName
      if (body.bankDetails.branch) settings.bankDetails.branch = body.bankDetails.branch
      if (body.bankDetails.upiId) settings.bankDetails.upiId = body.bankDetails.upiId
    }
    
    if (body.socialMedia) {
      if (body.socialMedia.facebook) settings.socialMedia.facebook = body.socialMedia.facebook
      if (body.socialMedia.twitter) settings.socialMedia.twitter = body.socialMedia.twitter
      if (body.socialMedia.instagram) settings.socialMedia.instagram = body.socialMedia.instagram
      if (body.socialMedia.linkedin) settings.socialMedia.linkedin = body.socialMedia.linkedin
      if (body.socialMedia.youtube) settings.socialMedia.youtube = body.socialMedia.youtube
    }
    
    if (body.seo) {
      if (body.seo.title) settings.seo.title = body.seo.title
      if (body.seo.description) settings.seo.description = body.seo.description
      if (body.seo.keywords) settings.seo.keywords = body.seo.keywords
      if (body.seo.ogImage) settings.seo.ogImage = body.seo.ogImage
    }
    
    await settings.save()
    
    return NextResponse.json({
      success: true,
      data: settings,
      message: 'Organization settings updated successfully'
    })
  } catch (error) {
    console.error('Error updating organization settings:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update organization settings' },
      { status: 500 }
    )
  }
}
