import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const donationData = [
  { name: "Education Provided", value: 16.8, color: "#f97316" },
  { name: "Animal Rescue", value: 17.2, color: "#0891b2" },
  { name: "Elderly Care", value: 16.6, color: "#1f2937" },
  { name: "Helping To Vulnerable", value: 19.4, color: "#6b7280" },
  { name: "Plantation", value: 16.0, color: "#ea580c" },
  { name: "Annadanam Bhavan", value: 14.0, color: "#f59e0b" },
]

export function DonationTransparency() {
  return (
    <section className="py-20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
            How We Spend Your Donations
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We understand that when you make a donation, you want to know exactly where your money is going, and we
            pledge to be transparent.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Donation Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <div className="w-64 h-64 relative">
                  {/* Simple pie chart using CSS */}
                  <div className="w-full h-full rounded-full relative overflow-hidden">
                    <div 
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `conic-gradient(
                          #f97316 0deg 60.48deg,
                          #0891b2 60.48deg 122.4deg,
                          #1f2937 122.4deg 182.16deg,
                          #6b7280 182.16deg 251.28deg,
                          #ea580c 251.28deg 308.88deg,
                          #f59e0b 308.88deg 360deg
                        )`
                      }}
                    />
                    <div className="absolute inset-8 bg-background rounded-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">100%</div>
                        <div className="text-sm text-muted-foreground">Transparent</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Transparency in Action
              </h3>
              <p className="text-lg leading-relaxed mb-6">
                Every rupee you donate is carefully allocated to maximize impact across our key initiatives. We maintain
                detailed records and provide regular updates on how your contributions are making a difference.
              </p>
            </div>

            <div className="space-y-4">
              {donationData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold">{item.value}%</span>
                </div>
              ))}
            </div>

            <Button size="lg" className="w-full mt-8">
              Make a Donation Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
