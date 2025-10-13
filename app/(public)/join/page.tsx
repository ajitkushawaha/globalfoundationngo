import { PublicLayout } from "@/components/public-layout"
import { JoinForm } from "@/components/join-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Join Our Team - Global Education and Charitable Trust",
  description: "Join GEKCT as a volunteer, team member, or board member. Make a difference in education, animal welfare, and community development in Gujarat, India.",
  keywords: ["volunteer", "join", "team member", "charity", "Gujarat", "India", "non-profit", "help", "community service"],
  openGraph: {
    title: "Join Our Team - Global Education and Charitable Trust",
    description: "Join GEKCT as a volunteer, team member, or board member. Make a difference in education, animal welfare, and community development in Gujarat, India.",
    type: "website",
  },
}

export default function JoinPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
              Join Our <span className="text-primary">Mission</span>
            </h1>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
              Be part of something meaningful. Join our team of dedicated volunteers and team members 
              working to create positive change in education, animal welfare, and community development.
            </p>
          </div>
        </div>
      </section>

      {/* Join Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <JoinForm />
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Join GEKCT?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                When you join our team, you become part of a community dedicated to making a real difference.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎓</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Education Impact</h3>
                <p className="text-muted-foreground">
                  Help provide quality education to underprivileged children and create opportunities for their future.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🐾</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Animal Welfare</h3>
                <p className="text-muted-foreground">
                  Contribute to animal rescue, care, and welfare initiatives that save and improve lives.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Community Development</h3>
                <p className="text-muted-foreground">
                  Work on projects that strengthen communities and create sustainable positive change.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌟</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Personal Growth</h3>
                <p className="text-muted-foreground">
                  Develop new skills, gain valuable experience, and grow personally while helping others.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Team Spirit</h3>
                <p className="text-muted-foreground">
                  Join a supportive community of like-minded individuals working towards common goals.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💝</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Make a Difference</h3>
                <p className="text-muted-foreground">
                  See the direct impact of your efforts and know that you're making a real difference in people's lives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
