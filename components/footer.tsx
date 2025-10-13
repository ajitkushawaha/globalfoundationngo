import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer id="contact" className="bg-foreground text-background p-4">
      <div className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <Heart className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-bold">GEKCT</h3>
                <p className="text-sm text-background/70">Global Education & Charitable Trust</p>
              </div>
            </div>
            <p className="text-background/80 leading-relaxed mb-6 max-w-md">
              Dedicated to creating positive change through education, animal welfare, elderly care, and environmental
              conservation. Join us in building a better tomorrow.
            </p>
            <div className="flex space-x-4">
              <Button
                size="icon"
                variant="outline"
                className="border-background/20 hover:bg-background/10 bg-transparent"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="border-background/20 hover:bg-background/10 bg-transparent"
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="border-background/20 hover:bg-background/10 bg-transparent"
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="border-background/20 hover:bg-background/10 bg-transparent"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-background/80 hover:text-background transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#initiatives" className="text-background/80 hover:text-background transition-colors">
                  Our Initiatives
                </a>
              </li>
              <li>
                <a href="#impact" className="text-background/80 hover:text-background transition-colors">
                  Our Impact
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-background transition-colors">
                  Get Involved
                </a>
              </li>
              <li>
                <a href="/join" className="text-background/80 hover:text-background transition-colors">
                  Join Us
                </a>
              </li>
              <li>
                <a href="/terms" className="text-background/80 hover:text-background transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-background/80 hover:text-background transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <div className="text-sm text-background/80">
                  <p>207, Dwarkesh Complex, C.G. Road, Navrangpura,</p>
                  <p>Dist.: Ahmedabad, Gujarat, India</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm text-background/80">+91 9898098977</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm text-background/80">Support@globalfoundationngo.com</span>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="font-semibold mb-2">Stay Updated</h5>
              <div className="flex space-x-2">
                <Input
                  placeholder="Your email"
                  className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
                />
                <Button size="sm" className="shrink-0">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 text-center">
          <p className="text-background/60 text-sm">
            © 2024 Global Education and Charitable Trust. All rights reserved. | Registered under Bombay Public Trust
            Act of 1950
          </p>
        </div>
      </div>
    </footer>
  )
}
