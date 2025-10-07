'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { AdminLayout } from '@/components/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { ImageUpload } from '@/components/ui/image-upload'
import { 
  ArrowLeft, 
  Save, 
  User, 
  Mail, 
  Phone, 
  Instagram, 
  Briefcase, 
  MapPin,
  Calendar,
  Eye,
  EyeOff,
  Users,
  Heart,
  UserCheck,
  GraduationCap,
  X
} from 'lucide-react'
import Image from 'next/image'

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
  skills: string[]
  availability: 'full_time' | 'part_time' | 'weekends' | 'evenings' | 'flexible'
  status: 'active' | 'inactive' | 'pending' | 'suspended'
  joinDate: string
  isPublic: boolean
  sortOrder: number
  address?: {
    street?: string
    city?: string
    state?: string
    country?: string
    zipCode?: string
  }
  socialLinks?: {
    linkedin?: string
    twitter?: string
    facebook?: string
    instagram?: string
  }
  achievements?: string[]
  createdAt: string
  updatedAt: string
}

export default function EditTeamMemberPage() {
  const router = useRouter()
  const params = useParams()
  const memberId = params.id as string

  const [member, setMember] = useState<TeamMember | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    instagramLink: '',
    profession: '',
    photo: '',
    joinAs: 'volunteer' as TeamMember['joinAs'],
    role: '',
    department: '',
    bio: '',
    skills: [] as string[],
    availability: 'flexible' as TeamMember['availability'],
    status: 'active' as TeamMember['status'],
    isPublic: true,
    sortOrder: 0,
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: ''
    },
    socialLinks: {
      linkedin: '',
      twitter: '',
      facebook: '',
      instagram: ''
    },
    achievements: [] as string[]
  })

  const [skillsInput, setSkillsInput] = useState('')
  const [achievementsInput, setAchievementsInput] = useState('')

  useEffect(() => {
    if (memberId) {
      fetchMember()
    }
  }, [memberId])

  const fetchMember = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/team-members/${memberId}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch team member')
      }
      
      const data = await response.json()
      if (data.success) {
        const memberData = data.data
        setMember(memberData)
        
        // Populate form data
        setFormData({
          fullName: memberData.fullName || '',
          email: memberData.email || '',
          phone: memberData.phone || '',
          instagramLink: memberData.instagramLink || '',
          profession: memberData.profession || '',
          photo: memberData.photo || '',
          joinAs: memberData.joinAs || 'volunteer',
          role: memberData.role || '',
          department: memberData.department || '',
          bio: memberData.bio || '',
          skills: memberData.skills || [],
          availability: memberData.availability || 'flexible',
          status: memberData.status || 'active',
          isPublic: memberData.isPublic !== undefined ? memberData.isPublic : true,
          sortOrder: memberData.sortOrder || 0,
          address: {
            street: memberData.address?.street || '',
            city: memberData.address?.city || '',
            state: memberData.address?.state || '',
            country: memberData.address?.country || '',
            zipCode: memberData.address?.zipCode || ''
          },
          socialLinks: {
            linkedin: memberData.socialLinks?.linkedin || '',
            twitter: memberData.socialLinks?.twitter || '',
            facebook: memberData.socialLinks?.facebook || '',
            instagram: memberData.socialLinks?.instagram || ''
          },
          achievements: memberData.achievements || []
        })
        
        setSkillsInput((memberData.skills || []).join(', '))
        setAchievementsInput((memberData.achievements || []).join(', '))
      } else {
        throw new Error(data.error || 'Failed to fetch team member')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAddressChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }))
  }

  const handleSocialLinksChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [field]: value
      }
    }))
  }

  const handleSkillsChange = (value: string) => {
    setSkillsInput(value)
    const skills = value.split(',').map(s => s.trim()).filter(s => s.length > 0)
    setFormData(prev => ({
      ...prev,
      skills
    }))
  }

  const handleAchievementsChange = (value: string) => {
    setAchievementsInput(value)
    const achievements = value.split(',').map(s => s.trim()).filter(s => s.length > 0)
    setFormData(prev => ({
      ...prev,
      achievements
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Don't submit if still loading or no member data
    if (loading || !member) {
      return
    }
    
    try {
      setSaving(true)
      setError(null)

      // Validate required fields
      if (!formData.fullName.trim()) {
        setError('Full name is required')
        return
      }
      if (!formData.email.trim()) {
        setError('Email is required')
        return
      }
      if (!formData.phone.trim()) {
        setError('Phone number is required')
        return
      }
      if (!formData.profession.trim()) {
        setError('Profession is required')
        return
      }

      console.log('Submitting form data:', formData)

      const response = await fetch(`/api/team-members/${memberId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      console.log('Response status:', response.status)
      const data = await response.json()
      console.log('Response data:', data)

      if (data.success) {
        router.push('/admin/team-members')
      } else {
        setError(data.error || 'Failed to update team member')
      }
    } catch (err) {
      console.error('Submit error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setSaving(false)
    }
  }

  const getRoleIcon = (joinAs: string) => {
    switch (joinAs) {
      case 'board_member':
        return <Users className="h-5 w-5" />
      case 'team':
        return <Briefcase className="h-5 w-5" />
      case 'volunteer':
        return <Heart className="h-5 w-5" />
      case 'advisor':
        return <GraduationCap className="h-5 w-5" />
      default:
        return <User className="h-5 w-5" />
    }
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
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading team member...</p>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <X className="h-12 w-12 mx-auto mb-2" />
              <p className="text-lg font-semibold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
            <Button onClick={() => router.push('/admin/team-members')} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Team Members
            </Button>
          </div>
        </div>
      </AdminLayout>
    )
  }

  if (!member) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-muted-foreground mb-4">
              <User className="h-12 w-12 mx-auto mb-2" />
              <p className="text-lg font-semibold">Team Member Not Found</p>
            </div>
            <Button onClick={() => router.push('/admin/team-members')} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Team Members
            </Button>
          </div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => router.push('/admin/team-members')}
              variant="outline"
              size="sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Edit Team Member</h1>
              <p className="text-muted-foreground">
                Update {member.fullName}'s information
              </p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <X className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="profession">Profession *</Label>
                      <Input
                        id="profession"
                        value={formData.profession}
                        onChange={(e) => handleInputChange('profession', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="instagramLink">Instagram Link</Label>
                    <Input
                      id="instagramLink"
                      value={formData.instagramLink}
                      onChange={(e) => handleInputChange('instagramLink', e.target.value)}
                      placeholder="https://instagram.com/username"
                    />
                  </div>

                  <ImageUpload
                    value={formData.photo}
                    onChange={(value) => handleInputChange('photo', value)}
                    label="Profile Photo"
                    placeholder="Upload a profile photo or enter URL"
                    maxSize={5}
                    previewSize="md"
                  />
                </CardContent>
              </Card>

              {/* Role & Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="h-5 w-5 mr-2" />
                    Role & Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="joinAs">Join As *</Label>
                      <Select
                        value={formData.joinAs}
                        onValueChange={(value) => handleInputChange('joinAs', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="volunteer">Volunteer</SelectItem>
                          <SelectItem value="team">Team Member</SelectItem>
                          <SelectItem value="board_member">Board Member</SelectItem>
                          <SelectItem value="advisor">Advisor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="status">Status *</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) => handleInputChange('status', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <Input
                        id="role"
                        value={formData.role}
                        onChange={(e) => handleInputChange('role', e.target.value)}
                        placeholder="e.g., Project Manager, Coordinator"
                      />
                    </div>
                    <div>
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={formData.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        placeholder="e.g., Education, Operations"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="availability">Availability</Label>
                    <Select
                      value={formData.availability}
                      onValueChange={(value) => handleInputChange('availability', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full_time">Full Time</SelectItem>
                        <SelectItem value="part_time">Part Time</SelectItem>
                        <SelectItem value="weekends">Weekends</SelectItem>
                        <SelectItem value="evenings">Evenings</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Bio & Skills */}
              <Card>
                <CardHeader>
                  <CardTitle>Bio & Skills</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Tell us about this team member..."
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="skills">Skills</Label>
                    <Input
                      id="skills"
                      value={skillsInput}
                      onChange={(e) => handleSkillsChange(e.target.value)}
                      placeholder="Enter skills separated by commas (e.g., Teaching, Leadership, Communication)"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Separate multiple skills with commas
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="achievements">Achievements</Label>
                    <Input
                      id="achievements"
                      value={achievementsInput}
                      onChange={(e) => handleAchievementsChange(e.target.value)}
                      placeholder="Enter achievements separated by commas"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Separate multiple achievements with commas
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2" />
                    Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      value={formData.address.street}
                      onChange={(e) => handleAddressChange('street', e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.address.city}
                        onChange={(e) => handleAddressChange('city', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={formData.address.state}
                        onChange={(e) => handleAddressChange('state', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        value={formData.address.country}
                        onChange={(e) => handleAddressChange('country', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={formData.address.zipCode}
                        onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Social Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input
                        id="linkedin"
                        value={formData.socialLinks.linkedin}
                        onChange={(e) => handleSocialLinksChange('linkedin', e.target.value)}
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    <div>
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        value={formData.socialLinks.twitter}
                        onChange={(e) => handleSocialLinksChange('twitter', e.target.value)}
                        placeholder="https://twitter.com/username"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="facebook">Facebook</Label>
                      <Input
                        id="facebook"
                        value={formData.socialLinks.facebook}
                        onChange={(e) => handleSocialLinksChange('facebook', e.target.value)}
                        placeholder="https://facebook.com/username"
                      />
                    </div>
                    <div>
                      <Label htmlFor="instagram">Instagram</Label>
                      <Input
                        id="instagram"
                        value={formData.socialLinks.instagram}
                        onChange={(e) => handleSocialLinksChange('instagram', e.target.value)}
                        placeholder="https://instagram.com/username"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="relative w-20 h-20 mx-auto mb-4">
                      {formData.photo ? (
                        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary/20">
                          <Image
                            src={formData.photo}
                            alt={formData.fullName}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex flex-col items-center justify-center border-4 border-primary/20">
                          <div className="text-lg font-bold text-primary mb-1">
                            {getInitials(formData.fullName)}
                          </div>
                          <div className="text-primary/70">
                            {getRoleIcon(formData.joinAs)}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-bold mb-2">{formData.fullName}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{formData.profession}</p>
                    
                    <div className="flex justify-center mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {formData.role || formData.joinAs.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Badge>
                    </div>

                    <div className="flex justify-center mb-3">
                      <Badge 
                        variant={formData.status === 'active' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {formData.status}
                      </Badge>
                    </div>

                    {formData.isPublic ? (
                      <div className="flex items-center justify-center text-green-600 text-xs">
                        <Eye className="h-3 w-3 mr-1" />
                        Public
                      </div>
                    ) : (
                      <div className="flex items-center justify-center text-gray-500 text-xs">
                        <EyeOff className="h-3 w-3 mr-1" />
                        Private
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="isPublic">Public Profile</Label>
                    <Button
                      type="button"
                      variant={formData.isPublic ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleInputChange('isPublic', !formData.isPublic)}
                    >
                      {formData.isPublic ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </Button>
                  </div>

                  <div>
                    <Label htmlFor="sortOrder">Sort Order</Label>
                    <Input
                      id="sortOrder"
                      type="number"
                      value={formData.sortOrder}
                      onChange={(e) => handleInputChange('sortOrder', parseInt(e.target.value) || 0)}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Lower numbers appear first
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={saving || loading || !member}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {saving ? 'Saving...' : loading ? 'Loading...' : 'Save Changes'}
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => router.push('/admin/team-members')}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
