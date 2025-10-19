"use client";
import React from 'react';
import { AdminLayout } from '@/components/admin-layout';
import LiveGalleryPreview from '@/components/admin-live-gallery-preview';

export default function AdminGalleryPage() {
  return (
    <AdminLayout title="Gallery Management">
      <div className="space-y-6">

        <LiveGalleryPreview 
          onImageUpload={() => {
            // Images are handled within the LiveGalleryPreview component
          }}
          onImageDelete={() => {
            // Images are handled within the LiveGalleryPreview component
          }}
        />
      </div>
    </AdminLayout>
  );
}