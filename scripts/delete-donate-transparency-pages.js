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

async function deleteDonateAndTransparencyPages() {
  await connectDB()

  console.log('🗑️  Deleting donate and trust-transparency pages from database...')

  try {
    // Delete donate page
    const donateResult = await Page.deleteOne({ slug: 'donate' })
    if (donateResult.deletedCount > 0) {
      console.log('✅ Successfully deleted donate page from database')
    } else {
      console.log('⚠️  No donate page found in database')
    }

    // Delete trust-transparency page
    const transparencyResult = await Page.deleteOne({ slug: 'trust-transparency' })
    if (transparencyResult.deletedCount > 0) {
      console.log('✅ Successfully deleted trust-transparency page from database')
    } else {
      console.log('⚠️  No trust-transparency page found in database')
    }

    console.log('🎉 Your static donate and trust-transparency pages should now be served!')
  } catch (error) {
    console.error('❌ Error deleting pages:', error.message)
  } finally {
    await mongoose.disconnect()
    console.log('🔌 Database connection closed')
  }
}

deleteDonateAndTransparencyPages()
