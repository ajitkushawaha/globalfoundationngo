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

// Donation Category Schema
const DonationCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  description: { type: String, required: true },
  unitPrice: { type: Number, required: true, min: 1 },
  unit: { type: String, required: true, trim: true },
  icon: { type: String, required: true },
  color: { type: String, required: true },
  bgColor: { type: String, required: true },
  currentFunded: { type: Number, default: 0, min: 0 },
  targetGoal: { type: Number, required: true, min: 1 },
  donors: { type: Number, default: 0, min: 0 },
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
  image: { type: String },
  seoTitle: { type: String },
  seoDescription: { type: String }
}, {
  timestamps: true
})

const DonationCategory = mongoose.models.DonationCategory || mongoose.model('DonationCategory', DonationCategorySchema)

// Sample donation categories
const donationCategories = [
  {
    name: "Food for Needy",
    slug: "food-for-needy",
    description: "Provide nutritious meals to hungry families",
    unitPrice: 50,
    unit: "meal",
    icon: "Utensils",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    currentFunded: 72,
    targetGoal: 100,
    donors: 15,
    isActive: true,
    sortOrder: 1
  },
  {
    name: "Books for Children",
    slug: "books-for-children",
    description: "Educational books for underprivileged students",
    unitPrice: 200,
    unit: "book",
    icon: "BookOpen",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    currentFunded: 45,
    targetGoal: 100,
    donors: 12,
    isActive: true,
    sortOrder: 2
  },
  {
    name: "Animal Care",
    slug: "animal-care",
    description: "Vaccination and medical care for stray animals",
    unitPrice: 300,
    unit: "vaccination",
    icon: "PawPrint",
    color: "text-pink-600",
    bgColor: "bg-pink-100",
    currentFunded: 28,
    targetGoal: 50,
    donors: 8,
    isActive: true,
    sortOrder: 3
  },
  {
    name: "School Support",
    slug: "school-support",
    description: "Complete student kit with supplies and uniform",
    unitPrice: 500,
    unit: "student kit",
    icon: "GraduationCap",
    color: "text-green-600",
    bgColor: "bg-green-100",
    currentFunded: 15,
    targetGoal: 30,
    donors: 5,
    isActive: true,
    sortOrder: 4
  },
  {
    name: "Girl Education Support",
    slug: "girl-education",
    description: "Monthly education support for girl students",
    unitPrice: 1000,
    unit: "month",
    icon: "Baby",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    currentFunded: 8,
    targetGoal: 20,
    donors: 3,
    isActive: true,
    sortOrder: 5
  },
  {
    name: "Elderly Care Package",
    slug: "elderly-care",
    description: "Monthly care package for elderly citizens",
    unitPrice: 800,
    unit: "package",
    icon: "Heart",
    color: "text-red-600",
    bgColor: "bg-red-100",
    currentFunded: 12,
    targetGoal: 25,
    donors: 4,
    isActive: true,
    sortOrder: 6
  }
]

const seedDonationCategories = async () => {
  try {
    await connectDB()
    
    // Clear existing categories
    await DonationCategory.deleteMany({})
    console.log('🗑️  Cleared existing donation categories')
    
    // Insert new categories
    const createdCategories = await DonationCategory.insertMany(donationCategories)
    console.log(`✅ Created ${createdCategories.length} donation categories`)
    
    // Display created categories
    console.log('\n📋 Created Categories:')
    createdCategories.forEach((category, index) => {
      console.log(`${index + 1}. ${category.name} - ₹${category.unitPrice} per ${category.unit}`)
    })
    
    console.log('\n🎉 Donation categories seeded successfully!')
    
  } catch (error) {
    console.error('❌ Error seeding donation categories:', error)
  } finally {
    mongoose.connection.close()
    console.log('🔌 Database connection closed')
  }
}

// Run the seed function
seedDonationCategories()
