"use client";
import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "@/components/ui/layout-grid";

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
}

export default function LayoutGridDemo() {
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/gallery/category/interactive?limit=4');
        if (response.ok) {
          const data = await response.json();
          const imageCards = data.data.map((img: GalleryImage, index: number) => ({
            id: index + 1,
            content: <SkeletonComponent title={img.title} description={img.description} />,
            className: index === 0 || index === 3 ? "md:col-span-2" : "col-span-1",
            thumbnail: img.cloudinaryUrl
          }));
          setCards(imageCards);
        } else {
          // Fallback to default cards if API fails
          setCards(defaultCards);
        }
      } catch (error) {
        console.error('Error fetching interactive images:', error);
        setCards(defaultCards);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[400px]">
      <LayoutGrid cards={cards} />
    </div>
  );
}

const SkeletonComponent = ({ title, description }: { title: string; description?: string }) => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        {title}
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        {description || "A beautiful image showcasing our community impact and initiatives."}
      </p>
    </div>
  );
};

// Fallback cards
const defaultCards = [
  {
    id: 1,
    content: <SkeletonComponent title="House in the woods" description="A serene and tranquil retreat, this house in the woods offers a peaceful escape from the hustle and bustle of city life." />,
    className: "md:col-span-2",
    thumbnail: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    content: <SkeletonComponent title="House above the clouds" description="Perched high above the world, this house offers breathtaking views and a unique living experience. It's a place where the sky meets home, and tranquility is a way of life." />,
    className: "col-span-1",
    thumbnail: "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    content: <SkeletonComponent title="Greens all over" description="A house surrounded by greenery and nature's beauty. It's the perfect place to relax, unwind, and enjoy life." />,
    className: "col-span-1",
    thumbnail: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    content: <SkeletonComponent title="Rivers are serene" description="A house by the river is a place of peace and tranquility. It's the perfect place to relax, unwind, and enjoy life." />,
    className: "md:col-span-2",
    thumbnail: "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];