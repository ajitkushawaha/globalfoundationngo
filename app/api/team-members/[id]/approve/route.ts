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
    
    // Update status to active
    teamMember.status = 'active'
    teamMember.isPublic = true
    await teamMember.save()
    
    return NextResponse.json({
      success: true,
      message: 'Team member approved successfully',
      data: teamMember
    })
  } catch (error) {
    console.error('Error approving team member:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to approve team member' },
      { status: 500 }
    )
  }
}
