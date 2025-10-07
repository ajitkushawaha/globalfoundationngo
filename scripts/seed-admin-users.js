require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Define User schema inline since we can't import TypeScript modules directly
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: {
    type: String,
    enum: ['admin', 'editor', 'viewer'],
    default: 'viewer'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable inside .env.local')
  process.exit(1)
}

async function connectDB() {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI)
      console.log('✅ Connected to MongoDB')
    }
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message)
    process.exit(1)
  }
}

async function seedAdminUsers() {
  await connectDB()

  console.log('👤 Seeding admin users...')

  const adminUsers = [
    {
      name: 'Admin User',
      email: 'admin@gekct.org',
      password: 'admin123',
      role: 'admin'
    },
    {
      name: 'Amit Singh',
      email: 'amit.singh@gekct.org',
      password: 'amit123',
      role: 'admin'
    },
    {
      name: 'Sunny Chaudhary',
      email: 'sunny.chaudhary@gekct.org',
      password: 'sunny123',
      role: 'admin'
    },
    {
      name: 'Editor User',
      email: 'editor@gekct.org',
      password: 'editor123',
      role: 'editor'
    }
  ]

  let createdCount = 0
  let updatedCount = 0

  for (const userData of adminUsers) {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email })
      
      if (existingUser) {
        // Update existing user
        const hashedPassword = await bcrypt.hash(userData.password, 12)
        existingUser.password = hashedPassword
        existingUser.role = userData.role
        existingUser.isActive = true
        await existingUser.save()
        updatedCount++
        console.log(`✅ Updated user: ${userData.name} (${userData.email})`)
      } else {
        // Create new user
        const hashedPassword = await bcrypt.hash(userData.password, 12)
        const user = new User({
          name: userData.name,
          email: userData.email,
          password: hashedPassword,
          role: userData.role,
          isActive: true
        })
        await user.save()
        createdCount++
        console.log(`✅ Created user: ${userData.name} (${userData.email})`)
      }
    } catch (error) {
      console.error(`❌ Error processing user ${userData.name}:`, error.message)
    }
  }

  console.log('\n🎉 Admin users seeding completed!')
  console.log(`   ✅ Created: ${createdCount} users`)
  console.log(`   🔄 Updated: ${updatedCount} users`)
  console.log('\n📋 Login Credentials:')
  console.log('   Admin: admin@gekct.org / admin123')
  console.log('   Amit: amit.singh@gekct.org / amit123')
  console.log('   Sunny: sunny.chaudhary@gekct.org / sunny123')
  console.log('   Editor: editor@gekct.org / editor123')

  await mongoose.disconnect()
  console.log('🔌 Database connection closed')
}

seedAdminUsers()
