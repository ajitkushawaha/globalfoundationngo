import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import TeamMember from '@/lib/models/TeamMember'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'active'
    const joinAs = searchParams.get('joinAs')
    const limit = parseInt(searchParams.get('limit') || '50')
    const isPublic = searchParams.get('isPublic') === 'true'
    
    // Build query
    const query: any = {}
    
    if (status) {
      query.status = status
    }
    
    if (joinAs) {
      query.joinAs = joinAs
    }
    
    if (isPublic) {
      query.isPublic = true
    }
    
    // Get team members
    const teamMembers = await TeamMember.find(query)
      .select('fullName email phone instagramLink profession photo joinAs role department bio skills status socialLinks address')
      .sort({ sortOrder: 1, fullName: 1 })
      .limit(limit)
    
    return NextResponse.json({
      success: true,
      data: teamMembers,
      count: teamMembers.length
    })
    
  } catch (error) {
    console.error('Error fetching public team members:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch team members' },
      { status: 500 }
    )
  }
}
