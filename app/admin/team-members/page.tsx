'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AdminLayout } from '@/components/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  X, 
  Users,
  Mail,
  Phone,
  Instagram,
  Briefcase,
  Calendar,
  Eye,
  EyeOff,
  Filter,
  Download,
  Upload,
  Check,
  XCircle,
  Clock
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
  skills: string[]
  availability: 'full_time' | 'part_time' | 'weekends' | 'evenings' | 'flexible'
  status: 'active' | 'inactive' | 'pending' | 'suspended'
  joinDate: string
  lastActive?: string
  isPublic: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export default function TeamMembersPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [filteredMembers, setFilteredMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [joinAsFilter, setJoinAsFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const loadData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/team-members')
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setTeamMembers(data.data)
          setFilteredMembers(data.data)
        }
      }
    } catch (error) {
      console.error('Error loading team members:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    let filtered = teamMembers

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(member => 
        member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filter by join as
    if (joinAsFilter !== 'all') {
      filtered = filtered.filter(member => member.joinAs === joinAsFilter)
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(member => member.status === statusFilter)
    }

    setFilteredMembers(filtered)
  }, [searchTerm, joinAsFilter, statusFilter, teamMembers])

  const deleteMember = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return
    
    try {
      const response = await fetch(`/api/team-members/${id}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        setTeamMembers(teamMembers.filter(member => member._id !== id))
      }
    } catch (error) {
      console.error('Error deleting team member:', error)
    }
  }

  const toggleMemberStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
    
    try {
      const response = await fetch(`/api/team-members/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      })

      if (response.ok) {
        setTeamMembers(teamMembers.map(member => 
          member._id === id ? { ...member, status: newStatus } : member
        ))
      }
    } catch (error) {
      console.error('Error updating member status:', error)
    }
  }

  const approveMember = async (id: string) => {
    try {
      const response = await fetch(`/api/team-members/${id}/approve`, {
        method: 'POST'
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          setTeamMembers(teamMembers.map(member => 
            member._id === id ? { ...member, status: 'active', isPublic: true } : member
          ))
        }
      }
    } catch (error) {
      console.error('Error approving member:', error)
    }
  }

  const rejectMember = async (id: string) => {
    if (!confirm('Are you sure you want to reject this team member request?')) return
    
    try {
      const response = await fetch(`/api/team-members/${id}/reject`, {
        method: 'POST'
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          setTeamMembers(teamMembers.map(member => 
            member._id === id ? { ...member, status: 'inactive', isPublic: false } : member
          ))
        }
      }
    } catch (error) {
      console.error('Error rejecting member:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getJoinAsColor = (joinAs: string) => {
    switch (joinAs) {
      case 'team': return 'bg-blue-100 text-blue-800'
      case 'volunteer': return 'bg-purple-100 text-purple-800'
      case 'board_member': return 'bg-orange-100 text-orange-800'
      case 'advisor': return 'bg-indigo-100 text-indigo-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatJoinAs = (joinAs: string) => {
    return joinAs.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  return (
    <AdminLayout title="Team Members" subtitle="Manage team members and volunteers">
      {/* Header Actions */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Manage team members, volunteers, and board members
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Button
            onClick={loadData}
            disabled={loading}
            variant="outline"
            className="flex items-center"
          >
            <Download className="h-4 w-4 mr-2" />
            {loading ? 'Loading...' : 'Refresh'}
          </Button>
          <Link
            href="/admin/team-members/import"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
          >
            <Upload className="h-4 w-4 mr-2" />
            Import CSV
          </Link>
          <Link
            href="/admin/team-members/new"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Member
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="pl-10"
          />
        </div>

        {/* Join As Filter */}
        <Select value={joinAsFilter} onValueChange={setJoinAsFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="team">Team Members</SelectItem>
            <SelectItem value="volunteer">Volunteers</SelectItem>
            <SelectItem value="board_member">Board Members</SelectItem>
            <SelectItem value="advisor">Advisors</SelectItem>
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        {(searchTerm || joinAsFilter !== 'all' || statusFilter !== 'all') && (
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('')
              setJoinAsFilter('all')
              setStatusFilter('all')
            }}
            className="flex items-center"
          >
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Members</p>
                <p className="text-2xl font-bold">{teamMembers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold">{teamMembers.filter(m => m.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className={teamMembers.filter(m => m.status === 'pending').length > 0 ? 'ring-2 ring-yellow-400' : ''}>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Requests</p>
                <p className="text-2xl font-bold text-yellow-600">{teamMembers.filter(m => m.status === 'pending').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Volunteers</p>
                <p className="text-2xl font-bold">{teamMembers.filter(m => m.joinAs === 'volunteer').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Team</p>
                <p className="text-2xl font-bold">{teamMembers.filter(m => m.joinAs === 'team').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Members Grid */}
      {filteredMembers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <Card key={member._id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      {member.photo ? (
                        <Image
                          src={member.photo}
                          alt={member.fullName}
                          width={48}
                          height={48}
                          className="rounded-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            const nextElement = e.currentTarget.nextElementSibling as HTMLElement
                            if (nextElement) {
                              nextElement.style.display = 'flex'
                            }
                          }}
                        />
                      ) : null}
                      <div 
                        className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center"
                        style={{ display: member.photo ? 'none' : 'flex' }}
                      >
                        <Users className="h-6 w-6 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{member.fullName}</h3>
                      <p className="text-sm text-gray-600">{member.profession}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Badge className={getStatusColor(member.status)}>
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </Badge>
                 
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {/* Contact Info */}
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      <span className="truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{member.phone}</span>
                    </div>
                    {member.instagramLink && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Instagram className="h-4 w-4 mr-2" />
                        <a 
                          href={member.instagramLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Instagram
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Join As */}
                  <div>
                    <Badge className={getJoinAsColor(member.joinAs)}>
                      {formatJoinAs(member.joinAs)}
                    </Badge>
                  </div>

                  {/* Skills */}
                  {member.skills && member.skills.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {member.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {member.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{member.skills.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                </div>

                {/* Actions */}
                <div className="pt-4 mt-4 border-t">
                  {member.status === 'pending' ? (
                    <div className="space-y-3">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm font-medium text-yellow-800">Pending Approval</span>
                        </div>
                        <p className="text-xs text-yellow-700">
                          This member is waiting for approval. Review their information and decide.
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => approveMember(member._id)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white flex-1"
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => rejectMember(member._id)}
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-1"
                        >
                          <XCircle className="h-3 w-3 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <Link href={`/admin/team-members/${member._id}/edit`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleMemberStatus(member._id, member.status)}
                        className="text-blue-600 hover:text-blue-800"
                        title={member.status === 'active' ? 'Deactivate' : 'Activate'}
                      >
                        {member.status === 'active' ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteMember(member._id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <Users className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {searchTerm || joinAsFilter !== 'all' || statusFilter !== 'all' 
              ? 'No team members found' 
              : 'No team members available'
            }
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || joinAsFilter !== 'all' || statusFilter !== 'all'
              ? 'Try adjusting your search or filter criteria.'
              : 'Get started by adding your first team member.'
            }
          </p>
          <div className="mt-6">
            <Link href="/admin/team-members/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Team Member
              </Button>
            </Link>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
