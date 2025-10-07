'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Heart, Instagram, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface TeamMember {
  _id: string
  fullName: string
  profession: string
  photo?: string
  joinAs: 'team' | 'volunteer' | 'board_member' | 'advisor'
  role?: string
  skills?: string[]
  socialLinks?: {
    instagram?: string
  }
  address?: {
    city?: string
    state?: string
  }
}

export function VolunteersPreview() {
  const [volunteers, setVolunteers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [brokenImages, setBrokenImages] = useState<Set<string>>(new Set())

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch('/api/public/team-members?status=active&isPublic=true&joinAs=volunteer&limit=8')
        if (response.ok) {
          const data = await response.json()
          setVolunteers(data.data || [])
        }
      } catch (err) {
        console.error('Error fetching volunteers:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchVolunteers()
  }, [])

  const handleImageError = (memberId: string) => {
    setBrokenImages(prev => new Set(prev).add(memberId))
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2 text-muted-foreground">Loading volunteers...</p>
      </div>
    )
  }

  if (volunteers.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Our Volunteers</h3>
        <p className="text-muted-foreground">Meet some of our dedicated volunteers</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {volunteers.slice(0, 8).map((volunteer) => (
          <Card key={volunteer._id} className="text-center hover:shadow-lg transition-all duration-300 group">
            <CardContent className="p-4">
              <div className="relative mb-3">
                {volunteer.photo && !brokenImages.has(volunteer._id) ? (
                  <div className="w-12 h-12 mx-auto rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary/40 transition-colors">
                    <Image
                      src={volunteer.photo}
                      alt={volunteer.fullName}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(volunteer._id)}
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex items-center justify-center mx-auto border-2 border-primary/20 group-hover:border-primary/40 transition-colors">
                    <div className="text-center">
                      <div className="text-xs font-bold text-primary">
                        {getInitials(volunteer.fullName)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <h4 className="text-sm font-bold mb-1 line-clamp-1">{volunteer.fullName}</h4>
              <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{volunteer.profession}</p>
              
              {volunteer.skills && volunteer.skills.length > 0 && (
                <div className="mb-2">
                  <div className="flex flex-wrap justify-center gap-1">
                    {volunteer.skills.slice(0, 2).map((skill, index) => (
                      <span key={index} className="text-xs bg-muted px-1 py-0.5 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-center space-x-2">
                {volunteer.socialLinks?.instagram && (
                  <a
                    href={volunteer.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-pink-500 transition-colors"
                    title="Instagram"
                  >
                    <Instagram className="h-3 w-3" />
                  </a>
                )}
                {volunteer.address?.city && (
                  <span className="text-xs text-muted-foreground flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {volunteer.address.city}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center">
        <Link 
          href="/about" 
          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
        >
          <Users className="h-4 w-4 mr-2" />
          View All Team Members
        </Link>
      </div>
    </div>
  )
}
