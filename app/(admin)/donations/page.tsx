"use client"

import { useEffect, useMemo, useRef, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, XCircle, AlertTriangle, RefreshCw } from 'lucide-react'
import { AdminLayout } from '@/components/admin-layout'
import { useToast, ToastContainer } from '@/components/ui/toast'

interface DonationItem {
  categoryId: string
  categoryName: string
  unit: string
  unitPrice: number
  quantity: number
  total: number
}
interface DonationDoc {
  donationRef: string
  totalAmount: number
  status: string
  createdAt: string
  donor: { name: string; email: string; phone?: string; anonymous?: boolean; message?: string }
  items: DonationItem[]
}

export default function AdminDonationsPage() {
  const [pending, setPending] = useState<DonationDoc[]>([])
  const [approved, setApproved] = useState<DonationDoc[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [highlightedId, setHighlightedId] = useState<string | null>(null)
  const lastCount = useRef(0)
  const { toasts, success, error: showError, removeToast } = useToast()

  // Check for highlight parameter in URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const highlight = urlParams.get('highlight')
      if (highlight) {
        setHighlightedId(highlight)
        // Remove highlight from URL after 5 seconds
        setTimeout(() => {
          setHighlightedId(null)
          const newUrl = new URL(window.location.href)
          newUrl.searchParams.delete('highlight')
          window.history.replaceState({}, '', newUrl.toString())
        }, 5000)
      }
    }
  }, [])

  async function load() {
    try {
      setError(null)
      // Fetch pending
      const [resPending, resApproved] = await Promise.all([
        fetch('/api/donations?status=pending', { cache: 'no-store' }),
        fetch('/api/donations?status=approved&limit=50', { cache: 'no-store' }),
      ])

      const dataPending = await resPending.json()
      const dataApproved = await resApproved.json()

      if (dataPending.success) {
        setPending(dataPending.data)
        // show toast when new donations arrive
        if (lastCount.current && dataPending.data.length > lastCount.current) {
          success('New Donation Received', `${dataPending.data.length - lastCount.current} new donation(s) received`)
        }
        lastCount.current = dataPending.data.length
      } else {
        setError(dataPending.error || 'Failed to fetch pending')
      }

      if (dataApproved.success) {
        setApproved(dataApproved.data)
      }
    } catch (e) {
      setError('Failed to fetch')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    const id = setInterval(load, 10000)
    return () => clearInterval(id)
  }, [])

  const hasPending = pending.length > 0

  async function update(ref: string, action: 'approve' | 'reject') {
    const ok = confirm(`Are you sure you want to ${action} ${ref}?`)
    if (!ok) return
    const res = await fetch('/api/donations', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ donationRef: ref, action })
    })
    const data = await res.json()
    if (data.success) {
      await load()
      // notify other parts of the app (e.g., header) to refresh counts immediately
      try { window.dispatchEvent(new CustomEvent('donations:updated')) } catch {}
      
      if (action === 'approve') {
        success('Donation Approved', 'Donation has been approved and donor notified')
      } else {
        success('Donation Rejected', 'Donation has been rejected')
      }
    } else {
      showError('Operation Failed', data.error || 'Failed to process donation')
    }
  }


  return (
    <AdminLayout title="Donations" subtitle="Review and approve incoming donations">
      <section className="py-6">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Admin • Donations</h1>
              <p className="text-sm text-muted-foreground">Review and approve incoming donations after you receive payment.</p>
            </div>
            <Button variant="outline" onClick={load}><RefreshCw className="w-4 h-4 mr-2"/>Refresh</Button>
          </div>

          {/* Pending Approvals at the top with Approve/Reject */}
          {hasPending && (
            <div className="mb-6 p-4 rounded border bg-amber-50 text-amber-900 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              {pending.length} donation(s) awaiting approval
            </div>
          )}

          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : (
            <div className="space-y-4">
              {pending.map((d) => (
                <Card 
                  key={d.donationRef} 
                  className={highlightedId === d.donationRef ? 'ring-2 ring-blue-500 bg-blue-50' : ''}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge>{d.donationRef}</Badge>
                          <span className="text-sm text-muted-foreground">{new Date(d.createdAt).toLocaleString()}</span>
                        </div>
                        <div className="mt-1 font-medium">{d.donor.name} {d.donor.anonymous ? '(Anonymous)' : ''} • ₹{d.totalAmount}</div>
                        <div className="text-xs text-muted-foreground">{d.donor.email}{d.donor.phone ? ` • ${d.donor.phone}` : ''}</div>
                        <ul className="mt-2 text-sm list-disc pl-5">
                          {d.items.map((it, idx) => (
                            <li key={idx}>{it.categoryName} • {it.quantity} {it.unit}(s) • ₹{it.total}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => update(d.donationRef, 'approve')}><CheckCircle2 className="w-4 h-4 mr-1"/>Approve</Button>
                        <Button variant="outline" onClick={() => update(d.donationRef, 'reject')}><XCircle className="w-4 h-4 mr-1"/>Reject</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {!pending.length && (
                <Card>
                  <CardContent className="p-6 text-center text-muted-foreground">No pending donations.</CardContent>
                </Card>
              )}

              {/* Approved donors list at the bottom */}
              <div className="pt-6">
                <h2 className="text-xl font-semibold mb-3">All Donors (Approved)</h2>
                {approved.length ? (
                  <div className="space-y-2">
                    {approved.map((d) => (
                      <div key={d.donationRef} className="flex items-center justify-between rounded border bg-white p-3">
                        <div>
                          <div className="font-medium">{d.donor.anonymous ? 'Anonymous' : d.donor.name} • ₹{d.totalAmount}</div>
                          <div className="text-xs text-muted-foreground flex gap-2">
                            <span>{new Date(d.createdAt).toLocaleString()}</span>
                            <span>•</span>
                            <span>Ref: {d.donationRef}</span>
                          </div>
                        </div>
                        <Badge variant="secondary">Approved</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center text-muted-foreground">No approved donors yet.</CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </AdminLayout>
  )
}
