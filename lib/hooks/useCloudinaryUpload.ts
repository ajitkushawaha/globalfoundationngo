import { useState } from 'react';

interface UploadResult {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

interface UseCloudinaryUploadReturn {
  uploadImage: (file: File, folder?: string) => Promise<UploadResult>;
  deleteImage: (publicId: string) => Promise<boolean>;
  isUploading: boolean;
  error: string | null;
}

export const useCloudinaryUpload = (): UseCloudinaryUploadReturn => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File, folder: string = 'gekct'): Promise<UploadResult> => {
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const response = await fetch('/api/upload-cloudinary', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const result = await response.json();
      return result.data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  const deleteImage = async (publicId: string): Promise<boolean> => {
    setIsUploading(true);
    setError(null);

    try {
      const response = await fetch('/api/upload-cloudinary', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Delete failed');
      }

      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Delete failed';
      setError(errorMessage);
      return false;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadImage,
    deleteImage,
    isUploading,
    error,
  };
};
