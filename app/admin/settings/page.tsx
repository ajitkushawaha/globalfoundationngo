'use client'

import { AdminLayout } from '@/components/admin-layout'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Checkbox } from '@/components/ui/checkbox'
import { Mail, Settings, TestTube, Save, AlertCircle, CheckCircle } from 'lucide-react'

interface EmailSettings {
  _id?: string
  smtpHost: string
  smtpPort: number
  smtpSecure: boolean
  smtpUser: string
  smtpPassword: string
  fromEmail: string
  fromName: string
  adminNotificationEmails: string[]
  enableDonationNotifications: boolean
  enableApprovalNotifications: boolean
  donationReceivedSubject: string
  donationApprovedSubject: string
  donationRejectedSubject: string
  adminNotificationSubject: string
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<EmailSettings>({
    smtpHost: '',
    smtpPort: 587,
    smtpSecure: false,
    smtpUser: '',
    smtpPassword: '',
    fromEmail: '',
    fromName: 'GEKCT Foundation',
    adminNotificationEmails: [],
    enableDonationNotifications: true,
    enableApprovalNotifications: true,
    donationReceivedSubject: '🎉 Donation Received - Thank You for Your Support!',
    donationApprovedSubject: '🎉 Donation Received - Thank You for Your Support!',
    donationRejectedSubject: 'Important Update: Your Donation Request',
    adminNotificationSubject: '🔔 New Donation Received - Action Required'
  })
  
