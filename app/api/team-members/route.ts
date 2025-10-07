import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import TeamMember from '@/lib/models/TeamMember'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const joinAs = searchParams.get('joinAs')
    const status = searchParams.get('status')
    const isPublic = searchParams.get('public')
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const sortBy = searchParams.get('sortBy') || 'joinDate'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    
    // Build filter object
    const filter: any = {}
    if (joinAs) filter.joinAs = joinAs
    if (status) filter.status = status
    if (isPublic !== null) filter.isPublic = isPublic === 'true'
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { profession: { $regex: search, $options: 'i' } },
        { skills: { $in: [new RegExp(search, 'i')] } }
      ]
    }
    
    // Calculate pagination
    const skip = (page - 1) * limit
    
    // Build sort object
    const sort: any = {}
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1
    
    const [teamMembers, total] = await Promise.all([
      TeamMember.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      TeamMember.countDocuments(filter)
    ])
    
    return NextResponse.json({
      success: true,
      data: teamMembers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching team members:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch team members' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['fullName', 'email', 'phone', 'profession', 'joinAs']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        )
      }
    }
    
    // Check if email already exists
    const existingMember = await TeamMember.findOne({ email: body.email })
    if (existingMember) {
      return NextResponse.json(
        { success: false, error: 'Email already exists' },
        { status: 400 }
      )
    }
    
    const teamMember = new TeamMember(body)
    await teamMember.save()
    
    return NextResponse.json({
      success: true,
      data: teamMember,
      message: 'Team member created successfully'
    })
  } catch (error) {
    console.error('Error creating team member:', error)
    
    if (error instanceof Error && error.message.includes('duplicate key')) {
      return NextResponse.json(
        { success: false, error: 'Email already exists' },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to create team member' },
      { status: 500 }
    )
  }
}
