import { PublicLayout } from "@/components/public-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Users, Heart } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us - Global Education and Charitable Trust",
  description: "Get in touch with GEKCT. Contact us for donations, volunteer opportunities, or to learn more about our programs in education, animal welfare, and community development.",
  keywords: ["contact", "donate", "volunteer", "charity", "Gujarat", "India", "non-profit", "support"],
  openGraph: {
    title: "Contact Us - Global Education and Charitable Trust",
    description: "Get in touch with GEKCT for donations, volunteer opportunities, or to learn more about our programs.",
    type: "website",
  },
}

export default function ContactPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
              We'd love to hear from you. Whether you want to volunteer, donate, or simply learn more about our work, 
              we're here to help and answer any questions you may have.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Contact Information
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6" />
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Reach out to us through any of these channels
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {/* Office Address */}
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Office Address</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    <strong>Global Education and Charitable Trust</strong><br />
                    207, Dwarkesh Complex, C.G. Road<br />
                    Navrangpura, Dist.: Ahmedabad<br />
                    Gujarat, India
                  </p>
                </CardContent>
              </Card>

              {/* Phone */}
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Phone className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Phone</h3>
                  <p className="text-muted-foreground">
                    <strong>Main Office:</strong><br />
                    +91 9898098977
                  </p>
                  <p className="text-muted-foreground mt-2">
                    <strong>Emergency:</strong><br />
                    +91 98765 43211
                  </p>
                </CardContent>
              </Card>

              {/* Email */}
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">Email</h3>
                  <p className="text-muted-foreground">
                    <strong>General Inquiries:</strong><br />
                    Support@globalfoundationngo.com
                  </p>
                  <p className="text-muted-foreground mt-2">
                    <strong>Emergency:</strong><br />
                    emergency@gekct.org
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Office Hours */}
            <Card className="max-w-2xl mx-auto mb-16">
              <CardHeader>
                <CardTitle className="text-center flex items-center justify-center">
                  <Clock className="h-6 w-6 mr-2 text-primary" />
                  Office Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Monday to Friday</span>
                    <span className="text-muted-foreground">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Saturday</span>
                    <span className="text-muted-foreground">9:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium">Sunday</span>
                    <span className="text-muted-foreground">Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Send Us a Message
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6" />
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Have questions or want to get involved? We'd love to hear from you!
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="h-6 w-6 mr-2 text-primary" />
                    Get in Touch
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" placeholder="Your first name" required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" placeholder="Your last name" required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" placeholder="your.email@example.com" required />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" placeholder="+91 98765 43210" />
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input id="subject" placeholder="What's this about?" required />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us how we can help you..." 
                        rows={6}
                        required 
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Additional Information */}
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-6 w-6 mr-2 text-primary" />
                      Visit Our Center
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      We welcome visitors to our center where you can:
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center">
                        <Heart className="h-4 w-4 mr-2 text-primary" />
                        Learn about our programs
                      </li>
                      <li className="flex items-center">
                        <Heart className="h-4 w-4 mr-2 text-primary" />
                        Meet our team
                      </li>
                      <li className="flex items-center">
                        <Heart className="h-4 w-4 mr-2 text-primary" />
                        See our work in action
                      </li>
                      <li className="flex items-center">
                        <Heart className="h-4 w-4 mr-2 text-primary" />
                        Volunteer your time
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="h-6 w-6 mr-2 text-primary" />
                      Response Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We typically respond to all inquiries within 24 hours. 
                      For urgent matters, please call our emergency number.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Follow Us</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Stay updated with our latest activities:
                    </p>
                    <div className="space-y-2 text-sm">
                      <p><strong>Facebook:</strong> @GEKCTOfficial</p>
                      <p><strong>Twitter:</strong> @GEKCTCharity</p>
                      <p><strong>Instagram:</strong> @gekct_trust</p>
                      <p><strong>LinkedIn:</strong> Global Education and Charitable Trust</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Find Us
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6" />
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Visit our office in Ahmedabad, Gujarat
              </p>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="h-96 bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Our Location</h3>
                    <p className="text-muted-foreground">
                      207, Dwarkesh Complex, C.G. Road<br />
                      Navrangpura, Ahmedabad, Gujarat
                    </p>
                    <Button className="mt-4" variant="outline">
                      <MapPin className="h-4 w-4 mr-2" />
                      Open in Maps
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
