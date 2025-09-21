interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  handler: (response: any) => void
  prefill: {
    name: string
    email: string
    contact: string
  }
  notes: {
    [key: string]: string
  }
  theme: {
    color: string
  }
}

declare global {
  interface Window {
    Razorpay: any
  }
}

export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export const createRazorpayOrder = async (amount: number, currency: string = 'INR') => {
  try {
    const response = await fetch('/api/razorpay/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount * 100, // Razorpay expects amount in paise
        currency,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to create order')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error creating Razorpay order:', error)
    throw error
  }
}

export const openRazorpayPayment = (options: RazorpayOptions) => {
  const razorpay = new window.Razorpay(options)
  razorpay.open()
}

export const formatDonationItems = (items: any[]) => {
  return items.map(item => ({
    category: item.categoryName,
    quantity: item.quantity,
    unit: item.unit,
    amount: item.total
  }))
}
