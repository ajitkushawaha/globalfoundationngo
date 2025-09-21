import { Header } from './header'
import { Footer } from './footer'

interface PublicLayoutProps {
  children: React.ReactNode
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <main className="min-h-screen">
      <Header />
      {children}
      <Footer />
    </main>
  )
}
