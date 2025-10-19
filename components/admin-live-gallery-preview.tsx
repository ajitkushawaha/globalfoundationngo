"use client";
import React, { useState, useEffect } from 'react';
import { CloudinaryUpload } from '@/components/ui/cloudinary-upload';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { LayoutGrid } from '@/components/ui/layout-grid';
import { ParallaxScroll } from '@/components/ui/parallax-scroll';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X } from 'lucide-react';

interface GalleryImage {
  _id: string;
  title: string;
  description?: string;
  cloudinaryUrl: string;
  width: number;
  height: number;
  format: string;
  category: string;
  tags: string[];
  sortOrder: number;
  position?: number; // For specific position in grid
}

interface LiveGalleryPreviewProps {
  onImageUpload: (image: any, category: string, position?: number) => void;
  onImageDelete: (imageId: string) => void;
}

export default function LiveGalleryPreview({ onImageUpload, onImageDelete }: LiveGalleryPreviewProps) {
  const [images, setImages] = useState<{
    parallax: GalleryImage[];
    interactive: GalleryImage[];
    bento: GalleryImage[];
    hero: GalleryImage[];
  }>({
    parallax: [],
    interactive: [],
    bento: [],
    hero: []
  });
  const [loading, setLoading] = useState(true);
  const [uploadingPosition, setUploadingPosition] = useState<{category: string, position: number} | null>(null);

  // Fetch images for each category
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const [parallaxRes, interactiveRes, bentoRes, heroRes] = await Promise.all([
          fetch('/api/gallery/category/parallax?limit=20'),
          fetch('/api/gallery/category/interactive?limit=4'),
          fetch('/api/gallery/category/bento?limit=7'),
          fetch('/api/gallery/category/hero?limit=10')
        ]);

        const [parallaxData, interactiveData, bentoData, heroData] = await Promise.all([
          parallaxRes.json(),
          interactiveRes.json(),
          bentoRes.json(),
          heroRes.json()
        ]);

        setImages({
          parallax: parallaxData.success ? parallaxData.data : [],
          interactive: interactiveRes.ok ? interactiveData.data : [],
          bento: bentoRes.ok ? bentoData.data : [],
          hero: heroRes.ok ? heroData.data : []
        });
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleImageUpload = async (result: any, category: string, position?: number) => {
    try {
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: `Image ${position ? `Position ${position}` : ''}`,
          description: `Uploaded to ${category} gallery`,
          cloudinaryPublicId: result.public_id,
          cloudinaryUrl: result.secure_url,
          width: result.width,
          height: result.height,
          format: result.format,
          bytes: result.bytes,
          category: category,
          tags: [],
          isActive: true,
          sortOrder: position || 0,
          position: position
        }),
      });

      if (response.ok) {
        const newImage = await response.json();
        setImages(prev => ({
          ...prev,
          [category]: [...prev[category as keyof typeof prev], newImage.data]
        }));
        onImageUpload(newImage.data, category, position);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploadingPosition(null);
    }
  };

  const handleImageDelete = async (imageId: string, category: string) => {
    try {
      const response = await fetch(`/api/gallery/${imageId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicId: 'dummy' }), // Will be handled by API
      });

      if (response.ok) {
        setImages(prev => ({
          ...prev,
          [category]: prev[category as keyof typeof prev].filter(img => img._id !== imageId)
        }));
        onImageDelete(imageId);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  // Bento Grid with upload positions
  const BentoGridWithUploads = () => {
    const bentoPositions = Array.from({ length: 7 }, (_, i) => i);
    
    return (
      <div className="w-full">
        <BentoGrid className="max-w-6xl mx-auto">
          {bentoPositions.map((position) => {
            const image = images.bento.find(img => img.position === position);
            const isUploading = uploadingPosition?.category === 'bento' && uploadingPosition?.position === position;
            
            return (
              <BentoGridItem
                key={position}
                title={image?.title || `Position ${position + 1}`}
                description={image?.description || "Click to upload image"}
                header={
                  image ? (
                    <div className="relative group">
                      <img
                        src={image.cloudinaryUrl}
                        alt={image.title}
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleImageDelete(image._id, 'bento')}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : isUploading ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 hover:border-primary transition-colors">
                      <CloudinaryUpload
                        onUpload={(result) => handleImageUpload(result, 'bento', position)}
                        folder="gekct-gallery"
                        maxFileSize={5}
                        className="w-full h-full"
                      />
                    </div>
                  )
                }
                icon={null}
                className={position === 3 || position === 6 ? "md:col-span-2" : ""}
              />
            );
          })}
        </BentoGrid>
      </div>
    );
  };

  // Layout Grid with upload positions
  const LayoutGridWithUploads = () => {
    const layoutPositions = Array.from({ length: 4 }, (_, i) => i);
    
    const cards = layoutPositions.map((position) => {
      const image = images.interactive.find(img => img.position === position);
      const isUploading = uploadingPosition?.category === 'interactive' && uploadingPosition?.position === position;
      
      return {
        id: position + 1,
        content: (
          <div>
            <p className="font-bold md:text-4xl text-xl text-white">
              {image?.title || `Position ${position + 1}`}
            </p>
            <p className="font-normal text-base text-white"></p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
              {image?.description || "Click to upload image"}
            </p>
          </div>
        ),
        className: position === 0 || position === 3 ? "md:col-span-2" : "col-span-1",
        thumbnail: image?.cloudinaryUrl || "",
        isUploading,
        onUpload: (result: any) => handleImageUpload(result, 'interactive', position),
        onDelete: image ? () => handleImageDelete(image._id, 'interactive') : undefined
      };
    });

    return (
      <div className="w-full min-h-[400px]">
        <div className="w-full p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative">
          {cards.map((card, i) => (
            <div key={i} className={`min-h-[300px] ${card.className}`}>
              {card.thumbnail ? (
                <div className="relative group bg-white rounded-xl h-full w-full overflow-hidden">
                  <img
                    src={card.thumbnail}
                    alt="Gallery image"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={card.onDelete}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : card.isUploading ? (
                <div className="bg-white rounded-xl h-full w-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                <div className="bg-white rounded-xl h-full w-full flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-primary transition-colors">
                  <CloudinaryUpload
                    onUpload={card.onUpload}
                    folder="gekct-gallery"
                    maxFileSize={5}
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Parallax with upload positions - Position-based upload like Bento/Interactive
  const ParallaxWithUploads = () => {
    const parallaxPositions = Array.from({ length: 12 }, (_, i) => i); // 12 positions for parallax
    
    return (
      <div className="w-full">
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold">Parallax Gallery ({images.parallax.length} images)</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {parallaxPositions.map((position) => {
            const image = images.parallax.find(img => img.position === position);
            const isUploading = uploadingPosition?.category === 'parallax' && uploadingPosition?.position === position;
            
            return (
              <div key={position} className="aspect-square relative group">
                {image ? (
                  <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
                    <img
                      src={image.cloudinaryUrl}
                      alt={`Parallax image ${position + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleImageDelete(image._id, 'parallax')}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                      {position + 1}
                    </div>
                  </div>
                ) : isUploading ? (
                  <div className="w-full h-full bg-gradient-to-r from-green-50 to-blue-50 rounded-lg flex items-center justify-center border-2 border-dashed border-green-300">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-green-50 to-blue-50 rounded-lg flex items-center justify-center border-2 border-dashed border-green-300 hover:border-primary transition-colors">
                    <CloudinaryUpload
                      onUpload={(result) => handleImageUpload(result, 'parallax', position)}
                      folder="gekct-gallery"
                      maxFileSize={5}
                      className="w-full h-full"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Hero Parallax with upload positions - Position-based upload like Bento/Interactive
  const HeroParallaxWithUploads = () => {
    const heroPositions = Array.from({ length: 8 }, (_, i) => i); // 8 positions for hero
    
    return (
      <div className="w-full">
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold">Hero Parallax Gallery ({images.hero.length} images)</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {heroPositions.map((position) => {
            const image = images.hero.find(img => img.position === position);
            const isUploading = uploadingPosition?.category === 'hero' && uploadingPosition?.position === position;
            
            return (
              <div key={position} className={`aspect-square relative group ${
                position === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}>
                {image ? (
                  <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
                    <img
                      src={image.cloudinaryUrl}
                      alt={`Hero image ${position + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleImageDelete(image._id, 'hero')}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                      {position === 0 ? 'Main' : position + 1}
                    </div>
                    {position === 0 && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="text-center text-white">
                          <h3 className="text-lg md:text-2xl font-bold mb-2 drop-shadow-lg">
                            Our Impact
                          </h3>
                          <p className="text-sm md:text-base drop-shadow-lg">
                            Making a difference
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : isUploading ? (
                  <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-300">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-300 hover:border-primary transition-colors">
                    <CloudinaryUpload
                      onUpload={(result) => handleImageUpload(result, 'hero', position)}
                      folder="gekct-gallery"
                      maxFileSize={5}
                      className="w-full h-full"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Live Gallery Preview</h2>
        <p className="text-muted-foreground">Click on empty positions to upload images directly to each gallery section</p>
      </div>

      <Tabs defaultValue="bento" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="bento">Bento Grid</TabsTrigger>
          <TabsTrigger value="interactive">Interactive Grid</TabsTrigger>
          <TabsTrigger value="parallax">Parallax Gallery</TabsTrigger>
          <TabsTrigger value="hero">Hero Parallax</TabsTrigger>
        </TabsList>

        <TabsContent value="bento" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bento Grid Gallery</CardTitle>
              <p className="text-sm text-muted-foreground">
                Click on any empty position to upload an image. Images will be placed in the exact position you click.
              </p>
            </CardHeader>
            <CardContent>
              <BentoGridWithUploads />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interactive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Grid Gallery</CardTitle>
              <p className="text-sm text-muted-foreground">
                Click on any empty position to upload an image. Images will be placed in the exact position you click.
              </p>
            </CardHeader>
            <CardContent>
              <LayoutGridWithUploads />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parallax" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Parallax Gallery</CardTitle>
              <p className="text-sm text-muted-foreground">
                Click on any position to upload images for the scrolling parallax gallery. Images will scroll with different speeds for a dynamic effect.
              </p>
            </CardHeader>
            <CardContent>
              <ParallaxWithUploads />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hero" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hero Parallax Gallery</CardTitle>
              <p className="text-sm text-muted-foreground">
                Click on any position to upload images for hero sections. The first position is the main hero image with text overlay.
              </p>
            </CardHeader>
            <CardContent>
              <HeroParallaxWithUploads />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
