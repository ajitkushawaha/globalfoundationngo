import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DonationForm } from "@/components/donation-form"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Users, TreePine, GraduationCap, Target, Gift } from "lucide-react"

export default function DonatePage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Make a Donation
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
              Your Support Creates
              <span className="text-primary"> Lasting Change</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
              Every donation, no matter the size, helps us continue our mission of education, animal welfare, and
              community development. Join us in making a difference.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">589</div>
              <p className="text-muted-foreground">Children Educated</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">350</div>
              <p className="text-muted-foreground">Animals Rescued</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">300</div>
              <p className="text-muted-foreground">Elderly Cared For</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">240</div>
              <p className="text-muted-foreground">Trees Planted</p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Options */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Ways to Give</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Education Fund</h3>
                <p className="text-muted-foreground mb-4">
                  Support our educational programs and provide learning opportunities for underprivileged children.
                </p>
                <div className="text-sm text-muted-foreground mb-4">
                  <strong>₹2,000</strong> - School supplies for one child
                  <br />
                  <strong>₹4,000</strong> - One month of education
                  <br />
                  <strong>₹20,000</strong> - Full year scholarship
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Donate to Education
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Animal Welfare</h3>
                <p className="text-muted-foreground mb-4">
                  Help us rescue, rehabilitate, and care for abandoned and injured animals.
                </p>
                <div className="text-sm text-muted-foreground mb-4">
                  <strong>₹1,000</strong> - Food for one animal/week
                  <br />
                  <strong>₹3,000</strong> - Medical care for one animal
                  <br />
                  <strong>₹8,000</strong> - Full rescue and rehabilitation
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Donate to Animal Care
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TreePine className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Environmental</h3>
                <p className="text-muted-foreground mb-4">
                  Support our tree planting and environmental conservation initiatives.
                </p>
                <div className="text-sm text-muted-foreground mb-4">
                  <strong>₹400</strong> - Plant one tree
                  <br />
                  <strong>₹2,000</strong> - Environmental education program
                  <br />
                  <strong>₹6,000</strong> - Community garden project
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Donate to Environment
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Elderly Care</h3>
                <p className="text-muted-foreground mb-4">
                  Provide essential care and support services for elderly community members.
                </p>
                <div className="text-sm text-muted-foreground mb-4">
                  <strong>₹1,200</strong> - Meal for one elderly person
                  <br />
                  <strong>₹4,000</strong> - Healthcare support
                  <br />
                  <strong>₹12,000</strong> - Monthly care package
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Donate to Elderly Care
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">General Fund</h3>
                <p className="text-muted-foreground mb-4">
                  Support all our programs and allow us to direct funds where they&apos;re needed most.
                </p>
                <div className="text-sm text-muted-foreground mb-4">
                  Flexible funding that supports
                  <br />
                  all our initiatives and
                  <br />
                  operational needs
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Donate to General Fund
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Monthly Giving</h3>
                <p className="text-muted-foreground mb-4">
                  Become a monthly donor and provide sustained support for our ongoing work.
                </p>
                <div className="text-sm text-muted-foreground mb-4">
                  Recurring donations help us
                  <br />
                  plan long-term projects and
                  <br />
                  maintain consistent impact
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Set Up Monthly Giving
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Make Your Donation</h2>
              <p className="text-lg text-muted-foreground">
                Your secure donation will be processed immediately and you&apos;ll receive a confirmation email.
              </p>
            </div>

            <DonationForm />
          </div>
        </div>
      </section>

      {/* Other Ways to Help */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Other Ways to Help</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Volunteer Your Time</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Join our team of dedicated volunteers and contribute your skills and time.
                  </p>
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Gift className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2">In-Kind Donations</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Donate goods, supplies, or services that support our programs.
                  </p>
                  <Button variant="outline" size="sm">
                    Contact Us
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Corporate Partnership</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Partner with us for corporate social responsibility initiatives.
                  </p>
                  <Button variant="outline" size="sm">
                    Get Started
                  </Button>
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
