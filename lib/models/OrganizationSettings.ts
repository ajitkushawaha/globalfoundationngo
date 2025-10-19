import mongoose, { Document, Schema } from 'mongoose'

export interface IOrganizationSettings extends Document {
  // Organization Basic Info
  organizationName: string
  legalName: string
  registrationNumber: string
  address: {
    street: string
    city: string
    state: string
    country: string
    zipCode: string
  }
  
  // Contact Information
  contact: {
    phone: string
    email: string
    website?: string
  }
  
  // Bank Details
  bankDetails: {
    accountName: string
    accountNumber: string
    ifscCode: string
    bankName: string
    branch: string
    upiId?: string
  }
  
  // Social Media
  socialMedia: {
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
    youtube?: string
  }
  
  // SEO Settings
  seo: {
    title: string
    description: string
    keywords: string[]
    ogImage?: string
  }
  
  // Metadata
  isActive: boolean
  lastUpdatedBy: string
  createdAt: Date
  updatedAt: Date
}

const OrganizationSettingsSchema = new Schema<IOrganizationSettings>({
  organizationName: {
    type: String,
    required: true,
    trim: true,
    default: 'Global Education and Charitable Trust'
  },
  legalName: {
    type: String,
    required: true,
    trim: true,
    default: 'Global Education and Charitable Trust'
  },
  registrationNumber: {
    type: String,
    required: true,
    trim: true,
    default: 'Registered under Bombay Public Trust Act of 1950'
  },
  address: {
    street: {
      type: String,
      required: true,
      trim: true,
      default: '207, Dwarkesh Complex, C.G. Road, Navrangpura'
    },
    city: {
      type: String,
      required: true,
      trim: true,
      default: 'Ahmedabad'
    },
    state: {
      type: String,
      required: true,
      trim: true,
      default: 'Gujarat'
    },
    country: {
      type: String,
      required: true,
      trim: true,
      default: 'India'
    },
    zipCode: {
      type: String,
      required: true,
      trim: true,
      default: '380009'
    }
  },
  contact: {
    phone: {
      type: String,
      required: true,
      trim: true,
      default: '+91 9898098977'
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      default: 'Support@globalfoundationngo.com'
    },
    website: {
      type: String,
      trim: true,
      default: 'https://gekct.org'
    }
  },
  bankDetails: {
    accountName: {
      type: String,
      required: true,
      trim: true,
      default: 'Global Education and Charitable Trust'
    },
    accountNumber: {
      type: String,
      required: true,
      trim: true,
      default: '9551204332'
    },
    ifscCode: {
      type: String,
      required: true,
      trim: true,
      default: 'KKBK0000838'
    },
    bankName: {
      type: String,
      required: true,
      trim: true,
      default: 'Kotak Mahindra Bank'
    },
    branch: {
      type: String,
      required: true,
      trim: true,
      default: 'NARANPURA'
    },
    upiId: {
      type: String,
      trim: true,
      default: 'gekct@okaxis'
    }
  },
  socialMedia: {
    facebook: {
      type: String,
      trim: true
    },
    twitter: {
      type: String,
      trim: true
    },
    instagram: {
      type: String,
      trim: true
    },
    linkedin: {
      type: String,
      trim: true
    },
    youtube: {
      type: String,
      trim: true
    }
  },
  seo: {
    title: {
      type: String,
      required: true,
      trim: true,
      default: 'Global Education and Charitable Trust'
    },
    description: {
      type: String,
      required: true,
      trim: true,
      default: 'Transforming lives through education, skills, and social empowerment. Join our mission to create positive change in education, animal welfare, and community development.'
    },
    keywords: [{
      type: String,
      trim: true
    }],
    ogImage: {
      type: String,
      trim: true
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastUpdatedBy: {
    type: String,
    required: true,
    default: 'Admin'
  }
}, {
  timestamps: true
})

// Ensure only one organization settings document exists
OrganizationSettingsSchema.index({ isActive: 1 }, { unique: true, partialFilterExpression: { isActive: true } })

export default mongoose.models.OrganizationSettings || mongoose.model<IOrganizationSettings>('OrganizationSettings', OrganizationSettingsSchema)
