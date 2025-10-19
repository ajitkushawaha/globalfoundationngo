import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import GalleryImage from '@/lib/models/GalleryImage';
import { deleteImage } from '@/lib/cloudinary';

// GET - Fetch single gallery image
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const image = await GalleryImage.findById(params.id)
      .populate('uploadedBy', 'name email')
      .lean();
    
    if (!image) {
      return NextResponse.json(
        { error: 'Gallery image not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(image);
  } catch (error) {
    console.error('Error fetching gallery image:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery image' },
      { status: 500 }
    );
  }
}

// PUT - Update gallery image
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const body = await request.json();
    const {
      title,
      description,
      category,
      tags,
      isActive,
      sortOrder
    } = body;
    
    const updateData: any = {};
    
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (category !== undefined) updateData.category = category;
    if (tags !== undefined) updateData.tags = tags;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (sortOrder !== undefined) updateData.sortOrder = sortOrder;
    
    const image = await GalleryImage.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true }
    ).populate('uploadedBy', 'name email');
    
    if (!image) {
      return NextResponse.json(
        { error: 'Gallery image not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: image
    });
  } catch (error) {
    console.error('Error updating gallery image:', error);
    return NextResponse.json(
      { error: 'Failed to update gallery image' },
      { status: 500 }
    );
  }
}

// DELETE - Delete gallery image
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { publicId } = body;
    
    // Find the image first
    const image = await GalleryImage.findById(params.id);
    if (!image) {
      return NextResponse.json(
        { error: 'Gallery image not found' },
        { status: 404 }
      );
    }
    
    // Delete from Cloudinary
    if (publicId || image.cloudinaryPublicId) {
      try {
        await deleteImage(publicId || image.cloudinaryPublicId);
      } catch (cloudinaryError) {
        console.error('Error deleting from Cloudinary:', cloudinaryError);
        // Continue with database deletion even if Cloudinary fails
      }
    }
    
    // Delete from database
    await GalleryImage.findByIdAndDelete(params.id);
    
    return NextResponse.json({
      success: true,
      message: 'Gallery image deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    return NextResponse.json(
      { error: 'Failed to delete gallery image' },
      { status: 500 }
    );
  }
}
