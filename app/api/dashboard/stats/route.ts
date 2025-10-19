import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import DonationCategory from '@/lib/models/DonationCategory'
import CycleCounter from '@/lib/models/CycleCounter'

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()

    // Get all active donation categories
    const categories = await DonationCategory.find({ isActive: true })

    // Get cycle counter
    let cycleCounter = await CycleCounter.findOne()
    if (!cycleCounter) {
      cycleCounter = await CycleCounter.create({
        currentCycle: 1,
        totalResets: 0,
        lastResetDate: new Date()
      })
    }

    // Get current cycle donations
    const currentTotalDonations = categories.reduce((total, category) => {
      return total + (category.currentFunded * category.unitPrice)
    }, 0)

    // Check if all categories have reached their targets
    const allTargetsReached = categories.every(category => 
      category.currentFunded >= category.targetGoal
    )

    // Calculate progress for each category
    const categoriesWithProgress = categories.map(category => ({
      ...category.toObject(),
      progressPercentage: Math.round((category.currentFunded / category.targetGoal) * 100),
      totalAmount: category.currentFunded * category.unitPrice
    }))

    return NextResponse.json({
      success: true,
      data: {
        // Current cycle stats
        currentCycle: {
          totalDonations: currentTotalDonations,
          categories: categoriesWithProgress,
          allTargetsReached,
          canReset: allTargetsReached
        },
        // Historical stats (simplified for now)
        historical: {
          totalDonations: 0,
          completedCycles: 0,
          averagePerCycle: 0
        },
        // Overall stats
        overall: {
          grandTotalDonations: currentTotalDonations,
          totalDonors: 0,
          totalCategories: categories.length,
          recentDonations: []
        },
        // Cycle info
        cycle: {
          currentCycle: cycleCounter.currentCycle,
          completedCycles: cycleCounter.totalResets,
          lastResetDate: cycleCounter.lastResetDate,
          nextResetAvailable: allTargetsReached
        }
      }
    })

  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}