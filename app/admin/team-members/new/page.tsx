'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminLayout } from '@/components/admin-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ImageUpload } from '@/components/ui/image-upload'
import { ArrowLeft, Save, Loader2, Plus, X } from 'lucide-react'
import { toast } from 'sonner'

interface FormData {
  fullName: string
  email: string
  phone: string
  instagramLink: string
  profession: string
  photo: string
  joinAs: 'team' | 'volunteer' | 'board_member' | 'advisor'
  role: string
  department: string
  bio: string
  skills: string[]
  availability: 'full_time' | 'part_time' | 'weekends' | 'evenings' | 'flexible'
  status: 'active' | 'inactive' | 'pending' | 'suspended'
  isPublic: boolean
  sortOrder: number
  socialLinks: {
    instagram: string
    linkedin: string
    twitter: string
    facebook: string
  }
  address: {
    street: string
    city: string
    state: string
    country: string
    zipCode: string
  }
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
  achievements: string[]
  notes: string
}

const skillOptions = [
  'Web Development', 'Mobile Development', 'UI/UX Design', 'Graphic Design',
  'Content Writing', 'Social Media Management', 'Marketing', 'Fundraising',
  'Event Planning', 'Volunteer Coordination', 'Community Outreach',
  'Education', 'Healthcare', 'Legal', 'Finance', 'Photography',
  'Video Production', 'Public Speaking', 'Translation', 'Other'
]

export default function NewTeamMemberPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    instagramLink: '',
    profession: '',
    photo: '',
    joinAs: 'volunteer',
    role: '',
    department: '',
    bio: '',
    skills: [],
    availability: 'flexible',
    status: 'pending',
    isPublic: true,
    sortOrder: 0,
    socialLinks: {
      instagram: '',
      linkedin: '',
      twitter: '',
      facebook: ''
    },
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: ''
    },
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    },
    achievements: [],
    notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [newSkill, setNewSkill] = useState('')
  const [newAchievement, setNewAchievement] = useState('')

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const handleNestedInputChange = (parentField: keyof FormData, childField: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField] as any,
        [childField]: value
      }
    }))
  }

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }))
      setNewSkill('')
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  const addAchievement = () => {
    if (newAchievement.trim() && !formData.achievements.includes(newAchievement.trim())) {
      setFormData(prev => ({
        ...prev,
        achievements: [...prev.achievements, newAchievement.trim()]
      }))
      setNewAchievement('')
    }
  }

  const removeAchievement = (achievementToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter(achievement => achievement !== achievementToRemove)
    }))
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.profession.trim()) newErrors.profession = 'Profession is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Please fix the errors below')
      return
    }

    setLoading(true)
    
    try {
      const response = await fetch('/api/team-members', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        toast.success('Team member created successfully!')
        router.push('/admin/team-members')
      } else {
        toast.error(result.error || 'Failed to create team member')
      }
    } catch (error) {
      console.error('Error creating team member:', error)
      toast.error('Failed to create team member')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout title="Add Team Member" subtitle="Add a new team member or volunteer">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.back()}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Add Team Member</h1>
              <p className="text-muted-foreground">Add a new team member or volunteer to the organization</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter full name"
                    className={errors.fullName ? 'border-red-500' : ''}
                  />
                  {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter email address"
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter phone number"
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profession">Profession *</Label>
                  <Input
                    id="profession"
                    value={formData.profession}
                    onChange={(e) => handleInputChange('profession', e.target.value)}
                    placeholder="Enter profession"
                    className={errors.profession ? 'border-red-500' : ''}
                  />
                  {errors.profession && <p className="text-sm text-red-500">{errors.profession}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  placeholder="Tell us about this person..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Role & Department */}
          <Card>
            <CardHeader>
              <CardTitle>Role & Department</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="joinAs">Join As *</Label>
                  <Select value={formData.joinAs} onValueChange={(value) => handleInputChange('joinAs', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="team">Team Member</SelectItem>
                      <SelectItem value="volunteer">Volunteer</SelectItem>
                      <SelectItem value="board_member">Board Member</SelectItem>
                      <SelectItem value="advisor">Advisor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    placeholder="e.g., Project Manager"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    placeholder="e.g., Technology"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Select value={formData.availability} onValueChange={(value) => handleInputChange('availability', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select availability" />
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

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
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
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Select value={newSkill} onValueChange={setNewSkill}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select or add a skill" />
                  </SelectTrigger>
                  <SelectContent>
                    {skillOptions.map((skill) => (
                      <SelectItem key={skill} value={skill}>
                        {skill}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="button" onClick={addSkill} disabled={!newSkill.trim()}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {formData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <div key={index} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    value={formData.socialLinks.linkedin}
                    onChange={(e) => handleNestedInputChange('socialLinks', 'linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    value={formData.socialLinks.twitter}
                    onChange={(e) => handleNestedInputChange('socialLinks', 'twitter', e.target.value)}
                    placeholder="https://twitter.com/username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    value={formData.socialLinks.facebook}
                    onChange={(e) => handleNestedInputChange('socialLinks', 'facebook', e.target.value)}
                    placeholder="https://facebook.com/username"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sortOrder">Sort Order</Label>
                  <Input
                    id="sortOrder"
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => handleInputChange('sortOrder', parseInt(e.target.value) || 0)}
                    placeholder="0"
                  />
                  <p className="text-sm text-muted-foreground">Lower numbers appear first</p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isPublic"
                    checked={formData.isPublic}
                    onCheckedChange={(checked) => handleInputChange('isPublic', checked)}
                  />
                  <Label htmlFor="isPublic">Make public</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex items-center"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Create Team Member
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}
