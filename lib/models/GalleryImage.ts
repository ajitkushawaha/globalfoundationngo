import mongoose, { Document, Schema } from 'mongoose';

export interface IGalleryImage extends Document {
  title: string;
  description?: string;
  cloudinaryPublicId: string;
  cloudinaryUrl: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
  category: 'parallax' | 'interactive' | 'bento' | 'hero' | 'general';
  tags: string[];
  isActive: boolean;
  sortOrder: number;
  uploadedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const GalleryImageSchema = new Schema<IGalleryImage>({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500
  },
  cloudinaryPublicId: {
    type: String,
    required: true,
    unique: true
  },
  cloudinaryUrl: {
    type: String,
    required: true
  },
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  format: {
    type: String,
    required: true
  },
  bytes: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    enum: ['parallax', 'interactive', 'bento', 'hero', 'general'],
    default: 'general'
  },
  tags: [{
    type: String,
    trim: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  sortOrder: {
    type: Number,
    default: 0
  },
  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for efficient queries
GalleryImageSchema.index({ category: 1, isActive: 1, sortOrder: 1 });
GalleryImageSchema.index({ tags: 1 });
GalleryImageSchema.index({ createdAt: -1 });

export default mongoose.models.GalleryImage || mongoose.model<IGalleryImage>('GalleryImage', GalleryImageSchema);
