'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Heart, UserCheck, Instagram, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

interface TeamMember {
  _id: string
  fullName: string
  email: string
  phone: string
  instagramLink?: string
  profession: string
  photo?: string
  joinAs: 'team' | 'volunteer' | 'board_member' | 'advisor'
  role?: string
  department?: string
  bio?: string
  skills?: string[]
  status: 'active' | 'inactive' | 'pending' | 'suspended'
  socialLinks?: {
    instagram?: string
    linkedin?: string
    twitter?: string
    facebook?: string
  }
  address?: {
    city?: string
    state?: string
    country?: string
  }
}

export function TeamSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [brokenImages, setBrokenImages] = useState<Set<string>>(new Set())

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch('/api/public/team-members?status=active&isPublic=true')
        if (!response.ok) {
          throw new Error('Failed to fetch team members')
        }
        const data = await response.json()
        setTeamMembers(data.data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchTeamMembers()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Our Team
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6" />
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Meet the dedicated individuals who make our mission possible
              </p>
            </div>
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading team members...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <p className="text-red-500">Error loading team members: {error}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Group team members by their role
  const boardMembers = teamMembers.filter(member => member.joinAs === 'board_member')
  const teamMembersList = teamMembers.filter(member => member.joinAs === 'team')
  const volunteers = teamMembers.filter(member => member.joinAs === 'volunteer')
  const advisors = teamMembers.filter(member => member.joinAs === 'advisor')

  const getRoleIcon = (joinAs: string) => {
    switch (joinAs) {
      case 'board_member':
        return <UserCheck className="h-6 w-6 text-primary" />
      case 'team':
        return <Users className="h-6 w-6 text-primary" />
      case 'volunteer':
        return <Heart className="h-6 w-6 text-primary" />
      case 'advisor':
        return <UserCheck className="h-6 w-6 text-primary" />
      default:
        return <Users className="h-6 w-6 text-primary" />
    }
  }

  const getRoleLabel = (joinAs: string) => {
    switch (joinAs) {
      case 'board_member':
        return 'Board Member'
      case 'team':
        return 'Team Member'
      case 'volunteer':
        return 'Volunteer'
      case 'advisor':
        return 'Advisor'
      default:
        return 'Member'
    }
  }

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

  const renderTeamGroup = (members: TeamMember[], title: string, gridCols: string) => {
    if (members.length === 0) return null

    return (
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-center mb-8">{title}</h3>
        <div className={`grid ${gridCols} gap-6`}>
          {members.map((member) => (
            <Card key={member._id} className="text-center hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="relative mb-4">
                  {member.photo && !brokenImages.has(member._id) ? (
                    <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary/40 transition-colors">
                      <Image
                        src={member.photo}
                        alt={member.fullName}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                        onError={() => handleImageError(member._id)}
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex flex-col items-center justify-center mx-auto border-4 border-primary/20 group-hover:border-primary/40 transition-colors">
                      <div className="text-lg font-bold text-primary mb-1">
                        {getInitials(member.fullName)}
                      </div>
                      <div className="text-primary/70">
                        {getRoleIcon(member.joinAs)}
                      </div>
                    </div>
                  )}
                </div>
                
                <h4 className="text-lg font-bold mb-2">{member.fullName}</h4>
                <p className="text-sm text-muted-foreground mb-2">{member.profession}</p>
                
                <div className="flex justify-center space-x-2 mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {member.role || getRoleLabel(member.joinAs)}
                  </Badge>
                  {member.department && (
                    <Badge variant="outline" className="text-xs">
                      {member.department}
                    </Badge>
                  )}
                </div>

                {member.skills && member.skills.length > 0 && (
                  <div className="mb-3">
                    <div className="flex flex-wrap justify-center gap-1">
                      {member.skills.slice(0, 3).map((skill, index) => (
                        <span key={index} className="text-xs bg-muted px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                      {member.skills.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{member.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex justify-center space-x-3 mt-4">
                  {member.instagramLink && (
                    <a
                      href={member.instagramLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-pink-500 transition-colors"
                      title="Instagram"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                  )}
                  {member.socialLinks?.linkedin && (
                    <a
                      href={member.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-blue-600 transition-colors"
                      title="LinkedIn"
                    >
                      <Users className="h-4 w-4" />
                    </a>
                  )}
                </div>

                {member.address?.city && (
                  <p className="text-xs text-muted-foreground mt-2 flex items-center justify-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {member.address.city}
                    {member.address.state && `, ${member.address.state}`}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Our Team
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6" />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Meet the dedicated individuals who make our mission possible
            </p>
          </div>

          {/* Board Members */}
          {renderTeamGroup(boardMembers, "Board of Trustees", "md:grid-cols-2 lg:grid-cols-3")}

          {/* Team Members */}
          {renderTeamGroup(teamMembersList, "Team Members", "md:grid-cols-2 lg:grid-cols-3")}

          {/* Advisors */}
          {renderTeamGroup(advisors, "Advisors", "md:grid-cols-2 lg:grid-cols-3")}

          {/* Volunteers */}
          {renderTeamGroup(volunteers, "Our Volunteers", "md:grid-cols-2 lg:grid-cols-4")}

          {teamMembers.length === 0 && (
            <div className="text-center py-12">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No team members found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
