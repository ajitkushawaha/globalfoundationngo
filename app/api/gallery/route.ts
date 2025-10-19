import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import GalleryImage from '@/lib/models/GalleryImage';
import { deleteImage } from '@/lib/cloudinary';

// GET - Fetch all gallery images
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const isActive = searchParams.get('isActive');
    
    let query: any = {};
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (isActive !== null) {
      query.isActive = isActive === 'true';
    }
    
    const images = await GalleryImage.find(query)
      .sort({ sortOrder: 1, createdAt: -1 })
      .populate('uploadedBy', 'name email')
      .lean();
    
    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
}

// POST - Create new gallery image
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const {
      title,
      description,
      cloudinaryPublicId,
      cloudinaryUrl,
      width,
      height,
      format,
      bytes,
      category,
      tags,
      isActive,
      sortOrder
    } = body;
    
    // Validate required fields
    if (!title || !cloudinaryPublicId || !cloudinaryUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create new gallery image
    const galleryImage = new GalleryImage({
      title,
      description,
      cloudinaryPublicId,
      cloudinaryUrl,
      width,
      height,
      format,
      bytes,
      category: category || 'general',
      tags: tags || [],
      isActive: isActive !== false,
      sortOrder: sortOrder || 0,
      uploadedBy: '507f1f77bcf86cd799439011' // TODO: Get from session/auth
    });
    
    await galleryImage.save();
    
    return NextResponse.json({
      success: true,
      data: galleryImage
    });
  } catch (error) {
    console.error('Error creating gallery image:', error);
    return NextResponse.json(
      { error: 'Failed to create gallery image' },
      { status: 500 }
    );
  }
}
