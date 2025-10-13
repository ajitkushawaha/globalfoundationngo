import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import TeamMember from '@/lib/models/TeamMember'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const { id } = params
    
    // Find the team member
    const teamMember = await TeamMember.findById(id)
    if (!teamMember) {
      return NextResponse.json(
        { success: false, error: 'Team member not found' },
        { status: 404 }
      )
    }
    
    // Update status to inactive (rejected)
    teamMember.status = 'inactive'
    teamMember.isPublic = false
    await teamMember.save()
    
    return NextResponse.json({
      success: true,
      message: 'Team member request rejected',
      data: teamMember
    })
  } catch (error) {
    console.error('Error rejecting team member:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to reject team member' },
      { status: 500 }
    )
  }
}
