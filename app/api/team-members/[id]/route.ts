import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import TeamMember from '@/lib/models/TeamMember'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const teamMember = await TeamMember.findById(params.id).lean()
    
    if (!teamMember) {
      return NextResponse.json(
        { success: false, error: 'Team member not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: teamMember
    })
  } catch (error) {
    console.error('Error fetching team member:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch team member' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const body = await request.json()
    
    // Check if email is being updated and if it already exists
    if (body.email) {
      const existingMember = await TeamMember.findOne({ 
        email: body.email, 
        _id: { $ne: params.id } 
      })
      if (existingMember) {
        return NextResponse.json(
          { success: false, error: 'Email already exists' },
          { status: 400 }
        )
      }
    }
    
    const teamMember = await TeamMember.findByIdAndUpdate(
      params.id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    )
    
    if (!teamMember) {
      return NextResponse.json(
        { success: false, error: 'Team member not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: teamMember,
      message: 'Team member updated successfully'
    })
  } catch (error) {
    console.error('Error updating team member:', error)
    
    if (error instanceof Error && error.message.includes('duplicate key')) {
      return NextResponse.json(
        { success: false, error: 'Email already exists' },
        { status: 400 }
      )
    }
    
    // Handle validation errors
    if (error instanceof Error && error.name === 'ValidationError') {
      const validationErrors = Object.values((error as any).errors).map((err: any) => err.message)
      return NextResponse.json(
        { success: false, error: `Validation failed: ${validationErrors.join(', ')}` },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to update team member' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const teamMember = await TeamMember.findByIdAndDelete(params.id)
    
    if (!teamMember) {
      return NextResponse.json(
        { success: false, error: 'Team member not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Team member deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting team member:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete team member' },
      { status: 500 }
    )
  }
}
