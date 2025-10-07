require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')

// Define Page schema inline
const PageSchema = new mongoose.Schema({
  title: String,
  slug: String,
  content: String,
  excerpt: String,
  pageType: String,
  status: String,
  seoTitle: String,
  seoDescription: String,
  seoKeywords: [String],
  showInNavigation: Boolean,
  navigationOrder: Number,
  parentPage: String,
  featuredImage: String,
  featuredImageAlt: String,
  author: String,
  lastModifiedBy: String,
  sections: [mongoose.Schema.Types.Mixed]
}, {
  timestamps: true
})

const Page = mongoose.models.Page || mongoose.model('Page', PageSchema)

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

async function deleteAboutPage() {
  await connectDB()

  console.log('🗑️  Deleting about page from database...')

  try {
    const result = await Page.deleteOne({ slug: 'about' })
    
    if (result.deletedCount > 0) {
      console.log('✅ Successfully deleted about page from database')
      console.log('🎉 Your static about page should now be served!')
    } else {
      console.log('⚠️  No about page found in database')
    }
  } catch (error) {
    console.error('❌ Error deleting about page:', error.message)
  } finally {
    await mongoose.disconnect()
    console.log('🔌 Database connection closed')
  }
}

deleteAboutPage()
