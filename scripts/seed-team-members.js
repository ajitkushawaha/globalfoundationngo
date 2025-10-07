const mongoose = require('mongoose')
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

// Sample team members
const teamMembers = [
  {
    fullName: "Dr. Priya Sharma",
    email: "priya.sharma@gekct.org",
    phone: "+91-9876543210",
    instagramLink: "https://instagram.com/priyasharma",
    profession: "Education Director",
    joinAs: "team",
    role: "Director of Education",
    department: "Education",
    bio: "Passionate educator with 15+ years of experience in curriculum development and teacher training.",
    skills: ["Education", "Curriculum Development", "Teacher Training", "Public Speaking"],
    availability: "full_time",
    status: "active",
    socialLinks: {
      linkedin: "https://linkedin.com/in/priyasharma",
      twitter: "https://twitter.com/priyasharma"
    },
    address: {
      city: "Mumbai",
      state: "Maharashtra",
      country: "India"
    },
    achievements: ["Best Education Director 2023", "Teacher Training Excellence Award"],
    isPublic: true,
    sortOrder: 1
  },
  {
    fullName: "Rajesh Kumar",
    email: "rajesh.kumar@gekct.org",
    phone: "+91-9876543211",
    instagramLink: "https://instagram.com/rajeshkumar",
    profession: "Technology Manager",
    joinAs: "team",
    role: "IT Manager",
    department: "Technology",
    bio: "Tech enthusiast with expertise in web development and digital solutions for NGOs.",
    skills: ["Web Development", "Mobile Development", "Database Management", "Project Management"],
    availability: "full_time",
    status: "active",
    socialLinks: {
      linkedin: "https://linkedin.com/in/rajeshkumar",
      github: "https://github.com/rajeshkumar"
    },
    address: {
      city: "Bangalore",
      state: "Karnataka",
      country: "India"
    },
    achievements: ["Digital Innovation Award", "Open Source Contributor"],
    isPublic: true,
    sortOrder: 2
  },
  {
    fullName: "Anita Patel",
    email: "anita.patel@gekct.org",
    phone: "+91-9876543212",
    profession: "Volunteer Coordinator",
    joinAs: "volunteer",
    role: "Senior Volunteer",
    department: "Community Outreach",
    bio: "Dedicated volunteer with 8 years of experience in community service and event coordination.",
    skills: ["Community Outreach", "Event Planning", "Volunteer Coordination", "Social Media Management"],
    availability: "weekends",
    status: "active",
    socialLinks: {
      instagram: "https://instagram.com/anitapatel",
      facebook: "https://facebook.com/anitapatel"
    },
    address: {
      city: "Ahmedabad",
      state: "Gujarat",
      country: "India"
    },
    achievements: ["Volunteer of the Year 2022", "Community Service Excellence"],
    isPublic: true,
    sortOrder: 3
  },
  {
    fullName: "Prof. Dr. Amit Singh",
    email: "amit.singh@gekct.org",
    phone: "+91-9876543213",
    profession: "Board Member",
    joinAs: "board_member",
    role: "Board Member",
    department: "Governance",
    bio: "Renowned academic and social worker with 25+ years of experience in education and social development.",
    skills: ["Strategic Planning", "Policy Development", "Academic Research", "Leadership"],
    availability: "flexible",
    status: "active",
    socialLinks: {
      linkedin: "https://linkedin.com/in/amitsingh",
      twitter: "https://twitter.com/amitsingh"
    },
    address: {
      city: "Delhi",
      state: "Delhi",
      country: "India"
    },
    achievements: ["Padma Shri Award", "Education Excellence Award", "Social Work Recognition"],
    isPublic: true,
    sortOrder: 4
  },
  {
    fullName: "Sunita Devi",
    email: "sunita.devi@gekct.org",
    phone: "+91-9876543214",
    profession: "Healthcare Advisor",
    joinAs: "advisor",
    role: "Healthcare Advisor",
    department: "Healthcare",
    bio: "Medical professional with expertise in public health and community healthcare programs.",
    skills: ["Public Health", "Medical Consultation", "Healthcare Planning", "Community Health"],
    availability: "part_time",
    status: "active",
    socialLinks: {
      linkedin: "https://linkedin.com/in/sunitadevi"
    },
    address: {
      city: "Chennai",
      state: "Tamil Nadu",
      country: "India"
    },
    achievements: ["Healthcare Excellence Award", "Community Health Champion"],
    isPublic: true,
    sortOrder: 5
  },
  {
    fullName: "Vikram Mehta",
    email: "vikram.mehta@gekct.org",
    phone: "+91-9876543215",
    instagramLink: "https://instagram.com/vikrammehta",
    profession: "Marketing Specialist",
    joinAs: "volunteer",
    role: "Marketing Volunteer",
    department: "Marketing",
    bio: "Creative marketing professional helping NGOs reach wider audiences through digital marketing.",
    skills: ["Digital Marketing", "Content Creation", "Social Media", "Brand Management"],
    availability: "evenings",
    status: "active",
    socialLinks: {
      instagram: "https://instagram.com/vikrammehta",
      linkedin: "https://linkedin.com/in/vikrammehta",
      twitter: "https://twitter.com/vikrammehta"
    },
    address: {
      city: "Pune",
      state: "Maharashtra",
      country: "India"
    },
    achievements: ["Digital Marketing Excellence", "Social Media Growth Award"],
    isPublic: true,
    sortOrder: 6
  }
]

const seedTeamMembers = async () => {
  try {
    await connectDB()
    
    // Clear existing team members
    await TeamMember.deleteMany({})
    console.log('🗑️  Cleared existing team members')
    
    // Insert new team members
    const createdMembers = await TeamMember.insertMany(teamMembers)
    console.log(`✅ Created ${createdMembers.length} team members`)
    
    // Display created members
    console.log('\n📋 Created Team Members:')
    createdMembers.forEach((member, index) => {
      console.log(`${index + 1}. ${member.fullName} - ${member.profession} (${member.joinAs})`)
    })
    
    console.log('\n🎉 Team members seeded successfully!')
    
  } catch (error) {
    console.error('❌ Error seeding team members:', error)
  } finally {
    mongoose.connection.close()
    console.log('🔌 Database connection closed')
  }
}

// Run the seed function
seedTeamMembers()
