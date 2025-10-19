import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import DonationCategory from '@/lib/models/DonationCategory'
import CycleCounter from '@/lib/models/CycleCounter'

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase()

    // Get all active donation categories
    const categories = await DonationCategory.find({ isActive: true })

    if (categories.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'No active donation categories found' 
      }, { status: 404 })
    }

    // Check if all categories have reached their targets
    const allTargetsReached = categories.every(category => 
      category.currentFunded >= category.targetGoal
    )

    if (!allTargetsReached) {
      return NextResponse.json({ 
        success: false, 
        message: 'Not all categories have reached their targets yet' 
      }, { status: 400 })
    }

    // Calculate total donations before reset
    const totalDonations = categories.reduce((total, category) => {
      return total + (category.currentFunded * category.unitPrice)
    }, 0)

    // Get or create cycle counter
    let cycleCounter = await CycleCounter.findOne()
    if (!cycleCounter) {
      cycleCounter = await CycleCounter.create({
        currentCycle: 1,
        totalResets: 0,
        lastResetDate: new Date()
      })
    }

    // Increment cycle counter
    const nextCycleNumber = cycleCounter.currentCycle + 1
    await CycleCounter.findByIdAndUpdate(cycleCounter._id, {
      currentCycle: nextCycleNumber,
      totalResets: cycleCounter.totalResets + 1,
      lastResetDate: new Date()
    })

    // Reset all categories
    const resetPromises = categories.map(category => 
      DonationCategory.findByIdAndUpdate(category._id, {
        currentFunded: 0,
        donors: 0,
        progressPercentage: 0
      })
    )

    await Promise.all(resetPromises)

    console.log(`Donation categories reset! Cycle #${nextCycleNumber} - Total donations: ₹${totalDonations}`)

    return NextResponse.json({
      success: true,
      message: 'All donation categories have been reset successfully',
      cycleNumber: nextCycleNumber,
      totalDonations: totalDonations,
      resetCategories: categories.length,
      totalResets: cycleCounter.totalResets + 1
    })

  } catch (error) {
    console.error('Error resetting donation categories:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error' 
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()

    // Get all active donation categories
    const categories = await DonationCategory.find({ isActive: true })

    if (categories.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'No active donation categories found' 
      }, { status: 404 })
    }

    // Check if all categories have reached their targets
    const allTargetsReached = categories.every(category => 
      category.currentFunded >= category.targetGoal
    )

    // Calculate total donations
    const totalDonations = categories.reduce((total, category) => {
      return total + (category.currentFunded * category.unitPrice)
    }, 0)

    return NextResponse.json({
      success: true,
      data: {
        allTargetsReached,
        totalDonations,
        categories: categories.map(category => ({
          ...category.toObject(),
          progressPercentage: Math.round((category.currentFunded / category.targetGoal) * 100)
        })),
        canReset: allTargetsReached
      }
    })

  } catch (error) {
    console.error('Error checking donation categories status:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error' 
    }, { status: 500 })
  }
}