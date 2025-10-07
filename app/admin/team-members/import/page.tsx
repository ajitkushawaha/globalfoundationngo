'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminLayout } from '@/components/admin-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Upload, Download, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'

export default function ImportTeamMembersPage() {
  const router = useRouter()
  const [csvData, setCsvData] = useState('')
  const [isImporting, setIsImporting] = useState(false)
  const [importResults, setImportResults] = useState(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      toast.error('Please select a CSV file')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      setCsvData(content)
      toast.success('CSV file loaded successfully')
    }
    reader.readAsText(file)
  }

  const handleImport = async () => {
    if (!csvData.trim()) {
      toast.error('Please paste CSV data or upload a file')
      return
    }

    setIsImporting(true)
    try {
      const response = await fetch('/api/team-members/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ csvData }),
      })

      const result = await response.json()

      if (result.success) {
        setImportResults(result.data)
        toast.success(`Successfully imported ${result.data.imported} team members`)
      } else {
        toast.error(result.error || 'Failed to import team members')
      }
    } catch (error) {
      console.error('Import error:', error)
      toast.error('Failed to import team members')
    } finally {
      setIsImporting(false)
    }
  }

  const downloadTemplate = () => {
    const template = `Full Name,Email,Phone,Profession,Instagram Link,Join As,Role,Department,Bio,Skills,Availability,Status,City,State,Country,LinkedIn,Twitter,Facebook,Public
John Doe,john@example.com,+91-9876543210,Software Engineer,https://instagram.com/johndoe,team,Developer,Technology,Passionate developer,Web Development;JavaScript,full_time,active,Mumbai,Maharashtra,India,https://linkedin.com/in/johndoe,https://twitter.com/johndoe,,Yes
Jane Smith,jane@example.com,+91-9876543211,Teacher,https://instagram.com/janesmith,volunteer,Education Volunteer,Education,Experienced teacher,Education;Teaching,weekends,active,Delhi,Delhi,India,https://linkedin.com/in/janesmith,,,Yes`

    const blob = new Blob([template], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'team-members-template.csv'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <AdminLayout title="Import Team Members" subtitle="Import team members from CSV data">
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
              <h1 className="text-2xl font-bold">Import Team Members</h1>
              <p className="text-muted-foreground">Import team members from CSV data or Google Sheets</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Import Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                Import Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Method 1: CSV File Upload</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Upload a CSV file exported from Google Sheets
                  </p>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Method 2: Paste CSV Data</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Copy and paste CSV data directly
                  </p>
                  <Textarea
                    placeholder="Paste your CSV data here..."
                    value={csvData}
                    onChange={(e) => setCsvData(e.target.value)}
                    rows={6}
                    className="font-mono text-sm"
                  />
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Method 3: Download Template</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Download a template CSV file to see the required format
                  </p>
                  <Button
                    variant="outline"
                    onClick={downloadTemplate}
                    className="flex items-center"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleImport}
                disabled={!csvData.trim() || isImporting}
                className="w-full"
              >
                {isImporting ? (
                  <>
                    <Upload className="h-4 w-4 mr-2 animate-spin" />
                    Importing...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Import Team Members
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* CSV Format Guide */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                CSV Format Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Required Columns:</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• <strong>Full Name</strong> - Complete name of the person</li>
                    <li>• <strong>Email</strong> - Email address (must be unique)</li>
                    <li>• <strong>Phone</strong> - Phone number</li>
                    <li>• <strong>Profession</strong> - Job title or profession</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Optional Columns:</h3>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• <strong>Instagram Link</strong> - Instagram profile URL</li>
                    <li>• <strong>Join As</strong> - team, volunteer, board_member, advisor</li>
                    <li>• <strong>Role</strong> - Specific role in organization</li>
                    <li>• <strong>Department</strong> - Department or division</li>
                    <li>• <strong>Bio</strong> - Short biography</li>
                    <li>• <strong>Skills</strong> - Comma-separated skills</li>
                    <li>• <strong>Availability</strong> - full_time, part_time, weekends, evenings, flexible</li>
                    <li>• <strong>Status</strong> - active, inactive, pending, suspended</li>
                    <li>• <strong>City, State, Country</strong> - Address information</li>
                    <li>• <strong>LinkedIn, Twitter, Facebook</strong> - Social media links</li>
                    <li>• <strong>Public</strong> - Yes/No for public visibility</li>
                  </ul>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5 mr-2" />
                    <div className="text-sm text-blue-800">
                      <strong>Tip:</strong> Use semicolons (;) to separate multiple skills in the Skills column.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Import Results */}
        {importResults && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                Import Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{importResults.imported}</div>
                  <div className="text-sm text-green-800">Successfully Imported</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{importResults.skipped}</div>
                  <div className="text-sm text-yellow-800">Skipped (Duplicates)</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{importResults.errors}</div>
                  <div className="text-sm text-red-800">Errors</div>
                </div>
              </div>

              {importResults.importedMembers && importResults.importedMembers.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Imported Members:</h3>
                  <div className="space-y-1">
                    {importResults.importedMembers.map((member: any, index: number) => (
                      <div key={index} className="text-sm text-muted-foreground">
                        {index + 1}. {member.fullName} - {member.profession} ({member.joinAs})
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 flex justify-end">
                <Button onClick={() => router.push('/admin/team-members')}>
                  View All Team Members
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
