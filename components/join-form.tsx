'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ImageUpload } from '@/components/ui/image-upload'
import { Checkbox } from '@/components/ui/checkbox'
import { Loader2, Upload, User, Mail, Phone, MapPin, Calendar, Instagram, Briefcase, Users, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'sonner'
import { formatInstagramLink } from '@/lib/utils'

interface FormData {
  fullName: string
  email: string
  phone: string
  instagramLink: string
  profession: string
  photo: string
  joinAs: 'team' | 'volunteer' | 'board_member' | 'advisor'
  age: string
  address: string
  skills: string[]
  availability: 'full_time' | 'part_time' | 'weekends' | 'evenings' | 'flexible'
  emergencyContact: {
    name: string
    phone: string
    relationship: string
  }
  agreeToTerms: boolean
  agreeToPrivacy: boolean
  allowSocialMedia: boolean
}

const skillOptions = [
  'Web Development', 'Mobile Development', 'Content Writing', 'Social Media Management', 
  'Marketing', 'Fundraising', 'Event Planning', 'Volunteer Coordination', 
  'Community Outreach', 'Education', 'Healthcare', 'Legal', 'Finance', 
  'Photography', 'Translation', 'Teaching', 'Counseling', 'Other'
]

const availabilityOptions = [
  { value: 'full_time', label: 'Full Time' },
  { value: 'part_time', label: 'Part Time' },
  { value: 'weekends', label: 'Weekends Only' },
  { value: 'evenings', label: 'Evenings Only' },
  { value: 'flexible', label: 'Flexible' }
]

const joinAsOptions = [
  { value: 'volunteer', label: 'Volunteer' },
  { value: 'team', label: 'Team Member' },
  { value: 'board_member', label: 'Board Member' },
  { value: 'advisor', label: 'Advisor' }
]

export function JoinForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    instagramLink: '',
    profession: '',
    photo: '',
    joinAs: 'volunteer',
    age: '',
    address: '',
    skills: [],
    availability: 'flexible',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    },
    agreeToTerms: false,
    agreeToPrivacy: false,
    allowSocialMedia: false
  })
  
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [newSkill, setNewSkill] = useState('')
  const [uploading, setUploading] = useState(false)

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

  const handleImageUpload = async (file: File) => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'team')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setFormData(prev => ({
          ...prev,
          photo: result.url
        }))
        toast.success('Photo uploaded successfully!')
      } else {
        toast.error(result.error || 'Failed to upload photo')
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      toast.error('Failed to upload photo')
    } finally {
      setUploading(false)
    }
  }



  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    if (!formData.profession.trim()) newErrors.profession = 'Profession is required'
    if (!formData.age) newErrors.age = 'Age is required'
    else if (isNaN(parseInt(formData.age)) || parseInt(formData.age) < 16 || parseInt(formData.age) > 100) {
      newErrors.age = 'Age must be between 16 and 100'
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.emergencyContact.name.trim()) newErrors['emergencyContact.name'] = 'Emergency contact name is required'
    if (!formData.emergencyContact.phone.trim()) newErrors['emergencyContact.phone'] = 'Emergency contact phone is required'
    if (!formData.emergencyContact.relationship.trim()) newErrors['emergencyContact.relationship'] = 'Emergency contact relationship is required'
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions'
    if (!formData.agreeToPrivacy) newErrors.agreeToPrivacy = 'You must agree to the privacy policy'

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
        body: JSON.stringify({
          ...formData,
          instagramLink: formatInstagramLink(formData.instagramLink),
          age: parseInt(formData.age) || 0,
          status: 'pending',
          isPublic: true,
          sortOrder: 0,
          allowSocialMedia: formData.allowSocialMedia
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast.success('Application submitted successfully! We will review your application and get back to you soon.')
        router.push('/join/success')
      } else {
        toast.error(result.error || 'Failed to submit application')
      }
    } catch (error) {
      console.error('Error submitting application:', error)
      toast.error('Failed to submit application')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Join Our Team</CardTitle>
        <p className="text-center text-muted-foreground">
          Fill out the form below to join our mission. All fields marked with * are required.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center">
              <User className="h-5 w-5 mr-2 text-primary" />
              Personal Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  className={errors.fullName ? 'border-red-500' : ''}
                />
                {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="Enter your phone number"
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  min="16"
                  max="100"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  placeholder="Enter your age"
                  className={errors.age ? 'border-red-500' : ''}
                />
                {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter your complete address"
                className={errors.address ? 'border-red-500' : ''}
                rows={3}
              />
              {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center">
              <Briefcase className="h-5 w-5 mr-2 text-primary" />
              Professional Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="profession">Profession *</Label>
                <Input
                  id="profession"
                  value={formData.profession}
                  onChange={(e) => handleInputChange('profession', e.target.value)}
                  placeholder="Enter your profession"
                  className={errors.profession ? 'border-red-500' : ''}
                />
                {errors.profession && <p className="text-sm text-red-500">{errors.profession}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="joinAs">Join As *</Label>
                <Select value={formData.joinAs} onValueChange={(value) => handleInputChange('joinAs', value)}>
                  <SelectTrigger className={errors.joinAs ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select how you want to join" />
                  </SelectTrigger>
                  <SelectContent>
                    {joinAsOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.joinAs && <p className="text-sm text-red-500">{errors.joinAs}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Availability</Label>
                <Select value={formData.availability} onValueChange={(value) => handleInputChange('availability', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your availability" />
                  </SelectTrigger>
                  <SelectContent>
                    {availabilityOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagramLink">Instagram ID</Label>
                <div className="relative">
                  <Instagram className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="instagramLink"
                    value={formData.instagramLink}
                    onChange={(e) => handleInputChange('instagramLink', e.target.value)}
                    placeholder="@username"
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Enter your username (e.g., @username)
                </p>
              </div>
            </div>

          </div>

          {/* Skills */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Skills & Expertise</h3>
            
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                />
                <Button type="button" onClick={addSkill} disabled={!newSkill.trim()}>
                  Add
                </Button>
              </div>
              
              {formData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-1 hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Photo Upload */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Profile Photo</h3>
            <div className="space-y-4">
              <ImageUpload
                value={formData.photo}
                onChange={(url) => setFormData(prev => ({ ...prev, photo: url }))}
                onImageSelect={handleImageUpload}
                label="Profile Photo"
                className="w-full max-w-xs"
                showPreview={true}
                previewSize="md"
                folder="team"
                uploading={uploading}
              />
              <p className="text-sm text-muted-foreground">
                Please upload a 9:16 ratio photo (portrait orientation) for best results.
              </p>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Emergency Contact</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="emergencyName">Contact Name *</Label>
                <Input
                  id="emergencyName"
                  value={formData.emergencyContact.name}
                  onChange={(e) => handleNestedInputChange('emergencyContact', 'name', e.target.value)}
                  placeholder="Emergency contact name"
                  className={errors['emergencyContact.name'] ? 'border-red-500' : ''}
                />
                {errors['emergencyContact.name'] && <p className="text-sm text-red-500">{errors['emergencyContact.name']}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyPhone">Contact Phone *</Label>
                <Input
                  id="emergencyPhone"
                  type="tel"
                  value={formData.emergencyContact.phone}
                  onChange={(e) => handleNestedInputChange('emergencyContact', 'phone', e.target.value)}
                  placeholder="Emergency contact phone"
                  className={errors['emergencyContact.phone'] ? 'border-red-500' : ''}
                />
                {errors['emergencyContact.phone'] && <p className="text-sm text-red-500">{errors['emergencyContact.phone']}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyRelationship">Relationship *</Label>
                <Input
                  id="emergencyRelationship"
                  value={formData.emergencyContact.relationship}
                  onChange={(e) => handleNestedInputChange('emergencyContact', 'relationship', e.target.value)}
                  placeholder="e.g., Parent, Spouse, Sibling"
                  className={errors['emergencyContact.relationship'] ? 'border-red-500' : ''}
                />
                {errors['emergencyContact.relationship'] && <p className="text-sm text-red-500">{errors['emergencyContact.relationship']}</p>}
              </div>
            </div>
          </div>

          {/* Confirmation Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-primary" />
              Confirm Your Information
            </h3>
            
            <Card className="bg-muted/50">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <h4 className="font-semibold text-lg mb-2">Your Application Summary</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Please review your information below and confirm your preferences
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                      <p className="text-sm font-medium">{formData.fullName || 'Not provided'}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                      <p className="text-sm font-medium">{formData.email || 'Not provided'}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground">Age</Label>
                      <p className="text-sm font-medium">{formData.age || 'Not provided'} years old</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground">Join As</Label>
                      <p className="text-sm font-medium capitalize">{formData.joinAs?.replace('_', ' ') || 'Not provided'}</p>
                    </div>
                  </div>
                  
                  {formData.photo && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground">Profile Photo</Label>
                      <div className="flex items-center space-x-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-200 flex items-center justify-center bg-gray-50">
                          <Image
                            src={formData.photo}
                            alt="Profile preview"
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                            onError={() => {}}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">Photo uploaded successfully</p>
                      </div>
                    </div>
                  )}
                  
                  {formData.instagramLink && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-muted-foreground">Instagram Link</Label>
                      <p className="text-sm font-medium break-all">{formData.instagramLink}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Social Media Permission */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Social Media Usage Permission</h3>
            
            <Card className="border-2 border-blue-200 bg-blue-50/50">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 font-semibold text-sm">!</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-2">How we use your information</h4>
                      <p className="text-sm text-blue-800 mb-4">
                        We'd like to feature our amazing team members on our social media platforms to showcase 
                        the wonderful people who make our mission possible.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="allowSocialMedia"
                        checked={formData.allowSocialMedia}
                        onCheckedChange={(checked) => handleInputChange('allowSocialMedia', checked)}
                        className={errors.allowSocialMedia ? 'border-red-500' : ''}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="allowSocialMedia" className="text-sm font-medium">
                          Yes, I allow GEKCT to use my information on social media
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          This includes your name, photo, and Instagram link (if provided) for team spotlights, 
                          event posts, and other promotional content.
                        </p>
                        {errors.allowSocialMedia && <p className="text-sm text-red-500">{errors.allowSocialMedia}</p>}
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="keepPrivate"
                        checked={!formData.allowSocialMedia}
                        onCheckedChange={(checked) => handleInputChange('allowSocialMedia', !checked)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label htmlFor="keepPrivate" className="text-sm font-medium">
                          No, keep my information private
                        </Label>
                        <p className="text-xs text-muted-foreground">
                          Your information will only be used for internal purposes and will not be shared publicly.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked)}
                className={errors.agreeToTerms ? 'border-red-500' : ''}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="agreeToTerms" className="text-sm">
                  I agree to the <a href="/terms" target="_blank" className="text-primary hover:underline">terms and conditions</a> *
                </Label>
                {errors.agreeToTerms && <p className="text-sm text-red-500">{errors.agreeToTerms}</p>}
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="agreeToPrivacy"
                checked={formData.agreeToPrivacy}
                onCheckedChange={(checked) => handleInputChange('agreeToPrivacy', checked)}
                className={errors.agreeToPrivacy ? 'border-red-500' : ''}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="agreeToPrivacy" className="text-sm">
                  I agree to the <a href="/privacy" target="_blank" className="text-primary hover:underline">privacy policy</a> and consent to data processing *
                </Label>
                {errors.agreeToPrivacy && <p className="text-sm text-red-500">{errors.agreeToPrivacy}</p>}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full max-w-md"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting Application...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Submit Application
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
