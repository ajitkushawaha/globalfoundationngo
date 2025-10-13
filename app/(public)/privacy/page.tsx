import { PublicLayout } from "@/components/public-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, Database, Users, FileText, AlertTriangle, CheckCircle, XCircle, Globe } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - Global Education and Charitable Trust",
  description: "Learn how GEKCT protects your personal information and respects your privacy. Our comprehensive privacy policy explains our data practices.",
  keywords: ["privacy", "policy", "data protection", "security", "GEKCT", "personal information"],
  openGraph: {
    title: "Privacy Policy - Global Education and Charitable Trust",
    description: "Learn how GEKCT protects your personal information and respects your privacy. Our comprehensive privacy policy explains our data practices.",
    type: "website",
  },
}

export default function PrivacyPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
              Privacy <span className="text-primary">Policy</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your personal information.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Introduction */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-6 w-6 mr-2 text-primary" />
                  Our Commitment to Your Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Global Education and Charitable Trust (GEKCT) is committed to protecting your privacy 
                  and personal information. This Privacy Policy explains how we collect, use, disclose, 
                  and safeguard your information when you visit our website or join our organization.
                </p>
                <p>
                  We respect your privacy rights and are transparent about our data practices. By using 
                  our services, you consent to the data practices described in this policy.
                </p>
              </CardContent>
            </Card>

            {/* Data Security Promise */}
            <Card className="border-2 border-green-200 bg-green-50/50">
              <CardHeader>
                <CardTitle className="flex items-center text-green-800">
                  <Lock className="h-6 w-6 mr-2" />
                  Your Data is Safe With Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-800 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      Security Measures
                    </h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Industry-standard SSL encryption</li>
                      <li>• Secure server infrastructure</li>
                      <li>• Regular security audits</li>
                      <li>• Access controls and monitoring</li>
                      <li>• Data backup and recovery systems</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-800 flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-green-600" />
                      Privacy Protections
                    </h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• No data selling or sharing</li>
                      <li>• Minimal data collection</li>
                      <li>• User consent for all uses</li>
                      <li>• Right to data deletion</li>
                      <li>• Transparent data practices</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-6 w-6 mr-2 text-primary" />
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
                  <p className="mb-3">We collect the following types of personal information:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Contact Information:</strong> Name, email address, phone number, address</li>
                    <li><strong>Professional Information:</strong> Skills, profession, availability, experience</li>
                    <li><strong>Emergency Contact:</strong> Emergency contact name, phone, relationship</li>
                    <li><strong>Demographics:</strong> Age, location (for program planning)</li>
                    <li><strong>Media:</strong> Photographs (with your explicit consent)</li>
                    <li><strong>Social Media:</strong> Instagram links (if voluntarily provided)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Usage Information</h3>
                  <p className="mb-3">We automatically collect certain information when you use our website:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>IP address and browser information</li>
                    <li>Pages visited and time spent on our site</li>
                    <li>Device type and operating system</li>
                    <li>Referring website (if applicable)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="h-6 w-6 mr-2 text-primary" />
                  How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Primary Uses</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>To process your volunteer or membership application</li>
                    <li>To communicate with you about our programs and activities</li>
                    <li>To match you with appropriate volunteer opportunities</li>
                    <li>To maintain records of your participation and contributions</li>
                    <li>To ensure safety and security of our programs</li>
                    <li>To comply with legal and regulatory requirements</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">With Your Consent</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>To feature you in team spotlights and success stories</li>
                    <li>To use your photos in promotional materials</li>
                    <li>To share your testimonials and experiences</li>
                    <li>To include you in event photos and videos</li>
                    <li>To contact you for fundraising or awareness campaigns</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Important: Your Choice Matters
                  </h4>
                  <p className="text-sm text-blue-700">
                    We will only use your information for promotional purposes with your explicit consent. 
                    You can change your preferences at any time by contacting us.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Data Sharing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-6 w-6 mr-2 text-primary" />
                  Information Sharing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                    <XCircle className="h-4 w-4 mr-2" />
                    We Do NOT Sell Your Data
                  </h4>
                  <p className="text-sm text-red-700">
                    We never sell, rent, or trade your personal information to third parties for commercial purposes.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Limited Sharing</h3>
                  <p className="mb-3">We may share your information only in these limited circumstances:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>With Your Consent:</strong> When you explicitly agree to share your information</li>
                    <li><strong>Legal Requirements:</strong> When required by law or legal process</li>
                    <li><strong>Safety Concerns:</strong> To protect the safety of individuals or the public</li>
                    <li><strong>Service Providers:</strong> With trusted partners who help us operate our services (under strict confidentiality agreements)</li>
                    <li><strong>Emergency Situations:</strong> With emergency contacts in case of emergency</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="h-6 w-6 mr-2 text-primary" />
                  Data Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  We implement appropriate technical and organizational measures to protect your personal 
                  information against unauthorized access, alteration, disclosure, or destruction.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Technical Safeguards</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>SSL/TLS encryption for data transmission</li>
                      <li>Encrypted data storage</li>
                      <li>Regular security updates and patches</li>
                      <li>Firewall and intrusion detection systems</li>
                      <li>Secure authentication protocols</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Administrative Safeguards</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Access controls and user authentication</li>
                      <li>Regular staff training on data protection</li>
                      <li>Data handling policies and procedures</li>
                      <li>Incident response and breach notification</li>
                      <li>Regular security audits and assessments</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-6 w-6 mr-2 text-primary" />
                  Your Privacy Rights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  You have certain rights regarding your personal information. We respect these rights 
                  and will help you exercise them.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Access and Control</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Request access to your personal data</li>
                      <li>Request correction of inaccurate data</li>
                      <li>Request deletion of your data</li>
                      <li>Withdraw consent for data processing</li>
                      <li>Request data portability</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Communication Preferences</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Opt out of promotional communications</li>
                      <li>Change social media usage preferences</li>
                      <li>Update contact information</li>
                      <li>Request data processing restrictions</li>
                      <li>File complaints about data handling</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">
                    How to Exercise Your Rights
                  </h4>
                  <p className="text-sm text-green-700">
                    To exercise any of these rights, contact us at info@gekct.org. We will respond 
                    to your request within 30 days and may require verification of your identity.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Cookies and Tracking */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-6 w-6 mr-2 text-primary" />
                  Cookies and Tracking
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  We use cookies and similar technologies to improve your experience on our website. 
                  Cookies are small text files stored on your device that help us remember your preferences.
                </p>
                
                <div>
                  <h4 className="font-semibold mb-3">Types of Cookies We Use</h4>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Essential Cookies:</strong> Required for website functionality</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand website usage (anonymized)</li>
                    <li><strong>Preference Cookies:</strong> Remember your settings and choices</li>
                  </ul>
                </div>

                <p>
                  You can control cookie settings through your browser preferences. However, disabling 
                  certain cookies may affect website functionality.
                </p>
              </CardContent>
            </Card>

            {/* Data Retention */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-6 w-6 mr-2 text-primary" />
                  Data Retention
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  We retain your personal information only as long as necessary to fulfill the purposes 
                  outlined in this privacy policy, unless a longer retention period is required by law.
                </p>
                
                <div>
                  <h4 className="font-semibold mb-3">Retention Periods</h4>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Active Members/Volunteers:</strong> Duration of participation + 2 years</li>
                    <li><strong>Inactive Accounts:</strong> 3 years after last activity</li>
                    <li><strong>Financial Records:</strong> 7 years (as required by law)</li>
                    <li><strong>Marketing Communications:</strong> Until you opt out</li>
                    <li><strong>Legal Requirements:</strong> As required by applicable law</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Children's Privacy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-6 w-6 mr-2 text-primary" />
                  Children's Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Our services are not directed to children under 16 years of age. We do not knowingly 
                  collect personal information from children under 16. If you are under 16, please do 
                  not provide any personal information to us.
                </p>
                <p>
                  If we learn that we have collected personal information from a child under 16, we will 
                  delete that information immediately. If you believe we have collected information from 
                  a child under 16, please contact us immediately.
                </p>
              </CardContent>
            </Card>

            {/* International Transfers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-6 w-6 mr-2 text-primary" />
                  International Data Transfers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Your personal information may be transferred to and processed in countries other than 
                  your country of residence. We ensure that such transfers comply with applicable data 
                  protection laws and implement appropriate safeguards.
                </p>
                <p>
                  By using our services, you consent to the transfer of your information to countries 
                  that may have different data protection laws than your country of residence.
                </p>
              </CardContent>
            </Card>

            {/* Changes to Privacy Policy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-6 w-6 mr-2 text-primary" />
                  Changes to This Privacy Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices 
                  or applicable laws. We will notify you of any material changes by:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Posting the updated policy on our website</li>
                  <li>Sending you an email notification</li>
                  <li>Informing you during your next interaction with us</li>
                </ul>
                <p>
                  We encourage you to review this Privacy Policy periodically to stay informed about 
                  how we protect your information.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-6 w-6 mr-2 text-primary" />
                  Contact Us About Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our 
                  data practices, please contact us:
                </p>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p><strong>Email:</strong> privacy@gekct.org</p>
                  <p><strong>General Contact:</strong> info@gekct.org</p>
                  <p><strong>Phone:</strong> +91 98765 43210</p>
                  <p><strong>Address:</strong> [Your Organization Address]</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  We will respond to your privacy-related inquiries within 30 days.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
