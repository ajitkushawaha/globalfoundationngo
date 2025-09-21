"use client"

import { PublicLayout } from "@/components/public-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Heart, TreePine, GraduationCap, Shield, Target, BookOpen, Laptop, Briefcase, UserCheck, Leaf, Baby, Phone, Mail, MapPin } from "lucide-react"
import Image from "next/image"

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
              <span className="text-primary"> Charitable Trust</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
              A registered non-profit organization committed to transforming lives through education, skills, and social empowerment. 
              Guided by the belief that education is the cornerstone of progress, we work to ensure that every individual—regardless 
              of background, age, or location—has access to opportunities that can change their future.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
                Our Story
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Every Big Change Begins with a Small Spark
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6" />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our journey from humble beginnings to a structured, mission-driven organization.
              </p>
            </div>

            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-8 md:p-12">
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg leading-relaxed mb-6">
                    For Global Education And Charitable Trust, that spark was the realization that so many bright, capable minds 
                    are held back not because of a lack of potential, but because of a lack of opportunity.
                  </p>

                  <p className="text-lg leading-relaxed mb-6">
                    It began as a modest effort volunteers teaching children in underserved neighborhoods, collecting books and 
                    school supplies, and guiding families who had never dreamt their children could attend school. Over time, 
                    these humble beginnings evolved into a structured, mission-driven trust that embraced a bigger vision: to 
                    make education and empowerment accessible to all, without barriers.
                  </p>

                  <p className="text-lg leading-relaxed mb-6">
                    As we reached more communities, our perspective grew. We saw young girls dropping out of school to support 
                    their families, talented youth struggling to find jobs due to lack of skills, and adults yearning to read 
                    and write so they could navigate daily life with confidence. We met elderly citizens living in isolation, 
                    rural families cut off from basic resources, and children unaware of their rights or protection.
                  </p>

                  <p className="text-lg leading-relaxed mb-6">
                    These stories became our motivation. We knew that solving these challenges required more than just classrooms 
                    and textbooks—it required skills, awareness, care, and consistent support. That's why we expanded our focus 
                    from purely education to a holistic approach: combining learning, livelihood skills, health awareness, 
                    digital empowerment, and social welfare.
                  </p>

                  <p className="text-lg leading-relaxed mb-6">
                    Today, Global Education And Charitable Trust stands as a bridge between dreams and reality. We are more than 
                    an organization—we are a growing family of educators, trainers, volunteers, donors, and well wishers who 
                    believe in the power of change when a community comes together.
                  </p>

                  <div className="bg-primary/10 p-6 rounded-lg mt-8">
                    <p className="text-lg font-medium text-center">
                      &ldquo;From the first child who learned to read, to the hundreds of individuals who have completed our 
                      training programs, every success story fuels our passion. We believe that no effort is too small and 
                      no dream is too big when it's supported with dedication and compassion.&rdquo;
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
                What We Do
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Our Activities
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6" />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our activities are designed to address multiple dimensions of human development
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Education for All */}
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <BookOpen className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Education for All</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Early Childhood Education:</strong> Building strong learning foundations for children aged 3–6</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Primary & Secondary Education Support:</strong> Academic aid, tutoring, and resources for students from disadvantaged backgrounds</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Scholarship & Sponsorship Programs:</strong> Financial assistance for meritorious and needy students</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Skills & Employment */}
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Laptop className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Skills & Employment</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Digital Literacy Training:</strong> Helping individuals become confident in using technology for learning, work, and daily life</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Vocational & Skill Development:</strong> Practical training in trades, crafts, and professions to enhance employability</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Career Guidance & Counselling:</strong> Providing career mapping, mentorship, and support for educational and job decisions</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Community Empowerment */}
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <UserCheck className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Community Empowerment</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Adult Literacy Programs:</strong> Teaching basic reading, writing, and numeracy skills to adults</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Awareness & Life Skills Education:</strong> Workshops on health, hygiene, safety, financial literacy, and personal development</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Child Rights & Protection Awareness:</strong> Advocating for children's safety, well-being, and opportunities</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Social Welfare Initiatives */}
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                    <Heart className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Social Welfare Initiatives</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Assistance to elderly citizens, rural communities, and marginalized groups</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Health and hygiene campaigns, nutrition programs, and seasonal welfare activities</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Girl Education */}
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4">
                    <Baby className="w-8 h-8 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Girl Education</h3>
                  <p className="text-muted-foreground">
                    <strong>Empowering Young Minds for a Brighter Future</strong><br/>
                    To provide support for availing various citizenry entitlements, active advocacy for hassle-free procedures 
                    and to help getting access to different government schemes.
                  </p>
                </CardContent>
              </Card>

              {/* Save Nature */}
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                    <Leaf className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Save Nature</h3>
                  <p className="text-muted-foreground">
                    <strong>Restoring and Preserving Our Planet</strong><br/>
                    To provide support for availing various citizenry entitlements, active advocacy for hassle-free procedures 
                    and to help getting access to different government schemes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
                Mission & Vision
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Our Mission and Vision
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="w-8 h-8 text-primary" />
                </div>
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-lg text-muted-foreground">
                    To deliver inclusive, equitable, and quality education while fostering skill development, 
                    social awareness, and community resilience.
                </p>
              </CardContent>
            </Card>

              <Card>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TreePine className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-lg text-muted-foreground">
                    A society where every individual has the knowledge, skills, and resources to lead a life 
                    of dignity, self-reliance, and contribution.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
              Our Values
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Our Core Values
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Integrity</h3>
                <p className="text-muted-foreground">
                  Working with transparency and honesty in every initiative.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Equality</h3>
                <p className="text-muted-foreground">
                  Ensuring no discrimination based on gender, caste, religion, or economic status.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Empowerment</h3>
                <p className="text-muted-foreground">
                  Equipping individuals with tools and opportunities to succeed.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TreePine className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
                <p className="text-muted-foreground">
                  Creating long-term, impactful change rather than temporary relief.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
                Our Team
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Our Dedicated Team
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6" />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our organization is powered by passionate individuals who bring diverse skills, experiences, and
                unwavering commitment to our mission.
              </p>
            </div>

            {/* Board of Trustees */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-center mb-8">Board of Trustees</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-primary/20">
                      <Image
                        src="/placeholder-user.jpg"
                        alt="Amit Singh"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) {
                            fallback.style.display = 'flex';
                          }
                        }}
                      />
                      <div className="w-full h-full bg-primary/10 items-center justify-center" style={{ display: 'none' }}>
                        <Users className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Amit Singh</h4>
                    <p className="text-muted-foreground">Founder & Trustee</p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-primary/20">
                      <Image
                        src="/placeholder-user.jpg"
                        alt="Sunny Chaudhary"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) {
                            fallback.style.display = 'flex';
                          }
                        }}
                      />
                      <div className="w-full h-full bg-primary/10 items-center justify-center" style={{ display: 'none' }}>
                        <Users className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Sunny Chaudhary</h4>
                    <p className="text-muted-foreground">Chairman & Trustee</p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-primary/20">
                      <Image
                        src="/placeholder-user.jpg"
                        alt="Vandana Shukla"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) {
                            fallback.style.display = 'flex';
                          }
                        }}
                      />
                      <div className="w-full h-full bg-primary/10 items-center justify-center" style={{ display: 'none' }}>
                        <Users className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Vandana Shukla</h4>
                    <p className="text-muted-foreground">Trustee</p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-primary/20">
                      <Image
                        src="/placeholder-user.jpg"
                        alt="Manthan Kamle"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) {
                            fallback.style.display = 'flex';
                          }
                        }}
                      />
                      <div className="w-full h-full bg-primary/10 items-center justify-center" style={{ display: 'none' }}>
                        <Users className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold mb-2">Manthan Kamle</h4>
                    <p className="text-muted-foreground">Trustee</p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-primary/20">
                      <Image
                        src="/placeholder-user.jpg"
                        alt="Shubham Solanki"
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) {
                            fallback.style.display = 'flex';
                          }
                        }}
                      />
                      <div className="w-full h-full bg-primary/10 items-center justify-center" style={{ display: 'none' }}>
                        <Users className="w-10 h-10 text-primary" />
                      </div>
                </div>
                    <h4 className="text-lg font-semibold mb-2">Shubham Solanki</h4>
                    <p className="text-muted-foreground">Trustee</p>
                  </CardContent>
                </Card>
              </div>
              </div>

            {/* Team Members */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-center mb-8">Team Members</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "Bharti Rajput", "Sarita Tiwari", "Baby Tiwari", 
                  "Ronak Patel", "Preet Joshi", "Sahil Patel"
                ].map((member, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="p-4">
                      <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-2 border-accent/20">
                        <Image
                          src="/placeholder-user.jpg"
                          alt={member}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <div className="w-full h-full bg-accent/10 items-center justify-center" style={{ display: 'none' }}>
                          <Heart className="w-8 h-8 text-accent" />
                        </div>
                </div>
                      <h4 className="text-base font-semibold">{member}</h4>
                      <p className="text-sm text-muted-foreground">Team Member</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              </div>

            {/* Volunteers */}
              <div>
              <h3 className="text-2xl font-bold text-center mb-8">Our Volunteers</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "Swapnil Patel", "Sameer Shukla", "Raju Yadav", "Rajesh Pachalasa", 
                  "Rajesh Jadia", "Savankumar Patel", "Umang Pandya", "Preet Joshi", 
                  "Jeel Trivedi", "Sarthak Dhandhakiya", "Vikram Chaudhary", 
                  "Ankit Begusarai", "Alkesh Savkare", "Ajay Shikari", 
                  "Vivek Chaudhary", "Abhi Rai", "Vishal Bhai"
                ].map((volunteer, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="p-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3 border-2 border-green-200">
                        <Image
                          src="/placeholder-user.jpg"
                          alt={volunteer}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <div className="w-full h-full bg-green-100 items-center justify-center" style={{ display: 'none' }}>
                          <Shield className="w-8 h-8 text-green-600" />
                        </div>
                </div>
                      <h4 className="text-base font-semibold">{volunteer}</h4>
                      <p className="text-sm text-muted-foreground">Volunteer</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary mb-4">
                Contact Us
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Get In Touch
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6" />
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Address</h3>
                      <p className="text-muted-foreground">
                        207, Dwarkesh Complex, C.G. Road, Navrangpura,<br/>
                        Dist.: Ahmedabad, Gujarat, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-muted-foreground">+91 9898098977</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
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