  const [loading, setLoading] = useState(false)
  const [testing, setTesting] = useState(false)
  const [testEmail, setTestEmail] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [newAdminEmail, setNewAdminEmail] = useState('')

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email)
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/email-settings')
      const data = await response.json()
      
      if (data.success && data.settings) {
        setSettings(data.settings)
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    }
  }

  const handleSave = async () => {
    setLoading(true)
    setMessage(null)
    
    try {
      const response = await fetch('/api/email-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...settings,
          createdBy: 'admin' // You might want to get this from auth context
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setMessage({ type: 'success', text: 'Email settings saved successfully!' })
        setSettings(data.settings)
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to save settings' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save settings' })
    } finally {
      setLoading(false)
    }
  }

  const handleTestEmail = async () => {
    if (!testEmail) {
      setMessage({ type: 'error', text: 'Please enter a test email address' })
      return
    }
    
    setTesting(true)
    setMessage(null)
    
    try {
      const response = await fetch('/api/test-email-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testEmail })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setMessage({ type: 'success', text: 'Test email sent successfully! Check your inbox.' })
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to send test email' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to send test email' })
    } finally {
      setTesting(false)
    }
  }

  const addAdminEmail = () => {
    if (newAdminEmail && !settings.adminNotificationEmails.includes(newAdminEmail)) {
      setSettings({
        ...settings,
        adminNotificationEmails: [...settings.adminNotificationEmails, newAdminEmail]
      })
      setNewAdminEmail('')
    }
  }

  const removeAdminEmail = (email: string) => {
    setSettings({
      ...settings,
      adminNotificationEmails: settings.adminNotificationEmails.filter(e => e !== email)
    })
  }

  return (
    <AdminLayout title="Settings" subtitle="Email Configuration">
      <div className="space-y-6">
        {message && (
          <div className={`p-4 rounded-lg flex items-center space-x-2 ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            <span>{message.text}</span>
          </div>
        )}

        <Tabs defaultValue="smtp" className="space-y-6">
          <TabsList>
            <TabsTrigger value="smtp">SMTP Configuration</TabsTrigger>
            <TabsTrigger value="templates">Email Templates</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="test">Test Email</TabsTrigger>
          </TabsList>

          <TabsContent value="smtp" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                SMTP Configuration
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input
                    id="smtpHost"
                    value={settings.smtpHost}
                    onChange={(e) => setSettings({ ...settings, smtpHost: e.target.value })}
                    placeholder="smtp.gmail.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="smtpPort">Port</Label>
                  <Input
                    id="smtpPort"
                    type="number"
                    value={settings.smtpPort}
                    onChange={(e) => setSettings({ ...settings, smtpPort: parseInt(e.target.value) })}
                    placeholder="587"
                  />
                </div>
                
                <div>
                  <Label htmlFor="smtpUser">SMTP Username</Label>
                  <Input
                    id="smtpUser"
                    value={settings.smtpUser}
                    onChange={(e) => setSettings({ ...settings, smtpUser: e.target.value })}
                    placeholder="your-email@gmail.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    onChange={(e) => setSettings({ ...settings, smtpPassword: e.target.value })}
                    placeholder="App Password or SMTP Password"
                  />
                </div>
                
                <div>
                  <Label htmlFor="fromEmail">From Email</Label>
                  <Input
                    id="fromEmail"
                    value={settings.fromEmail}
                    onChange={(e) => setSettings({ ...settings, fromEmail: e.target.value })}
                    placeholder="noreply@gekct.org"
                  />
                </div>
                
                <div>
                  <Label htmlFor="fromName">From Name</Label>
                  <Input
                    id="fromName"
                    value={settings.fromName}
                    onChange={(e) => setSettings({ ...settings, fromName: e.target.value })}
                    placeholder="GEKCT Foundation"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="smtpSecure"
                    checked={settings.smtpSecure}
                    onCheckedChange={(checked) => setSettings({ ...settings, smtpSecure: !!checked })}
                  />
                  <Label htmlFor="smtpSecure">Use SSL/TLS (usually for port 465)</Label>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Email Subject Templates</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="donationReceivedSubject">Donation Received Subject</Label>
                  <Input
                    id="donationReceivedSubject"
                    value={settings.donationReceivedSubject}
                    onChange={(e) => setSettings({ ...settings, donationReceivedSubject: e.target.value })}
                    placeholder="🎉 Donation Received - Thank You for Your Support!"
                  />
                </div>
                
                <div>
                  <Label htmlFor="donationApprovedSubject">Donation Approved Subject</Label>
                  <Input
                    id="donationApprovedSubject"
                    value={settings.donationApprovedSubject}
                    onChange={(e) => setSettings({ ...settings, donationApprovedSubject: e.target.value })}
                    placeholder="🎉 Donation Received - Thank You for Your Support!"
                  />
                </div>
                
                <div>
                  <Label htmlFor="donationRejectedSubject">Donation Rejected Subject</Label>
                  <Input
                    id="donationRejectedSubject"
                    value={settings.donationRejectedSubject}
                    onChange={(e) => setSettings({ ...settings, donationRejectedSubject: e.target.value })}
                    placeholder="Important Update: Your Donation Request"
                  />
                </div>
                
                <div>
                  <Label htmlFor="adminNotificationSubject">Admin Notification Subject</Label>
                  <Input
                    id="adminNotificationSubject"
                    value={settings.adminNotificationSubject}
                    onChange={(e) => setSettings({ ...settings, adminNotificationSubject: e.target.value })}
                    placeholder="🔔 New Donation Received - Action Required"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Team Notification Settings</h3>
              
              <div className="space-y-6">
                {/* Notification Toggle */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-3">Notification Controls</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="enableDonationNotifications"
                        checked={settings.enableDonationNotifications}
                        onCheckedChange={(checked) => setSettings({ ...settings, enableDonationNotifications: !!checked })}
                      />
                      <Label htmlFor="enableDonationNotifications" className="text-blue-800">
                        Send email notifications when new donations are received
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="enableApprovalNotifications"
                        checked={settings.enableApprovalNotifications}
                        onCheckedChange={(checked) => setSettings({ ...settings, enableApprovalNotifications: !!checked })}
                      />
                      <Label htmlFor="enableApprovalNotifications" className="text-blue-800">
                        Send email notifications when donations are approved/rejected
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Team Members Management */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Team Members for Notifications</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Add team members who should receive email notifications when donations are made. 
                    These emails will include donor details and donation information.
                  </p>
                  
                  <div className="space-y-3">
                    {/* Current Team Members */}
                    {settings.adminNotificationEmails.length > 0 ? (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Current Team Members:</Label>
                        {settings.adminNotificationEmails.map((email, index) => (
                          <div key={index} className="flex items-center justify-between bg-white p-3 rounded border">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 font-medium text-sm">
                                  {email.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <div>
                                <span className="text-sm font-medium">{email}</span>
                                <p className="text-xs text-gray-500">Will receive donation notifications</p>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => removeAdminEmail(email)}
                              className="text-red-600 hover:text-red-700"
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        <p className="text-sm">No team members added yet</p>
                        <p className="text-xs">Add team members below to start receiving notifications</p>
                      </div>
                    )}

                    {/* Add New Team Member */}
                    <div className="border-t pt-4">
                      <Label className="text-sm font-medium mb-2 block">Add New Team Member:</Label>
                      <div className="flex space-x-2">
                        <Input
                          value={newAdminEmail}
                          onChange={(e) => setNewAdminEmail(e.target.value)}
                          placeholder="team.member@gekct.org"
                          type="email"
                          className="flex-1"
                        />
                        <Button 
                          onClick={addAdminEmail} 
                          disabled={!newAdminEmail || !isValidEmail(newAdminEmail)}
                          className="px-6"
                        >
                          Add Member
                        </Button>
                      </div>
                      {newAdminEmail && !isValidEmail(newAdminEmail) && (
                        <p className="text-xs text-red-500 mt-1">Please enter a valid email address</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Notification Preview */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Notification Preview</h4>
                  <p className="text-sm text-green-800">
                    When a donation is received, team members will get an email with:
                  </p>
                  <ul className="text-sm text-green-700 mt-2 list-disc list-inside space-y-1">
                    <li>Donor name and contact information</li>
                    <li>Donation amount and items</li>
                    <li>Donation reference number</li>
                    <li>Direct link to admin panel for review</li>
                    <li>Bank verification reminder</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="test" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <TestTube className="h-5 w-5 mr-2" />
                Test Email Configuration
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="testEmail">Test Email Address</Label>
                  <Input
                    id="testEmail"
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="test@example.com"
                  />
                </div>
                
                <Button 
                  onClick={handleTestEmail} 
                  disabled={testing || !testEmail}
                  className="w-full"
                >
                  {testing ? 'Sending Test Email...' : 'Send Test Email'}
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={loading} className="flex items-center">
            <Save className="h-4 w-4 mr-2" />
            {loading ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </div>
    </AdminLayout>
  )
}