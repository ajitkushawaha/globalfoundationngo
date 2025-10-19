"use client";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

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

export default function BentoGridDemo() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/gallery/category/bento?limit=7');
        if (response.ok) {
          const data = await response.json();
          const imageItems = data.data.map((img: GalleryImage, index: number) => ({
            title: img.title,
            description: img.description || "Discover the impact of our community initiatives.",
            header: <Skeleton />,
            icon: null
          }));
          setItems(imageItems);
        } else {
          // Fallback to default items if API fails
          setItems(defaultItems);
        }
      } catch (error) {
        console.error('Error fetching bento images:', error);
        setItems(defaultItems);
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
    <div className="w-full">
      <BentoGrid className="max-w-6xl mx-auto">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
const defaultItems = [
  {
    title: "Community Impact",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />,
    icon: null,
  },
  {
    title: "Education Initiatives",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
    icon: null,
  },
  {
    title: "Healthcare Programs",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
    icon: null,
  },
  {
    title: "Environmental Care",
    description: "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
    icon: null,
  },
  {
    title: "Youth Development",
    description: "Join the quest for understanding and enlightenment.",
    header: <Skeleton />,
    icon: null,
  },
  {
    title: "Women Empowerment",
    description: "Experience the thrill of bringing ideas to life.",
    header: <Skeleton />,
    icon: null,
  },
  {
    title: "Rural Development",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: <Skeleton />,
    icon: null,
  },
];
