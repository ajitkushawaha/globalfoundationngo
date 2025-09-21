"use client"

import { PublicLayout } from "@/components/public-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, FileText, Award, CheckCircle, Download, Eye, Calendar, Building2 } from "lucide-react"
import Image from "next/image"

export default function TrustTransparencyPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Trust & Transparency
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
              Building Trust Through
              <span className="text-primary"> Transparency</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
              We believe in complete transparency and accountability. Here are our legal documents, 
              certifications, and financial reports that demonstrate our commitment to ethical practices.
            </p>
          </div>
        </div>
      </section>

      {/* Legal Certifications */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
                Legal Certifications
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Our Legal Foundation
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6" />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Official documents that establish our legal standing and compliance with Indian laws.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Registration Certificate</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Registered under Bombay Public Trust Act, 1950
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      Registration Date: February 28, 2024
                    </div>
                    <div className="flex items-center justify-center text-sm text-muted-foreground">
                      <Building2 className="w-4 h-4 mr-2" />
                      Registration No: [To be added]
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2 justify-center">
                    <button className="flex items-center px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary/90">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                    <button className="flex items-center px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">12A Certificate</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Tax exemption certificate under Section 12A
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      Valid From: [To be added]
                    </div>
                    <div className="flex items-center justify-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      Valid Until: [To be added]
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2 justify-center">
                    <button className="flex items-center px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary/90">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                    <button className="flex items-center px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">80G Certificate</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Donation tax benefits under Section 80G
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      Valid From: [To be added]
                    </div>
                    <div className="flex items-center justify-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      Valid Until: [To be added]
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2 justify-center">
                    <button className="flex items-center px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary/90">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                    <button className="flex items-center px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">FCRA Registration</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Foreign Contribution Regulation Act registration
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      Registration Date: [To be added]
                    </div>
                    <div className="flex items-center justify-center text-sm text-muted-foreground">
                      <Building2 className="w-4 h-4 mr-2" />
                      FCRA No: [To be added]
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2 justify-center">
                    <button className="flex items-center px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary/90">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                    <button className="flex items-center px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Audit Reports</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Annual financial audit reports
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      Latest Report: [To be added]
                    </div>
                    <div className="flex items-center justify-center text-sm text-muted-foreground">
                      <FileText className="w-4 h-4 mr-2" />
                      Auditor: [To be added]
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2 justify-center">
                    <button className="flex items-center px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary/90">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                    <button className="flex items-center px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </button>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Quality Certifications</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    ISO and other quality certifications
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      Valid From: [To be added]
                    </div>
                    <div className="flex items-center justify-center text-sm text-muted-foreground">
                      <Award className="w-4 h-4 mr-2" />
                      Certification: [To be added]
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2 justify-center">
                    <button className="flex items-center px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary/90">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                    <button className="flex items-center px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Transparency */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
                Financial Transparency
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Our Financial Reports
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6" />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Complete transparency in how we use your donations and funds.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <FileText className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Annual Reports</h3>
                      <p className="text-muted-foreground">Comprehensive yearly financial reports</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm font-medium">2024 Annual Report</span>
                      <span className="text-xs text-muted-foreground">Coming Soon</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm font-medium">2023 Annual Report</span>
                      <span className="text-xs text-muted-foreground">Coming Soon</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
                    <Download className="w-4 h-4 mr-2" />
                    Download Reports
                  </button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <Shield className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">Impact Reports</h3>
                      <p className="text-muted-foreground">How your donations make a difference</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm font-medium">Q4 2024 Impact Report</span>
                      <span className="text-xs text-muted-foreground">Coming Soon</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm font-medium">Q3 2024 Impact Report</span>
                      <span className="text-xs text-muted-foreground">Coming Soon</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    <Eye className="w-4 h-4 mr-2" />
                    View Impact Reports
                  </button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
                Awards & Recognition
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Our Achievements
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6" />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Recognition and awards that validate our commitment to social impact.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Excellence in Education</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Award for outstanding contribution to education
                  </p>
                  <div className="text-xs text-muted-foreground">
                    <div className="flex items-center justify-center mb-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      2024
                    </div>
                    <div>Gujarat State NGO Awards</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Community Impact</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Recognition for community development initiatives
                  </p>
                  <div className="text-xs text-muted-foreground">
                    <div className="flex items-center justify-center mb-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      2023
                    </div>
                    <div>Ahmedabad District Awards</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Transparency Award</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Award for financial transparency and accountability
                  </p>
                  <div className="text-xs text-muted-foreground">
                    <div className="flex items-center justify-center mb-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      2023
                    </div>
                    <div>NGO Excellence Awards</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Documents */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Card>
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Need Specific Documents?</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  If you need any specific legal documents, certificates, or reports that are not listed above, 
                  please contact us and we'll be happy to provide them.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90">
                    Contact Us
                  </button>
                  <button className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50">
                    Request Documents
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
