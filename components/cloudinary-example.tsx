"use client";
import React, { useState } from 'react';
import { CloudinaryUpload } from '@/components/ui/cloudinary-upload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CloudinaryExample() {
  const [uploadedImages, setUploadedImages] = useState<Array<{
    public_id: string;
    secure_url: string;
    width: number;
    height: number;
    format: string;
    bytes: number;
  }>>([]);

  const handleUpload = (result: {
    public_id: string;
    secure_url: string;
    width: number;
    height: number;
    format: string;
    bytes: number;
  }) => {
    setUploadedImages(prev => [...prev, result]);
    console.log('Image uploaded:', result);
  };

  const handleDelete = (publicId: string) => {
    setUploadedImages(prev => prev.filter(img => img.public_id !== publicId));
    console.log('Image deleted:', publicId);
  };

  const clearAll = () => {
    setUploadedImages([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Cloudinary Image Upload Example</CardTitle>
        </CardHeader>
        <CardContent>
          <CloudinaryUpload
            onUpload={handleUpload}
            onDelete={handleDelete}
            folder="gekct-examples"
            maxFileSize={5}
            className="mb-4"
          />
        </CardContent>
      </Card>

      {uploadedImages.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Uploaded Images ({uploadedImages.length})</CardTitle>
              <Button variant="outline" onClick={clearAll}>
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadedImages.map((image) => (
                <div key={image.public_id} className="space-y-2">
                  <img
                    src={image.secure_url}
                    alt="Uploaded"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="text-sm text-muted-foreground">
                    <p>Size: {image.width}x{image.height}</p>
                    <p>Format: {image.format}</p>
                    <p>Size: {(image.bytes / 1024).toFixed(1)} KB</p>
                    <p className="truncate">ID: {image.public_id}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
