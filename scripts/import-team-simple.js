const mongoose = require('mongoose')
const fs = require('fs')
require('dotenv').config({ path: '.env.local' })

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB')
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    process.exit(1)
  }
}

// Team Member Schema
const TeamMemberSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  instagramLink: { type: String, trim: true },
  profession: { type: String, required: true, trim: true },
  photo: { type: String, trim: true },
  joinAs: { type: String, required: true, enum: ['team', 'volunteer', 'board_member', 'advisor'] },
  role: { type: String, trim: true },
  department: { type: String, trim: true },
  bio: { type: String, maxlength: 1000 },
  skills: [{ type: String, trim: true }],
  availability: { type: String, enum: ['full_time', 'part_time', 'weekends', 'evenings', 'flexible'], default: 'flexible' },
  status: { type: String, enum: ['active', 'inactive', 'pending', 'suspended'], default: 'active' },
  joinDate: { type: Date, default: Date.now },
  lastActive: { type: Date },
  socialLinks: {
    instagram: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    twitter: { type: String, trim: true },
    facebook: { type: String, trim: true }
  },
  address: {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    country: { type: String, trim: true },
    zipCode: { type: String, trim: true }
  },
  emergencyContact: {
    name: { type: String, trim: true },
    phone: { type: String, trim: true },
    relationship: { type: String, trim: true }
  },
  achievements: [{ type: String, trim: true }],
  notes: { type: String, maxlength: 500 },
  isPublic: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 }
}, {
  timestamps: true
})

const TeamMember = mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema)

// Helper function to generate email from name
const generateEmail = (fullName) => {
  if (!fullName) return 'unknown@gekct.org'
  const name = fullName.toLowerCase().replace(/\s+/g, '.').replace(/[^a-z.]/g, '')
  return `${name}@gekct.org`
}

// Helper function to map join as
const mapJoinAs = (value) => {
  if (!value) return 'volunteer'
  const lower = value.toLowerCase()
  if (lower.includes('team')) return 'team'
  if (lower.includes('volunteer')) return 'volunteer'
  if (lower.includes('board') || lower.includes('director') || lower.includes('trustee')) return 'board_member'
  if (lower.includes('advisor') || lower.includes('consultant')) return 'advisor'
  return 'volunteer'
}

const importTeamMembers = async () => {
  try {
    await connectDB()
    
    console.log('📁 Reading CSV file: team.csv')
    
    // Read CSV file
    const csvContent = fs.readFileSync('team.csv', 'utf8')
    const lines = csvContent.split('\n')
    
    // Skip header row
    const dataLines = lines.slice(1).filter(line => line.trim())
    
    console.log(`📊 Processing ${dataLines.length} data rows...`)
    
    const teamMembers = []
    let successCount = 0
    let errorCount = 0
    
    for (let i = 0; i < dataLines.length; i++) {
      const line = dataLines[i].trim()
      if (!line) continue
      
      try {
        // Simple CSV parsing
        const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''))
        
        if (values.length < 9) {
          console.warn(`⚠️  Row ${i + 2}: Not enough columns`)
          errorCount++
          continue
        }
        
        const [timestamp, fullName, instagramLink, profession, photo, joinAs, phone, dateOfBirth, address] = values
        
        // Skip if missing required fields
        if (!fullName || !phone || !profession) {
          console.warn(`⚠️  Row ${i + 2}: Missing required fields`)
          errorCount++
          continue
        }
        
        // Create team member object
        const teamMember = {
          fullName: fullName.trim(),
          email: generateEmail(fullName),
          phone: phone.trim(),
          profession: profession.trim(),
          instagramLink: instagramLink && instagramLink !== 'No' ? instagramLink.trim() : undefined,
          photo: photo && photo.startsWith('http') ? photo.trim() : undefined,
          joinAs: mapJoinAs(joinAs),
          status: 'active',
          availability: 'flexible',
          address: {
            street: address ? address.trim() : undefined,
            city: 'Ahmedabad',
            state: 'Gujarat',
            country: 'India'
          },
          isPublic: true,
          sortOrder: i + 1
        }
        
        teamMembers.push(teamMember)
        successCount++
        console.log(`✅ Row ${i + 2}: ${teamMember.fullName} - ${teamMember.profession} (${teamMember.joinAs})`)
        
      } catch (error) {
        console.error(`❌ Row ${i + 2}: Error processing row:`, error.message)
        errorCount++
      }
    }
    
    console.log(`\n📊 Processing Complete:`)
    console.log(`   Total rows: ${dataLines.length}`)
    console.log(`   Valid rows: ${successCount}`)
    console.log(`   Error rows: ${errorCount}`)
    
    if (teamMembers.length === 0) {
      console.log('❌ No valid team members to import')
      return
    }
    
    // Insert team members
    console.log('\n💾 Inserting team members into database...')
    const createdMembers = await TeamMember.insertMany(teamMembers, { ordered: false })
    console.log(`\n✅ Successfully imported ${createdMembers.length} team members`)
    
    // Display summary
    console.log('\n📋 Imported Team Members:')
    createdMembers.forEach((member, index) => {
      console.log(`${index + 1}. ${member.fullName} - ${member.profession} (${member.joinAs})`)
    })
    
    console.log('\n🎉 Import completed successfully!')
    
  } catch (error) {
    console.error('❌ Import error:', error)
  } finally {
    await mongoose.connection.close()
    console.log('🔌 Database connection closed')
  }
}

// Run the import
importTeamMembers()
