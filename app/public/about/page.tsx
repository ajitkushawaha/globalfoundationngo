import { PublicLayout } from "@/components/public-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Heart, TreePine, GraduationCap, Shield, Target } from "lucide-react"

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
              Empowering Communities Through
              <span className="text-primary"> Education & Care</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
              Global Education and Charitable Trust has been dedicated to creating positive change in communities
              through education, animal welfare, and environmental conservation since our founding.
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
                About Our Mission
              </h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6" />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Dedicated to creating positive change through education, animal welfare, elderly care, and environmental conservation.
              </p>
            </div>

            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-8 md:p-12">
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg leading-relaxed mb-6">
                    Animals play a vital role in our ecosystem, and many suffer from neglect, cruelty, and abandonment. At{" "}
                    <strong>GLOBAL EDUCATION AND CHARITABLE TRUST</strong>, we are committed to rescuing, rehabilitating,
                    and providing shelter for stray and injured animals. Our dedicated team works tirelessly to ensure that
                    every animal receives the medical attention, food, and a safe place to heal. We also run adoption drives
                    to help homeless animals find loving homes. To promote long-term well-being, we conduct awareness
                    programs to help homeless animals find loving homes.
                  </p>

                  <p className="text-lg leading-relaxed mb-6">
                    The Global Education and Charitable Trust, established on February 28, 2024, is a non-governmental
                    organisation registered under the Bombay Public Trust Act of 1950. Based in Gujarat, India, the trust is
                    dedicated to Old Elderly care, Supporting The Elderly, Environment well fare, and Animal Well-beings,
                    particularly in the Ahmedabad district.
                  </p>

                  <div className="bg-primary/10 p-6 rounded-lg mt-8">
                    <p className="text-lg font-medium text-center">
                      &ldquo;We believe that education is essential for social progress and reform. It assures that education is
                      the right of every girl child and has the power to transform individuals, enabling them to shape their
                      own future and contribute positively to society.&rdquo;
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Compassion</h3>
                <p className="text-muted-foreground">
                  We approach every situation with empathy and understanding, treating all beings with dignity and
                  respect.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Integrity</h3>
                <p className="text-muted-foreground">
                  We maintain the highest standards of honesty and transparency in all our operations and relationships.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Impact</h3>
                <p className="text-muted-foreground">
                  We focus on creating measurable, sustainable change that improves lives and communities for
                  generations.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community</h3>
                <p className="text-muted-foreground">
                  We believe in the power of collective action and work collaboratively with communities to drive
                  change.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Education</h3>
                <p className="text-muted-foreground">
                  We view education as the foundation for empowerment and the key to breaking cycles of poverty and
                  inequality.
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
                  We are committed to environmental stewardship and creating solutions that protect our planet&apos;s future.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Dedicated Team</h2>
            <p className="text-lg text-muted-foreground mb-12">
              Our organization is powered by passionate individuals who bring diverse skills, experiences, and
              unwavering commitment to our mission. From field workers to administrators, volunteers to board members,
              every person plays a crucial role in our collective impact.
            </p>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Leadership Team</h3>
                <p className="text-muted-foreground">
                  Experienced professionals guiding our strategic vision and operations.
                </p>
              </div>

              <div>
                <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-12 h-12 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Field Workers</h3>
                <p className="text-muted-foreground">
                  Dedicated individuals working directly with communities and beneficiaries.
                </p>
              </div>

              <div>
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Volunteers</h3>
                <p className="text-muted-foreground">
                  Passionate supporters who contribute their time and skills to our cause.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}