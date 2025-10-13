import mongoose, { Document, Schema } from 'mongoose'

export interface ITeamMember extends Document {
  fullName: string
  email: string
  phone: string
  instagramLink?: string
  profession: string
  photo?: string
  joinAs: 'team' | 'volunteer' | 'board_member' | 'advisor'
  role?: string
  department?: string
  bio?: string
  skills: string[]
  availability: 'full_time' | 'part_time' | 'weekends' | 'evenings' | 'flexible'
  status: 'active' | 'inactive' | 'pending' | 'suspended'
  joinDate: Date
  lastActive?: Date
  age?: number
  socialLinks?: {
    instagram?: string
    linkedin?: string
    twitter?: string
    facebook?: string
  }
  address?: {
    street?: string
    city?: string
    state?: string
    country?: string
    zipCode?: string
  }
  emergencyContact?: {
    name: string
    phone: string
    relationship: string
  }
  achievements?: string[]
  notes?: string
  isPublic: boolean
  sortOrder: number
  allowSocialMedia: boolean
  createdAt: Date
  updatedAt: Date
}

const TeamMemberSchema = new Schema<ITeamMember>({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Full name cannot be more than 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[\+]?[0-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  instagramLink: {
    type: String,
    trim: true
  },
  profession: {
    type: String,
    required: [true, 'Profession is required'],
    trim: true,
    maxlength: [100, 'Profession cannot be more than 100 characters']
  },
  photo: {
    type: String,
    trim: true
  },
  joinAs: {
    type: String,
    required: [true, 'Join as field is required'],
    enum: {
      values: ['team', 'volunteer', 'board_member', 'advisor'],
      message: 'Join as must be one of: team, volunteer, board_member, advisor'
    }
  },
  role: {
    type: String,
    trim: true,
    maxlength: [50, 'Role cannot be more than 50 characters']
  },
  department: {
    type: String,
    trim: true,
    maxlength: [50, 'Department cannot be more than 50 characters']
  },
  bio: {
    type: String,
    maxlength: [1000, 'Bio cannot be more than 1000 characters']
  },
  skills: [{
    type: String,
    trim: true
  }],
  availability: {
    type: String,
    enum: {
      values: ['full_time', 'part_time', 'weekends', 'evenings', 'flexible'],
      message: 'Availability must be one of: full_time, part_time, weekends, evenings, flexible'
    },
    default: 'flexible'
  },
  status: {
    type: String,
    enum: {
      values: ['active', 'inactive', 'pending', 'suspended'],
      message: 'Status must be one of: active, inactive, pending, suspended'
    },
    default: 'pending'
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  lastActive: {
    type: Date
  },
  age: {
    type: Number,
    min: [16, 'Age must be at least 16'],
    max: [100, 'Age must be less than 100']
  },
  socialLinks: {
    instagram: {
      type: String,
      trim: true
    },
    linkedin: {
      type: String,
      trim: true
    },
    twitter: {
      type: String,
      trim: true
    },
    facebook: {
      type: String,
      trim: true
    }
  },
  address: {
    street: {
      type: String,
      trim: true
    },
    city: {
      type: String,
      trim: true
    },
    state: {
      type: String,
      trim: true
    },
    country: {
      type: String,
      trim: true
    },
    zipCode: {
      type: String,
      trim: true
    }
  },
  emergencyContact: {
    name: {
      type: String,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    relationship: {
      type: String,
      trim: true
    }
  },
  achievements: [{
    type: String,
    trim: true
  }],
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot be more than 500 characters']
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  allowSocialMedia: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

// Indexes for better query performance
TeamMemberSchema.index({ email: 1 })
TeamMemberSchema.index({ joinAs: 1 })
TeamMemberSchema.index({ status: 1 })
TeamMemberSchema.index({ isPublic: 1 })
TeamMemberSchema.index({ sortOrder: 1 })

// Virtual for full address
TeamMemberSchema.virtual('fullAddress').get(function() {
  if (!this.address) return ''
  const { street, city, state, country, zipCode } = this.address
  const parts = [street, city, state, zipCode, country].filter(Boolean)
  return parts.join(', ')
})

// Ensure virtual fields are serialized
TeamMemberSchema.set('toJSON', { virtuals: true })

export default mongoose.models.TeamMember || mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema)
