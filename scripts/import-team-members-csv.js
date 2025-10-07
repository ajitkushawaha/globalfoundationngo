const mongoose = require('mongoose')
const fs = require('fs')
const csv = require('csv-parser')
const path = require('path')
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
  status: { type: String, enum: ['active', 'inactive', 'pending', 'suspended'], default: 'pending' },
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

// Function to map CSV columns to our schema
const mapCSVToSchema = (csvRow) => {
  // Map your specific CSV columns
  const mapping = {
    // Basic info - using your exact column names
    fullName: csvRow['Full Name '] || csvRow['Full Name'] || csvRow['Name'] || csvRow['fullName'] || csvRow['name'],
    email: csvRow['Email'] || csvRow['email'] || csvRow['Email Address'] || generateEmail(csvRow['Full Name '] || csvRow['Full Name']),
    phone: csvRow['Mobile Number'] || csvRow['Phone'] || csvRow['phone'] || csvRow['Phone Number'] || csvRow['Mobile'],
    profession: csvRow['Profession '] || csvRow['Profession'] || csvRow['profession'] || csvRow['Job Title'] || csvRow['Position'],
    
    // Social links
    instagramLink: csvRow['Instagram Link'] || csvRow['Instagram'] || csvRow['instagram'],
    
    // Photo
    photo: csvRow['9:16 Ratio Full HD  Photo'] || csvRow['Photo'] || csvRow['photo'],
    
    // Role and department
    joinAs: mapJoinAs(csvRow['Join As'] || csvRow['Type'] || csvRow['Category'] || csvRow['joinAs']),
    role: csvRow['Role'] || csvRow['role'] || csvRow['Job Role'],
    department: csvRow['Department'] || csvRow['department'] || csvRow['Division'],
    
    // Additional info
    bio: csvRow['Bio'] || csvRow['bio'] || csvRow['Description'] || csvRow['About'],
    skills: parseSkills(csvRow['Skills'] || csvRow['skills'] || csvRow['Expertise']),
    availability: mapAvailability(csvRow['Availability'] || csvRow['availability'] || csvRow['Time']),
    status: mapStatus(csvRow['Status'] || csvRow['status'] || csvRow['Active']),
    
    // Address
    address: {
      street: csvRow['Address'] || csvRow['address'],
      city: csvRow['City'] || csvRow['city'] || 'Ahmedabad', // Default to Ahmedabad since most are from there
      state: csvRow['State'] || csvRow['state'] || 'Gujarat',
      country: csvRow['Country'] || csvRow['country'] || 'India',
      zipCode: csvRow['Zip'] || csvRow['zip'] || csvRow['Pincode']
    },
    
    // Social links
    socialLinks: {
      linkedin: csvRow['LinkedIn'] || csvRow['linkedin'],
      twitter: csvRow['Twitter'] || csvRow['twitter'],
      facebook: csvRow['Facebook'] || csvRow['facebook']
    },
    
    // Settings
    isPublic: csvRow['Public'] === 'Yes' || csvRow['Public'] === 'true' || csvRow['isPublic'] === 'true',
    sortOrder: parseInt(csvRow['Sort Order'] || csvRow['sortOrder'] || '0') || 0
  }
  
  return mapping
}

// Helper function to generate email from name
const generateEmail = (fullName) => {
  if (!fullName) return 'unknown@gekct.org'
  const name = fullName.toLowerCase().replace(/\s+/g, '.').replace(/[^a-z.]/g, '')
  return `${name}@gekct.org`
}

// Helper functions to map values
const mapJoinAs = (value) => {
  if (!value) return 'volunteer'
  const lower = value.toLowerCase()
  if (lower.includes('team') || lower.includes('staff') || lower.includes('employee')) return 'team'
  if (lower.includes('volunteer')) return 'volunteer'
  if (lower.includes('board') || lower.includes('director') || lower.includes('trustee')) return 'board_member'
  if (lower.includes('advisor') || lower.includes('consultant')) return 'advisor'
  return 'volunteer' // default
}

