"use client";
import React from "react";
import { GEKCTHeroParallax } from "@/components/ui/gekct-hero-parallax";

export default function GEKCTHeroParallaxDemo() {
  return <GEKCTHeroParallax initiatives={initiatives} />;
}

export const initiatives = [
  {
    title: "Education for All",
    description: "Providing quality education and learning resources to underprivileged children across Gujarat.",
    thumbnail: "/children-studying-in-classroom-with-books-and-teac.jpg",
    category: "Education",
  },
  {
    title: "Animal Rescue Mission",
    description: "Saving and caring for stray animals, providing medical treatment and finding loving homes.",
    thumbnail: "/veterinarian-caring-for-rescued-animals-in-shelter.jpg",
    category: "Animal Welfare",
  },
  {
    title: "Elderly Care Program",
    description: "Bringing joy and support to senior citizens through regular visits and essential care.",
    thumbnail: "/elderly-people-being-cared-for-by-volunteers-in-co.jpg",
    category: "Elderly Care",
  },
  {
    title: "Green Initiative",
    description: "Planting trees and promoting environmental conservation for a sustainable future.",
    thumbnail: "/volunteers-planting-trees-in-community-environment.jpg",
    category: "Environment",
  },
  {
    title: "Community Development",
    description: "Building stronger communities through various social development programs.",
    thumbnail: "/diverse-group-of-children-and-adults-in-colorful-t.jpg",
    category: "Community",
  },
  {
    title: "Digital Learning",
    description: "Introducing technology in education to bridge the digital divide.",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Education",
  },
  {
    title: "Health Awareness",
    description: "Conducting health camps and awareness programs in rural areas.",
    thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Health",
  },
  {
    title: "Women Empowerment",
    description: "Supporting women through skill development and entrepreneurship programs.",
    thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Empowerment",
  },
  {
    title: "Youth Development",
    description: "Mentoring and guiding young people towards a brighter future.",
    thumbnail: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Youth",
  },
  {
    title: "Disaster Relief",
    description: "Providing immediate assistance and support during natural disasters.",
    thumbnail: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Relief",
  },
  {
    title: "Rural Development",
    description: "Improving infrastructure and living conditions in rural communities.",
    thumbnail: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Development",
  },
  {
    title: "Cultural Preservation",
    description: "Preserving and promoting local culture and traditions.",
    thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Culture",
  },
  {
    title: "Sports for All",
    description: "Encouraging physical fitness and sports participation among youth.",
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Sports",
  },
  {
    title: "Food Security",
    description: "Ensuring no one goes hungry through community kitchen programs.",
    thumbnail: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Food",
  },
  {
    title: "Skill Training",
    description: "Providing vocational training to help people become self-reliant.",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    category: "Training",
  },
];
