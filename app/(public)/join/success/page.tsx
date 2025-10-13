import { PublicLayout } from "@/components/public-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Mail, Phone, ArrowLeft, Heart } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Application Submitted - Global Education and Charitable Trust",
  description: "Thank you for your interest in joining GEKCT. Your application has been submitted successfully.",
  robots: "noindex, nofollow",
}

export default function JoinSuccessPage() {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-background flex items-center justify-center py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="border-2 border-green-200 bg-green-50/50">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <CardTitle className="text-3xl text-green-800 mb-4">
                  Application Submitted Successfully!
                </CardTitle>
                <p className="text-lg text-green-700">
                  Thank you for your interest in joining our mission at Global Education and Charitable Trust.
                </p>
              </CardHeader>
              
              <CardContent className="space-y-8">
                <div className="text-center space-y-4">
                  <p className="text-muted-foreground">
                    We have received your application and will review it carefully. Our team will get back to you 
                    within 3-5 business days with next steps.
                  </p>
                  
                  <div className="bg-white/50 rounded-lg p-6 space-y-4">
                    <h3 className="font-semibold text-lg">What happens next?</h3>
                    <div className="space-y-3 text-left">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-sm font-semibold text-primary">1</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Our team will review your application and background
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-sm font-semibold text-primary">2</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          We may contact you for additional information or an interview
                        </p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-sm font-semibold text-primary">3</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          You'll receive an email with our decision and next steps
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-4">Need to reach us?</h3>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="mailto:info@gekct.org"
                      className="flex items-center justify-center space-x-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      <span>info@gekct.org</span>
                    </a>
                    <a
                      href="tel:+919876543210"
                      className="flex items-center justify-center space-x-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                      <span>+91 98765 43210</span>
                    </a>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/">
                    <Button variant="outline" className="w-full sm:w-auto">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Home
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button className="w-full sm:w-auto">
                      <Heart className="mr-2 h-4 w-4" />
                      Learn More About Us
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