const mapAvailability = (value) => {
  if (!value) return 'flexible'
  const lower = value.toLowerCase()
  if (lower.includes('full') || lower.includes('full-time')) return 'full_time'
  if (lower.includes('part') || lower.includes('part-time')) return 'part_time'
  if (lower.includes('weekend')) return 'weekends'
  if (lower.includes('evening')) return 'evenings'
  return 'flexible'
}

const mapStatus = (value) => {
  if (!value) return 'pending'
  const lower = value.toLowerCase()
  if (lower.includes('active') || lower.includes('yes') || lower === 'true') return 'active'
  if (lower.includes('inactive') || lower.includes('no') || lower === 'false') return 'inactive'
  if (lower.includes('pending')) return 'pending'
  if (lower.includes('suspend')) return 'suspended'
  return 'pending'
}

const parseSkills = (skillsString) => {
  if (!skillsString) return []
  return skillsString.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0)
}

const importFromCSV = async (csvFilePath) => {
  try {
    await connectDB()
    
    console.log('📁 Reading CSV file:', csvFilePath)
    
    const teamMembers = []
    let rowCount = 0
    let errorCount = 0
    
    return new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on('data', (row) => {
          rowCount++
          try {
            const mappedData = mapCSVToSchema(row)
            
            // Validate required fields
            if (!mappedData.fullName || !mappedData.email || !mappedData.phone || !mappedData.profession) {
              console.warn(`⚠️  Row ${rowCount}: Missing required fields (Name, Email, Phone, Profession)`)
              errorCount++
              return
            }
            
            teamMembers.push(mappedData)
            console.log(`✅ Row ${rowCount}: ${mappedData.fullName} - ${mappedData.profession}`)
          } catch (error) {
            console.error(`❌ Row ${rowCount}: Error processing row:`, error.message)
            errorCount++
          }
        })
        .on('end', async () => {
          console.log(`\n📊 CSV Processing Complete:`)
          console.log(`   Total rows: ${rowCount}`)
          console.log(`   Valid rows: ${teamMembers.length}`)
          console.log(`   Error rows: ${errorCount}`)
          
          if (teamMembers.length === 0) {
            console.log('❌ No valid team members to import')
            resolve()
            return
          }
          
          try {
            // Clear existing team members (optional - remove this line if you want to keep existing data)
            // await TeamMember.deleteMany({})
            // console.log('🗑️  Cleared existing team members')
            
            // Insert new team members
            const createdMembers = await TeamMember.insertMany(teamMembers, { ordered: false })
            console.log(`\n✅ Successfully imported ${createdMembers.length} team members`)
            
            // Display summary
            console.log('\n📋 Imported Team Members:')
            createdMembers.forEach((member, index) => {
              console.log(`${index + 1}. ${member.fullName} - ${member.profession} (${member.joinAs})`)
            })
            
            console.log('\n🎉 Import completed successfully!')
            
          } catch (error) {
            if (error.code === 11000) {
              console.log('⚠️  Some members already exist (duplicate emails). Skipping duplicates.')
              console.log('✅ Import completed with some duplicates skipped.')
            } else {
              console.error('❌ Error importing team members:', error)
            }
          }
          
          resolve()
        })
        .on('error', (error) => {
          console.error('❌ Error reading CSV file:', error)
          reject(error)
        })
    })
    
  } catch (error) {
    console.error('❌ Import error:', error)
  } finally {
    mongoose.connection.close()
    console.log('🔌 Database connection closed')
  }
}

// Get CSV file path from command line argument
const csvFilePath = process.argv[2]

if (!csvFilePath) {
  console.log('❌ Please provide the CSV file path')
  console.log('Usage: node scripts/import-team-members-csv.js path/to/your/file.csv')
  console.log('\nExample:')
  console.log('node scripts/import-team-members-csv.js ./team-members.csv')
  process.exit(1)
}

if (!fs.existsSync(csvFilePath)) {
  console.log('❌ CSV file not found:', csvFilePath)
  process.exit(1)
}

// Run the import
importFromCSV(csvFilePath)
