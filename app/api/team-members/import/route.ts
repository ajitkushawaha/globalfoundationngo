import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import TeamMember from '@/lib/models/TeamMember'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const { csvData } = await request.json()
    
    if (!csvData) {
      return NextResponse.json(
        { success: false, error: 'CSV data is required' },
        { status: 400 }
      )
    }
    
    // Parse CSV data
    const lines = csvData.trim().split('\n')
    if (lines.length < 2) {
      return NextResponse.json(
        { success: false, error: 'CSV must have at least a header row and one data row' },
        { status: 400 }
      )
    }
    
    // Get headers
    const headers = lines[0].split(',').map((h: string) => h.trim().replace(/"/g, ''))
    
    // Parse data rows
    const teamMembers = []
    const errors = []
    let imported = 0
    let skipped = 0
    
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue
      
      try {
        // Simple CSV parsing (handles basic cases)
        const values = parseCSVLine(line)
        
        if (values.length !== headers.length) {
          errors.push(`Row ${i + 1}: Column count mismatch`)
          continue
        }
        
        // Create row object
        const row: any = {}
        headers.forEach((header: string, index: number) => {
          row[header] = values[index]?.trim() || ''
        })
        
        // Map to schema
        const mappedData = mapCSVToSchema(row)
        
        // Validate required fields
        if (!mappedData.fullName || !mappedData.email || !mappedData.phone || !mappedData.profession) {
          errors.push(`Row ${i + 1}: Missing required fields (Name, Email, Phone, Profession)`)
          continue
        }
        
        // Check if email already exists
        const existingMember = await TeamMember.findOne({ email: mappedData.email })
        if (existingMember) {
          skipped++
          continue
        }
        
        teamMembers.push(mappedData)
        imported++
        
      } catch (error) {
        errors.push(`Row ${i + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`)
      }
    }
    
    // Insert team members
    let importedMembers = []
    if (teamMembers.length > 0) {
      try {
        importedMembers = await TeamMember.insertMany(teamMembers)
      } catch (error) {
        console.error('Error inserting team members:', error)
        return NextResponse.json(
          { success: false, error: 'Failed to insert team members' },
          { status: 500 }
        )
      }
    }
    
    return NextResponse.json({
      success: true,
      data: {
        imported,
        skipped,
        errors: errors.length,
        errorDetails: errors,
        importedMembers: importedMembers.map(member => ({
          fullName: member.fullName,
          profession: member.profession,
          joinAs: member.joinAs
        }))
      }
    })
    
  } catch (error) {
    console.error('Import error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to import team members' },
      { status: 500 }
    )
  }
}

// Simple CSV line parser
function parseCSVLine(line: string): string[] {
  const result = []
  let current = ''
  let inQuotes = false
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    
    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current)
      current = ''
    } else {
      current += char
    }
  }
  
  result.push(current)
  return result
}

// Function to map CSV columns to our schema
function mapCSVToSchema(row: any) {
  return {
    fullName: row['Full Name'] || row['Name'] || row['fullName'] || row['name'],
    email: row['Email'] || row['email'] || row['Email Address'],
    phone: row['Phone'] || row['phone'] || row['Phone Number'] || row['Mobile'],
    profession: row['Profession'] || row['profession'] || row['Job Title'] || row['Position'],
    instagramLink: row['Instagram Link'] || row['Instagram'] || row['instagram'],
    joinAs: mapJoinAs(row['Join As'] || row['Type'] || row['Category'] || row['joinAs']),
    role: row['Role'] || row['role'] || row['Job Role'],
    department: row['Department'] || row['department'] || row['Division'],
    skills: parseSkills(row['Skills'] || row['skills'] || row['Expertise']),
    availability: mapAvailability(row['Availability'] || row['availability'] || row['Time']),
    status: mapStatus(row['Status'] || row['status'] || row['Active']),
    address: {
      city: row['City'] || row['city'],
      state: row['State'] || row['state'],
      country: row['Country'] || row['country'] || 'India',
      zipCode: row['Zip'] || row['zip'] || row['Pincode']
    },
    socialLinks: {
      linkedin: row['LinkedIn'] || row['linkedin'],
      twitter: row['Twitter'] || row['twitter'],
      facebook: row['Facebook'] || row['facebook']
    },
    isPublic: row['Public'] === 'Yes' || row['Public'] === 'true' || row['isPublic'] === 'true',
    sortOrder: parseInt(row['Sort Order'] || row['sortOrder'] || '0') || 0
  }
}

// Helper functions
function mapJoinAs(value: string) {
  if (!value) return 'volunteer'
  const lower = value.toLowerCase()
  if (lower.includes('team') || lower.includes('staff') || lower.includes('employee')) return 'team'
  if (lower.includes('volunteer')) return 'volunteer'
  if (lower.includes('board') || lower.includes('director')) return 'board_member'
  if (lower.includes('advisor') || lower.includes('consultant')) return 'advisor'
  return 'volunteer'
}

function mapAvailability(value: string) {
  if (!value) return 'flexible'
  const lower = value.toLowerCase()
  if (lower.includes('full') || lower.includes('full-time')) return 'full_time'
  if (lower.includes('part') || lower.includes('part-time')) return 'part_time'
  if (lower.includes('weekend')) return 'weekends'
  if (lower.includes('evening')) return 'evenings'
  return 'flexible'
}

function mapStatus(value: string) {
  if (!value) return 'pending'
  const lower = value.toLowerCase()
  if (lower.includes('active') || lower.includes('yes') || lower === 'true') return 'active'
  if (lower.includes('inactive') || lower.includes('no') || lower === 'false') return 'inactive'
  if (lower.includes('pending')) return 'pending'
  if (lower.includes('suspend')) return 'suspended'
  return 'pending'
}

function parseSkills(skillsString: string) {
  if (!skillsString) return []
  return skillsString.split(';').map(skill => skill.trim()).filter(skill => skill.length > 0)
}
