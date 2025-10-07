const mongoose = require('mongoose')
const { GoogleSpreadsheet } = require('google-spreadsheet')
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

// Function to map Google Sheets row to our schema
const mapSheetRowToSchema = (row) => {
  return {
    fullName: row['Full Name'] || row['Name'] || row['fullName'] || row['name'],
    email: row['Email'] || row['email'] || row['Email Address'],
    phone: row['Phone'] || row['phone'] || row['Phone Number'] || row['Mobile'],
    profession: row['Profession'] || row['profession'] || row['Job Title'] || row['Position'],
    instagramLink: row['Instagram'] || row['instagram'] || row['Instagram Link'],
    joinAs: mapJoinAs(row['Join As'] || row['Type'] || row['Category'] || row['joinAs']),
    role: row['Role'] || row['role'] || row['Job Role'],
    department: row['Department'] || row['department'] || row['Division'],
    bio: row['Bio'] || row['bio'] || row['Description'] || row['About'],
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
const mapJoinAs = (value) => {
  if (!value) return 'volunteer'
  const lower = value.toLowerCase()
  if (lower.includes('team') || lower.includes('staff') || lower.includes('employee')) return 'team'
  if (lower.includes('volunteer')) return 'volunteer'
  if (lower.includes('board') || lower.includes('director')) return 'board_member'
  if (lower.includes('advisor') || lower.includes('consultant')) return 'advisor'
  return 'volunteer'
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

const importFromGoogleSheets = async (sheetId, credentialsPath) => {
  try {
    await connectDB()
    
    console.log('📊 Connecting to Google Sheets...')
    
    // Initialize the sheet
    const doc = new GoogleSpreadsheet(sheetId)
    
    // Load credentials
    const creds = require(credentialsPath)
    await doc.useServiceAccountAuth(creds)
    
    // Load document properties and worksheets
    await doc.loadInfo()
    console.log(`📋 Sheet title: ${doc.title}`)
    console.log(`📄 Number of sheets: ${doc.sheetCount}`)
    
    // Get the first worksheet
    const sheet = doc.sheetsByIndex[0]
    console.log(`📝 Worksheet title: ${sheet.title}`)
    
    // Load all rows
    const rows = await sheet.getRows()
    console.log(`📊 Total rows: ${rows.length}`)
    
    const teamMembers = []
    let validRows = 0
    let errorRows = 0
    
    // Process each row
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]
      try {
        const mappedData = mapSheetRowToSchema(row)
        
        // Validate required fields
        if (!mappedData.fullName || !mappedData.email || !mappedData.phone || !mappedData.profession) {
          console.warn(`⚠️  Row ${i + 1}: Missing required fields (Name, Email, Phone, Profession)`)
          errorRows++
          continue
        }
        
        teamMembers.push(mappedData)
        validRows++
        console.log(`✅ Row ${i + 1}: ${mappedData.fullName} - ${mappedData.profession}`)
        
      } catch (error) {
        console.error(`❌ Row ${i + 1}: Error processing row:`, error.message)
        errorRows++
      }
    }
    
    console.log(`\n📊 Processing Complete:`)
    console.log(`   Total rows: ${rows.length}`)
    console.log(`   Valid rows: ${validRows}`)
    console.log(`   Error rows: ${errorRows}`)
    
    if (teamMembers.length === 0) {
      console.log('❌ No valid team members to import')
      return
    }
    
    // Insert team members
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
    mongoose.connection.close()
    console.log('🔌 Database connection closed')
  }
}

// Get parameters from command line
const sheetId = process.argv[2]
const credentialsPath = process.argv[3]

if (!sheetId || !credentialsPath) {
  console.log('❌ Please provide Google Sheet ID and credentials path')
  console.log('Usage: node scripts/import-from-google-sheets.js SHEET_ID CREDENTIALS_PATH')
  console.log('\nExample:')
  console.log('node scripts/import-from-google-sheets.js 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms ./credentials.json')
  console.log('\nTo get credentials:')
  console.log('1. Go to Google Cloud Console')
  console.log('2. Create a service account')
  console.log('3. Download the JSON key file')
  console.log('4. Share your Google Sheet with the service account email')
  process.exit(1)
}

// Run the import
importFromGoogleSheets(sheetId, credentialsPath)
