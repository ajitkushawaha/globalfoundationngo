import { PublicLayout } from "@/components/public-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, Database, Users, FileText, AlertTriangle } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms and Conditions - Global Education and Charitable Trust",
  description: "Read our terms and conditions to understand your rights and responsibilities when using GEKCT services and joining our organization.",
  keywords: ["terms", "conditions", "legal", "agreement", "GEKCT", "charity", "volunteer"],
  openGraph: {
    title: "Terms and Conditions - Global Education and Charitable Trust",
    description: "Read our terms and conditions to understand your rights and responsibilities when using GEKCT services and joining our organization.",
    type: "website",
  },
}

export default function TermsPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
              Terms & <span className="text-primary">Conditions</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
              Please read these terms carefully before using our services or joining our organization.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Introduction */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-6 w-6 mr-2 text-primary" />
                  Introduction
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Welcome to Global Education and Charitable Trust (GEKCT). These Terms and Conditions 
                  ("Terms") govern your use of our website, services, and participation in our organization.
                </p>
                <p>
                  By accessing our website, joining as a volunteer or team member, or using our services, 
                  you agree to be bound by these Terms. If you do not agree to these Terms, please do not 
                  use our services.
                </p>
              </CardContent>
            </Card>

            {/* Organization Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-6 w-6 mr-2 text-primary" />
                  About Our Organization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Global Education and Charitable Trust (GEKCT) is a registered non-profit organization 
                  dedicated to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Providing quality education to underprivileged children</li>
                  <li>Animal welfare and rescue initiatives</li>
                  <li>Community development programs</li>
                  <li>Environmental conservation efforts</li>
                </ul>
                <p>
                  Our organization operates with transparency, integrity, and a commitment to making a 
                  positive impact in our communities.
                </p>
              </CardContent>
            </Card>

            {/* Membership and Volunteering */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-6 w-6 mr-2 text-primary" />
                  Membership and Volunteering
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-lg font-semibold">Volunteer and Team Member Responsibilities</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Act in accordance with our mission and values</li>
                  <li>Maintain confidentiality of sensitive information</li>
                  <li>Follow all safety guidelines and protocols</li>
                  <li>Respect fellow volunteers, team members, and beneficiaries</li>
                  <li>Attend scheduled meetings and activities when possible</li>
                  <li>Report any concerns or issues to appropriate personnel</li>
                </ul>

                <h3 className="text-lg font-semibold mt-6">Code of Conduct</h3>
                <p>
                  All members and volunteers must adhere to our Code of Conduct, which includes:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Treating everyone with respect and dignity</li>
                  <li>Maintaining professional boundaries</li>
                  <li>Not engaging in discriminatory behavior</li>
                  <li>Protecting the privacy and safety of beneficiaries</li>
                  <li>Using organization resources responsibly</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Protection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="h-6 w-6 mr-2 text-primary" />
                  Data Protection and Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  We are committed to protecting your personal information. Our data collection and 
                  processing practices are governed by our Privacy Policy and applicable data protection laws.
                </p>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    Your Data is Safe With Us
                  </h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• We use industry-standard encryption to protect your data</li>
                    <li>• Your information is stored securely on protected servers</li>
                    <li>• We never sell or share your personal data with third parties</li>
                    <li>• You have the right to access, update, or delete your information</li>
                    <li>• We only collect data necessary for our charitable activities</li>
                  </ul>
                </div>

                <h3 className="text-lg font-semibold mt-6">Information We Collect</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Personal identification information (name, email, phone)</li>
                  <li>Professional information (skills, availability, experience)</li>
                  <li>Emergency contact information</li>
                  <li>Photographs (with your explicit consent)</li>
                  <li>Social media links (if provided voluntarily)</li>
                </ul>
              </CardContent>
            </Card>

            {/* Social Media Usage */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="h-6 w-6 mr-2 text-primary" />
                  Social Media and Publicity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  We may use your information for promotional and awareness purposes, but only with your 
                  explicit consent. This includes:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Team member spotlights on our website and social media</li>
                  <li>Event photos and videos (with your permission)</li>
                  <li>Success stories and testimonials</li>
                  <li>Recruitment and awareness campaigns</li>
                </ul>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Your Choice Matters
                  </h4>
                  <p className="text-sm text-blue-700">
                    You can choose to keep your information private or allow us to use it for social media 
                    and promotional purposes. This choice is entirely yours and can be changed at any time.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Intellectual Property */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-6 w-6 mr-2 text-primary" />
                  Intellectual Property
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  All content on our website, including text, graphics, logos, and images, is the property 
                  of GEKCT or our content suppliers and is protected by copyright laws.
                </p>
                <p>
                  When you share content with us (photos, videos, written materials), you grant us a 
                  non-exclusive license to use that content for our charitable purposes, subject to your 
                  privacy preferences.
                </p>
              </CardContent>
            </Card>

            {/* Limitation of Liability */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-6 w-6 mr-2 text-primary" />
                  Limitation of Liability
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  GEKCT shall not be liable for any direct, indirect, incidental, or consequential damages 
                  arising from your use of our services or participation in our activities.
                </p>
                <p>
                  We provide our services on an "as is" basis and make no warranties about the accuracy, 
                  reliability, or availability of our services.
                </p>
              </CardContent>
            </Card>

            {/* Termination */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-6 w-6 mr-2 text-primary" />
                  Termination
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Either party may terminate the volunteer or membership relationship at any time with 
                  reasonable notice. Upon termination:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Your access to internal systems will be revoked</li>
                  <li>We will stop using your information for promotional purposes</li>
                  <li>You may request deletion of your personal data</li>
                  <li>Any confidential information must be returned or destroyed</li>
                </ul>
              </CardContent>
            </Card>

            {/* Changes to Terms */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-6 w-6 mr-2 text-primary" />
                  Changes to These Terms
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  We reserve the right to modify these Terms at any time. We will notify you of any 
                  significant changes via email or through our website.
                </p>
                <p>
                  Your continued use of our services after changes are posted constitutes acceptance of 
                  the new Terms.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-6 w-6 mr-2 text-primary" />
                  Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  If you have any questions about these Terms and Conditions, please contact us:
                </p>
                <div className="bg-muted/50 rounded-lg p-4">
                  <p><strong>Email:</strong> info@gekct.org</p>
                  <p><strong>Phone:</strong> +91 98765 43210</p>
                  <p><strong>Address:</strong> [Your Organization Address]</p>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
