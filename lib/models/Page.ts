import mongoose from 'mongoose'

const PageSchema = new mongoose.Schema({
  // Basic page information
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    trim: true
  },
  
  // Page metadata
  pageType: {
    type: String,
    enum: ['static', 'dynamic', 'landing'],
    default: 'static'
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  
  // SEO fields
  seoTitle: {
    type: String,
    trim: true
  },
  seoDescription: {
    type: String,
    trim: true
  },
  seoKeywords: [{
    type: String,
    trim: true
  }],
  
  // Page settings
  showInNavigation: {
    type: Boolean,
    default: true
  },
  navigationOrder: {
    type: Number,
    default: 0
  },
  parentPage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Page',
    default: null
  },
  
  // Media
  featuredImage: {
    type: String
  },
  featuredImageAlt: {
    type: String,
    trim: true
  },
  
  // Page components/sections
  sections: [{
    type: {
      type: String,
      enum: ['hero', 'content', 'cta', 'gallery', 'testimonials', 'stats', 'contact'],
      required: true
    },
    title: String,
    content: String,
    settings: mongoose.Schema.Types.Mixed,
    order: {
      type: Number,
      default: 0
    }
  }],
  
  // Custom fields
  customFields: mongoose.Schema.Types.Mixed,
  
  // Author and timestamps
  author: {
    type: String,
    required: true,
    default: 'Admin'
  },
  lastModifiedBy: {
    type: String,
    default: 'Admin'
  }
}, {
  timestamps: true
})

// Index for better performance
PageSchema.index({ slug: 1 })
PageSchema.index({ status: 1 })
PageSchema.index({ pageType: 1 })
PageSchema.index({ showInNavigation: 1 })

// Virtual for full URL
PageSchema.virtual('url').get(function() {
  return `/${this.slug}`
})

// Ensure virtual fields are serialized
PageSchema.set('toJSON', { virtuals: true })

export default mongoose.models.Page || mongoose.model('Page', PageSchema)
