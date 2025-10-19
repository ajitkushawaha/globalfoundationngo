"use client";
import React, { useRef, useState } from 'react';
import { useCloudinaryUpload } from '@/lib/hooks/useCloudinaryUpload';
import { Button } from '@/components/ui/button';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface CloudinaryUploadProps {
  onUpload: (result: {
    public_id: string;
    secure_url: string;
    width: number;
    height: number;
    format: string;
    bytes: number;
  }) => void;
  onDelete?: (publicId: string) => void;
  folder?: string;
  maxFileSize?: number; // in MB
  acceptedTypes?: string[];
  className?: string;
  disabled?: boolean;
}

export const CloudinaryUpload: React.FC<CloudinaryUploadProps> = ({
  onUpload,
  onDelete,
  folder = 'gekct',
  maxFileSize = 10, // 10MB default
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  className = '',
  disabled = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<{
    public_id: string;
    secure_url: string;
  } | null>(null);
  
  const { uploadImage, deleteImage, isUploading, error } = useCloudinaryUpload();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxFileSize * 1024 * 1024) {
      alert(`File size must be less than ${maxFileSize}MB`);
      return;
    }

    // Validate file type
    if (!acceptedTypes.includes(file.type)) {
      alert(`File type must be one of: ${acceptedTypes.join(', ')}`);
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload file
    uploadImage(file, folder)
      .then((result) => {
        setUploadedImage({
          public_id: result.public_id,
          secure_url: result.secure_url,
        });
        onUpload(result);
        setPreview(null); // Clear preview after upload
      })
      .catch((err) => {
        console.error('Upload failed:', err);
        setPreview(null);
      });
  };

  const handleDelete = async () => {
    if (!uploadedImage) return;

    const success = await deleteImage(uploadedImage.public_id);
    if (success) {
      setUploadedImage(null);
      onDelete?.(uploadedImage.public_id);
    }
  };

  const handleClick = () => {
    if (disabled || isUploading) return;
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(',')}
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled}
      />

      {preview && (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg border"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
              <p>Uploading...</p>
            </div>
          </div>
        </div>
      )}

      {uploadedImage && (
        <div className="relative">
          <img
            src={uploadedImage.secure_url}
            alt="Uploaded"
            className="w-full h-48 object-cover rounded-lg border"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={handleDelete}
            disabled={isUploading}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {!uploadedImage && !preview && (
        <Button
          type="button"
          variant="outline"
          onClick={handleClick}
          disabled={disabled || isUploading}
          className="w-full h-48 border-dashed border-2 hover:border-primary/50 transition-colors"
        >
          <div className="flex flex-col items-center space-y-2">
            {isUploading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            ) : (
              <Upload className="h-8 w-8 text-muted-foreground" />
            )}
            <div className="text-center">
              <p className="text-sm font-medium">
                {isUploading ? 'Uploading...' : 'Click to upload image'}
              </p>
              <p className="text-xs text-muted-foreground">
                Max {maxFileSize}MB • {acceptedTypes.join(', ')}
              </p>
            </div>
          </div>
        </Button>
      )}

      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
          {error}
        </div>
      )}
    </div>
  );
};
