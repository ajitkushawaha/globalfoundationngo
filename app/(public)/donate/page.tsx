import { PublicLayout } from "@/components/public-layout"
import { DonationForm } from "@/components/donation-form"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Users, TreePine, GraduationCap, Target, Gift } from "lucide-react"

export default function DonatePage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Make a Donation
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
              Support Our
              <span className="text-primary"> Mission</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
              Your contribution helps us continue our vital work in education, animal welfare, elderly care, and
              environmental conservation. Every donation makes a real difference in someone&apos;s life.
            </p>
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Make a Secure Donation</h2>
              <p className="text-lg text-muted-foreground">
                Choose an amount and help us make a lasting impact in our community.
              </p>
            </div>
            <DonationForm />
          </div>
        </div>
      </section>

      {/* Donation Categories */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Where Your Donation Goes</h2>
              <p className="text-lg text-muted-foreground">
                Choose a specific cause or make a general donation. All funds are used transparently and efficiently.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Education Fund */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <GraduationCap className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Education Fund</h3>
                  <p className="text-muted-foreground mb-6">
                    Support quality education for underprivileged children, including school supplies, books, and
                    learning materials.
                  </p>
                  <div className="text-sm text-muted-foreground mb-4">
                    <strong>₹2,000</strong> - School supplies for one child
                    <br />
                    <strong>₹4,000</strong> - One month of education
                    <br />
                    <strong>₹20,000</strong> - Full year scholarship
                  </div>
                  <Button className="w-full">Donate to Education</Button>
                </CardContent>
              </Card>

              {/* Animal Welfare Fund */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Heart className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Animal Welfare Fund</h3>
                  <p className="text-muted-foreground mb-6">
                    Help us rescue, rehabilitate, and provide medical care for stray and injured animals.
                  </p>
                  <div className="text-sm text-muted-foreground mb-4">
                    <strong>₹1,000</strong> - Medical treatment for one animal
                    <br />
                    <strong>₹3,000</strong> - One month of food and care
                    <br />
                    <strong>₹15,000</strong> - Complete rescue operation
                  </div>
                  <Button className="w-full">Donate to Animals</Button>
                </CardContent>
              </Card>

              {/* Elderly Care Fund */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Elderly Care Fund</h3>
                  <p className="text-muted-foreground mb-6">
                    Support our elderly care programs, providing healthcare, companionship, and essential services.
                  </p>
                  <div className="text-sm text-muted-foreground mb-4">
                    <strong>₹1,500</strong> - One month of healthcare
                    <br />
                    <strong>₹5,000</strong> - Essential supplies
                    <br />
                    <strong>₹25,000</strong> - Full year support
                  </div>
                  <Button className="w-full">Donate to Elderly</Button>
                </CardContent>
              </Card>

              {/* Environmental Fund */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TreePine className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Environmental Fund</h3>
                  <p className="text-muted-foreground mb-6">
                    Contribute to our environmental conservation efforts, including tree plantation and awareness programs.
                  </p>
                  <div className="text-sm text-muted-foreground mb-4">
                    <strong>₹500</strong> - Plant one tree
                    <br />
                    <strong>₹2,000</strong> - One month of maintenance
                    <br />
                    <strong>₹10,000</strong> - Community garden
                  </div>
                  <Button className="w-full">Donate to Environment</Button>
                </CardContent>
              </Card>

              {/* General Fund */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Target className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">General Fund</h3>
                  <p className="text-muted-foreground mb-6">
                    Support our overall operations and allow us to allocate funds where they&apos;re needed most.
                  </p>
                  <div className="text-sm text-muted-foreground mb-4">
                    <strong>₹1,000</strong> - General support
                    <br />
                    <strong>₹5,000</strong> - Monthly operations
                    <br />
                    <strong>₹50,000</strong> - Major initiative
                  </div>
                  <Button className="w-full">General Donation</Button>
                </CardContent>
              </Card>

              {/* Emergency Fund */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Gift className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Emergency Fund</h3>
                  <p className="text-muted-foreground mb-6">
                    Help us respond quickly to emergencies and urgent needs in our community.
                  </p>
                  <div className="text-sm text-muted-foreground mb-4">
                    <strong>₹2,500</strong> - Emergency response
                    <br />
                    <strong>₹10,000</strong> - Crisis support
                    <br />
                    <strong>₹100,000</strong> - Major emergency
                  </div>
                  <Button className="w-full">Emergency Donation</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Impact */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Your Impact in Numbers</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Lives Impacted</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">200+</div>
                <div className="text-muted-foreground">Animals Rescued</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">150+</div>
                <div className="text-muted-foreground">Children Educated</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                <div className="text-muted-foreground">Trees Planted</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}