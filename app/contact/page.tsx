import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, MessageSquare, Users } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Contact Us
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
              Get in Touch with
              <span className="text-primary"> Our Team</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
              We&apos;d love to hear from you. Whether you want to volunteer, donate, or learn more about our work, we&apos;re
              here to help and answer your questions.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Contact Information</h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Our Address</h3>
                    <p className="text-muted-foreground">
                      123 Charity Lane
                      <br />
                      Community District
                      <br />
                      City, State 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone Number</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email Address</h3>
                    <p className="text-muted-foreground">info@globalfoundationngo.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Office Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 9:00 AM - 6:00 PM
                      <br />
                      Saturday: 10:00 AM - 4:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Contact Options */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="font-semibold mb-2">Volunteer Inquiries</h3>
                    <p className="text-sm text-muted-foreground">volunteer@globalfoundationngo.com</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <MessageSquare className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">General Support</h3>
                    <p className="text-sm text-muted-foreground">support@globalfoundationngo.com</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Send us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">How can I volunteer with your organization?</h3>
                  <p className="text-muted-foreground">
                    We welcome volunteers of all backgrounds and skill levels. You can fill out our contact form above,
                    email us at volunteer@globalfoundationngo.com, or visit our office during business hours to learn
                    about current volunteer opportunities.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">What types of donations do you accept?</h3>
                  <p className="text-muted-foreground">
                    We accept monetary donations, educational supplies, food items for our animal care programs, and
                    other specific items based on current needs. Please contact us to learn about our most urgent needs
                    or visit our donation page for more information.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">How do you ensure transparency in your operations?</h3>
                  <p className="text-muted-foreground">
                    We publish annual reports, maintain detailed financial records, and provide regular updates on our
                    programs and impact. All donations are tracked and allocated according to donor preferences and
                    organizational priorities.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Can I visit your facilities?</h3>
                  <p className="text-muted-foreground">
                    Yes! We encourage supporters to visit our facilities. Please contact us in advance to schedule a
                    visit so we can ensure someone is available to show you around and answer your questions about our
                    work.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
