"use client";
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Users, Calendar, ArrowRight } from 'lucide-react';

interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  createdAt: string;
  readTime?: string;
}

interface BlogSidebarProps {
  recentPosts?: BlogPost[];
}

interface Statistic {
  _id: string
  type: string
  value: string
  label: string
  description: string
  icon: string
  color: string
  bgColor: string
  order: number
  isActive: boolean
}

export function BlogSidebar({ recentPosts = [] }: BlogSidebarProps) {
  const [stats, setStats] = useState<Statistic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/statistics');
        if (response.ok) {
          const data = await response.json();
          if (data?.success && Array.isArray(data.data)) {
            setStats(data.data.filter((stat: Statistic) => stat.isActive));
          } else {
            setError('Failed to load statistics');
          }
        } else {
          setError('Failed to load statistics');
        }
      } catch (error) {
        console.error('Error fetching statistics:', error);
        setError('Failed to load statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const posts = recentPosts.length > 0 ? recentPosts : [];

  return (
    <div className="space-y-6">
      {/* Recent Stories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Users className="w-5 h-5 mr-2 text-blue-600" />
            Recent Stories
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div key={post.slug} className="group">
                <div className="flex space-x-3">
                  {post.featuredImage && (
                    <div className="flex-shrink-0">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      {post.readTime && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{post.readTime}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                {index < posts.length - 1 && (
                  <div className="mt-4 border-b border-gray-100" />
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">No recent stories available</p>
          )}
          
          <Button variant="outline" className="w-full mt-4 group">
            View All Stories
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-100 border-green-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-green-900">Our Impact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {loading ? (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-4">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          ) : stats.length > 0 ? (
            stats.slice(0, 4).map((stat) => (
              <div key={stat._id} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{stat.label}</span>
                <span className="font-bold text-green-600">{stat.value}</span>
              </div>
            ))
          ) : (
            <div className="text-center py-4">
              <p className="text-sm text-gray-500">No statistics available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
