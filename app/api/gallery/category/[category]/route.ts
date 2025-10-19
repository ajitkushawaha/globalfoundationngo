import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import GalleryImage from '@/lib/models/GalleryImage';

// GET - Fetch gallery images by category
export async function GET(
  request: NextRequest,
  { params }: { params: { category: string } }
) {
  try {
    await connectDB();
    
    const { category } = params;
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const isActive = searchParams.get('isActive') !== 'false';
    
    let query: any = { category };
    
    if (isActive) {
      query.isActive = true;
    }
    
    const images = await GalleryImage.find(query)
      .sort({ sortOrder: 1, createdAt: -1 })
      .limit(limit)
      .select('title description cloudinaryUrl width height format category tags sortOrder')
      .lean();
    
    return NextResponse.json({
      success: true,
      data: images
    });
  } catch (error) {
    console.error('Error fetching gallery images by category:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
}
