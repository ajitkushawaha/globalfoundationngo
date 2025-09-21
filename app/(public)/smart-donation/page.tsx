"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function SmartDonationRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/donate")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Redirecting to donation page...</p>
      </div>
    </div>
  )
}