import { PublicLayout } from "@/components/public-layout"
import { TeamSection } from "@/components/team-section"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Heart, TreePine, GraduationCap, Shield, Target, BookOpen, Laptop, Briefcase, UserCheck, Leaf, Baby, Phone, Mail, MapPin } from "lucide-react"
import Image from "next/image"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us - Global Education and Charitable Trust",
  description: "Learn about GEKCT's mission to transform lives through education, skills, and social empowerment. Meet our team and discover our programs in education, animal welfare, elderly care, and environmental conservation.",
  keywords: ["about", "mission", "team", "education", "charity", "Gujarat", "India", "non-profit"],
  openGraph: {
    title: "About Us - Global Education and Charitable Trust",
    description: "Learn about GEKCT's mission to transform lives through education, skills, and social empowerment.",
    type: "website",
  },
}

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              About Us
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
              Global Education And
              <span className="text-primary block">Charitable Trust</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
              Transforming lives through education, skills, and social empowerment. 
              We believe every individual deserves access to opportunities that can change their future.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Our Story
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6" />
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Every big change begins with a small spark. For Global Education And Charitable Trust, 
                that spark was the realization that so many bright, capable minds are held back not because 
                of a lack of potential, but because of a lack of opportunity.
              </p>
            </div>

            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-8 md:p-12">
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg leading-relaxed mb-6">
                    It began as a modest effort volunteers teaching children in underserved neighborhoods, 
                    collecting books and school supplies, and guiding families who had never dreamt their 
                    children could attend school. Over time, these humble beginnings evolved into a structured, 
                    mission-driven trust that embraced a bigger vision: to make education and empowerment 
                    accessible to all, without barriers.
                  </p>

                  <p className="text-lg leading-relaxed mb-6">
                    As we reached more communities, our perspective grew. We saw young girls dropping out of 
                    school to support their families, talented youth struggling to find jobs due to lack of 
                    skills, and adults yearning to read and write so they could navigate daily life with confidence. 
                    We met elderly citizens living in isolation, rural families cut off from basic resources, 
                    and children unaware of their rights or protection.
                  </p>

                  <p className="text-lg leading-relaxed mb-6">
                    These stories became our motivation. We knew that solving these challenges required more than 
                    just classrooms and textbooks—it required skills, awareness, care, and consistent support. 
                    That's why we expanded our focus from purely education to a holistic approach: combining 
                    learning, livelihood skills, health awareness, digital empowerment, and social welfare.
                  </p>

                  <div className="bg-primary/10 p-6 rounded-lg mt-8">
                    <p className="text-lg font-medium text-center">
                      "Today, Global Education And Charitable Trust stands as a bridge between dreams and reality. 
                      We are more than an organization—we are a growing family of educators, trainers, volunteers, 
                      donors, and well wishers who believe in the power of change when a community comes together."
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Programs Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Our Programs
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6" />
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                We offer comprehensive programs designed to address the diverse needs of our communities
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Education Programs */}
              <Card className="group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mr-4">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold">Education Programs</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Quality education for children, adult literacy programs, and digital learning initiatives
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Primary and secondary education</li>
                    <li>• Adult literacy programs</li>
                    <li>• Digital learning initiatives</li>
                    <li>• Scholarship programs</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Skills Development */}
              <Card className="group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mr-4">
                      <Laptop className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold">Skills Development</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Vocational training and skill development programs for youth and adults
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Computer skills training</li>
                    <li>• Vocational courses</li>
                    <li>• Entrepreneurship programs</li>
                    <li>• Job placement assistance</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Girl Education */}
              <Card className="group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 mr-4">
                      <Baby className="h-6 w-6 text-pink-600" />
                    </div>
                    <h3 className="text-xl font-bold">Girl Education</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Specialized programs to support and empower young girls in their educational journey
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Girl child education support</li>
                    <li>• Mentorship programs</li>
                    <li>• Safety and awareness</li>
                    <li>• Career guidance</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Save Nature */}
              <Card className="group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 mr-4">
                      <TreePine className="h-6 w-6 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold">Save Nature</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Environmental conservation and sustainability initiatives
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Tree plantation drives</li>
                    <li>• Environmental awareness</li>
                    <li>• Waste management</li>
                    <li>• Clean energy initiatives</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Elderly Assistance */}
              <Card className="group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 mr-4">
                      <Users className="h-6 w-6 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold">Elderly Assistance</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Comprehensive care and support for elderly citizens
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Healthcare support</li>
                    <li>• Companionship programs</li>
                    <li>• Essential services</li>
                    <li>• Social activities</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Animal Welfare */}
              <Card className="group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mr-4">
                      <Heart className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold">Animal Welfare</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Rescue, rehabilitation, and care for stray and injured animals
                  </p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Animal rescue operations</li>
                    <li>• Medical treatment</li>
                    <li>• Adoption programs</li>
                    <li>• Awareness campaigns</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Mission and Vision
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mr-4">
                      <Target className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold">Our Mission</h3>
                  </div>
                  <p className="text-lg leading-relaxed">
                    To deliver inclusive, equitable, and quality education while fostering skill development, 
                    social awareness, and community resilience. We believe that education is essential for 
                    social progress and reform, and it assures that education is the right of every girl child 
                    and has the power to transform individuals.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mr-4">
                      <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold">Our Vision</h3>
                  </div>
                  <p className="text-lg leading-relaxed">
                    A society where every individual has the knowledge, skills, and resources to lead a life 
                    of dignity, self-reliance, and contribution. We envision a world where education and 
                    empowerment are accessible to all, without barriers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section - Dynamic */}
      <TeamSection />

      {/* Contact Information */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Contact Information
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6" />
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center">
                    <MapPin className="h-6 w-6 text-primary mr-4" />
                    <div>
                      <h3 className="font-bold">Address</h3>
                      <p className="text-muted-foreground">
                        207, Dwarkesh Complex, C.G. Road, Navrangpura,<br />
                        Dist.: Ahmedabad, Gujarat, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Phone className="h-6 w-6 text-primary mr-4" />
                    <div>
                      <h3 className="font-bold">Phone</h3>
                      <p className="text-muted-foreground">+91 9898098977</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Mail className="h-6 w-6 text-primary mr-4" />
                    <div>
                      <h3 className="font-bold">Email</h3>
                      <p className="text-muted-foreground">Support@globalfoundationngo.com</p>
                    </div>
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
