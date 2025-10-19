"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Heart, Menu, ChevronDown } from "lucide-react"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Gallery", href: "/gallery" },
    { name: "Trust & Transparency", href: "/trust-transparency" },
  ]

  const dropdownItems = [
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Donate", href: "/donate" },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full p-4  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <img src="/gkct.jpg" alt="GEKCT" className="rounded-full" />
            </div>
            <div>
              <h1 className="text-lg font-bold">GECT</h1>
              <p className="text-xs text-muted-foreground">Global Education & Charitable Trust</p>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md hover:bg-primary/5 ${
                isActive(item.href) 
                  ? "text-primary bg-primary/10" 
                  : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Dropdown Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-sm font-semibold transition-colors hover:text-primary px-3 py-2 rounded-md hover:bg-primary/5 text-primary flex items-center gap-1"
            >
              More
              <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                {dropdownItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsDropdownOpen(false)}
                    className={`block px-4 py-2 text-sm transition-colors hover:bg-primary/5 ${
                      isActive(item.href) 
                        ? "text-primary bg-primary/10" 
                        : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/donate">
            <Button className="hidden sm:inline-flex">Donate Now</Button>
          </Link>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden bg-transparent">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                    <Heart className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="font-bold">GEKCT</h2>
                    <p className="text-xs text-muted-foreground">Global Education & Charitable Trust</p>
                  </div>
                </div>

                <nav className="flex flex-col space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-lg font-medium transition-colors hover:text-primary px-4 py-3 rounded-lg hover:bg-primary/5 ${
                        isActive(item.href) 
                          ? "text-primary bg-primary/10" 
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  {/* Mobile Dropdown Items */}
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="text-sm font-semibold text-primary mb-2 px-4">More Options</div>
                    {dropdownItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-lg font-medium transition-colors hover:text-primary px-4 py-3 rounded-lg hover:bg-primary/5 ${
                          isActive(item.href) 
                            ? "text-primary bg-primary/10" 
                            : "text-muted-foreground"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </nav>

                <div className="pt-6 border-t">
                  <Link href="/donate" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">Donate Now</Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
