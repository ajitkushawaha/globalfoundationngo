"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';

export function DonationSpotlight() {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-200">
      <CardHeader className="text-center pb-4">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-xl text-blue-900">Support Our Mission</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-gray-700 text-sm leading-relaxed">
          Your donation directly impacts lives. Every contribution helps us continue our vital work in education, healthcare, and community development.
        </p>
        
        <div className="bg-white rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">This Month's Impact</span>
            <span className="font-bold text-green-600">₹2,45,000</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Lives Changed</span>
            <span className="font-bold text-blue-600">1,250+</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Active Programs</span>
            <span className="font-bold text-purple-600">12</span>
          </div>
        </div>

        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          <Heart className="w-4 h-4 mr-2" />
          Donate Now
        </Button>
        
        <p className="text-xs text-gray-500">
          100% transparent • Secure payment • Tax deductible
        </p>
      </CardContent>
    </Card>
  );
}
