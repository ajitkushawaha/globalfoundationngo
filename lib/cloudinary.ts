import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export default cloudinary;

// Helper function to upload image
export const uploadImage = async (file: File | Buffer, folder: string = 'gekct') => {
  try {
    let uploadData: any;
    
    if (file instanceof Buffer) {
      // Convert Buffer to base64 string for Cloudinary
      uploadData = `data:image/jpeg;base64,${file.toString('base64')}`;
    } else if (file instanceof File) {
      // For File objects, convert to base64
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      uploadData = `data:${file.type};base64,${buffer.toString('base64')}`;
    } else {
      throw new Error('Unsupported file type');
    }
    
    const result = await cloudinary.uploader.upload(uploadData, {
      folder: folder,
      resource_type: 'auto',
      quality: 'auto',
      fetch_format: 'auto'
    });
    return result;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    throw error;
  }
};

// Helper function to delete image
export const deleteImage = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
};

// Helper function to get optimized image URL
export const getOptimizedImageUrl = (publicId: string, options: any = {}) => {
  return cloudinary.url(publicId, {
    quality: 'auto',
    fetch_format: 'auto',
    ...options
  });
};
