import { PublicLayout } from "@/components/public-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Eye, CheckCircle, TrendingUp, PieChart, DollarSign, Target, Award, Mail, Phone, MapPin } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trust & Transparency - Global Education and Charitable Trust",
  description: "Learn about GEKCT's commitment to transparency, accountability, and good governance. View our impact metrics and governance structure.",
  keywords: ["transparency", "accountability", "governance", "impact", "charity", "non-profit", "trust"],
  openGraph: {
    title: "Trust & Transparency - Global Education and Charitable Trust",
    description: "Learn about GEKCT's commitment to transparency, accountability, and good governance.",
    type: "website",
  },
}

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
              Building <span className="text-primary">Trust</span> Through
              <span className="text-primary block">Transparency</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
              We believe that transparency and accountability are fundamental to building trust with our supporters 
              and the communities we serve. Every donation and resource is used effectively and ethically.
            </p>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Our Commitment
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6" />
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                We are committed to maintaining the highest standards of transparency in all our operations
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Financial Integrity</h3>
                  <p className="text-muted-foreground">
                    Every rupee is accounted for with detailed financial statements and regular audits
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Eye className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Open Reporting</h3>
                  <p className="text-muted-foreground">
                    Regular progress reports and impact measurements available to all stakeholders
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Accountability</h3>
                  <p className="text-muted-foreground">
                    Clear policies, procedures, and governance structures ensure responsible operations
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>


      {/* Governance */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Governance
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-6 w-6 mr-2 text-primary" />
                    Board of Trustees
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Our board consists of experienced professionals committed to our mission and ensuring proper governance.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm">Amit Singh - Founder & Trustee</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm">Sunny Chaudhary - Chairman & Trustee</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm">Vandana Shukla - Trustee</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm">Manthan Kamle - Trustee</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm">Shubham Solanki - Trustee</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-6 w-6 mr-2 text-primary" />
                    Policies & Procedures
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm">Clear operational guidelines</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm">Ethical fundraising practices</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm">Conflict of interest policies</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm">Whistleblower protection</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm">Regular policy reviews</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Measurement */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Impact Measurement
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">500+</h3>
                  <p className="text-muted-foreground">Lives Impacted</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">200+</h3>
                  <p className="text-muted-foreground">Animals Rescued</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">150+</h3>
                  <p className="text-muted-foreground">Children Educated</p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <PieChart className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">1000+</h3>
                  <p className="text-muted-foreground">Trees Planted</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Transparency */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Questions About Transparency?
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6" />
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                For any questions about our transparency practices or to request specific information
              </p>
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center">
                    <Mail className="h-6 w-6 text-primary mr-4" />
                    <div>
                      <h3 className="font-bold">Email</h3>
                      <p className="text-muted-foreground">transparency@gekct.org</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Phone className="h-6 w-6 text-primary mr-4" />
                    <div>
                      <h3 className="font-bold">Phone</h3>
                      <p className="text-muted-foreground">+91 98765 43210</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <MapPin className="h-6 w-6 text-primary mr-4" />
                    <div>
                      <h3 className="font-bold">Address</h3>
                      <p className="text-muted-foreground">
                        207, Dwarkesh Complex, C.G. Road<br />
                        Navrangpura, Ahmedabad, Gujarat 380001
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-primary/10 rounded-lg text-center">
                  <p className="text-lg font-medium italic">
                    "We believe that transparency builds trust, and trust enables us to create greater impact together."
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
