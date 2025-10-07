import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Page from '@/lib/models/Page'

const samplePages = [
  {
    title: 'About',
    slug: 'about',
    content: `# About Global Education and Charitable Trust

Welcome to GEKCT, where we believe in the power of education and compassion to transform lives.

## Our Mission

We are dedicated to creating positive change through:
- **Education**: Providing quality education to underprivileged children
- **Animal Welfare**: Caring for and protecting animals in need
- **Elderly Care**: Supporting senior citizens in our community
- **Environmental Conservation**: Protecting our planet for future generations

## Our Vision

A world where every child has access to education, every animal is treated with kindness, and every community thrives through mutual support and care.

## How You Can Help

- **Volunteer**: Join our team of dedicated volunteers
- **Donate**: Support our initiatives with your contributions
- **Spread Awareness**: Help us reach more people who need our help

> "The best way to find yourself is to lose yourself in the service of others." - Mahatma Gandhi

Contact us today to learn more about how you can make a difference!`,
    excerpt: 'Learn about our mission to create positive change through education, animal welfare, elderly care, and environmental conservation.',
    pageType: 'static',
    status: 'published',
    seoTitle: 'About GEKCT - Global Education and Charitable Trust',
    seoDescription: 'Learn about GEKCT\'s mission to create positive change through education, animal welfare, elderly care, and environmental conservation.',
    seoKeywords: ['about', 'mission', 'charity', 'education', 'animal welfare'],
    showInNavigation: true,
    navigationOrder: 2,
    featuredImage: '/gkct.jpg',
    featuredImageAlt: 'GEKCT Logo',
    author: 'Admin',
    lastModifiedBy: 'Admin'
  },
  {
    title: 'Blog',
    slug: 'blog',
    content: `# Our Blog

Welcome to the GEKCT blog, where we share inspiring stories, updates on our programs, and insights into the impact we're making in our community.

## Latest Stories

Stay updated with our latest activities and the stories of those whose lives we've touched through our various programs.

## Categories

### Education
Stories about our educational initiatives, student success stories, and the importance of quality education for all children.

### Animal Welfare
Updates on our animal rescue operations, adoption success stories, and community awareness programs.

### Elderly Care
Heartwarming stories from our elderly care programs, volunteer experiences, and the joy we bring to senior citizens.

### Environmental Conservation
Our environmental initiatives, tree planting campaigns, and efforts to create a sustainable future.

## Impact Stories

Read about the real difference we're making in people's lives and how your support helps us continue our mission.

## Get Involved

Interested in sharing your story or volunteering with us? Contact us to learn how you can contribute to our blog and our mission.

*Follow our blog to stay connected with our community and be inspired by the positive change we're creating together.*`,
    excerpt: 'Read our latest stories, impact updates, and inspiring content about our community programs and initiatives.',
    pageType: 'static',
    status: 'published',
    seoTitle: 'Blog - GEKCT Stories and Updates',
    seoDescription: 'Read inspiring stories and updates from Global Education and Charitable Trust about our community impact.',
    seoKeywords: ['blog', 'stories', 'impact', 'charity', 'community'],
    showInNavigation: true,
    navigationOrder: 3,
    featuredImage: '/children-studying-in-classroom-with-books-and-teac.jpg',
    featuredImageAlt: 'Children studying',
    author: 'Admin',
    lastModifiedBy: 'Admin'
  },
  {
    title: 'Trust & Transparency',
    slug: 'trust-transparency',
    content: `# Trust & Transparency

At Global Education and Charitable Trust, we believe that transparency and accountability are fundamental to building trust with our supporters and the communities we serve.

## Our Commitment

We are committed to maintaining the highest standards of transparency in all our operations, ensuring that every donation and resource is used effectively and ethically.

## Financial Transparency

### Annual Reports
- Detailed financial statements
- Program expenditure breakdown
- Administrative cost analysis
- Impact measurement reports

### Donation Tracking
- Real-time donation tracking
- Project-specific funding allocation
- Regular updates on fund utilization
- Transparent reporting system

## Governance

### Board of Trustees
Our board consists of experienced professionals committed to our mission and ensuring proper governance.

### Policies & Procedures
- Clear operational guidelines
- Ethical fundraising practices
- Conflict of interest policies
- Whistleblower protection

## Impact Measurement

### Key Metrics
- Number of children educated
- Animals rescued and rehabilitated
- Elderly citizens supported
- Environmental projects completed

### Success Stories
Real stories of impact and transformation in the communities we serve.

## Accountability

### Regular Audits
- Annual financial audits
- Program effectiveness reviews
- Compliance monitoring
- External evaluation

### Reporting
- Quarterly progress reports
- Annual impact reports
- Donor communication
- Public disclosure

## How We Use Your Donations

### Direct Impact
- 85% goes directly to programs
- 10% for administrative costs
- 5% for fundraising activities

### Program Allocation
- Education: 40%
- Animal Welfare: 25%
- Elderly Care: 20%
- Environmental: 15%

## Contact for Transparency

For any questions about our transparency practices or to request specific information:
- Email: transparency@gekct.org
- Phone: +91 98765 43210
- Address: 123 Charity Street, Ahmedabad, Gujarat 380001

*We believe that transparency builds trust, and trust enables us to create greater impact together.*`,
    excerpt: 'Learn about our commitment to transparency, accountability, and how we ensure every donation makes a real impact.',
    pageType: 'static',
    status: 'published',
    seoTitle: 'Trust & Transparency - GEKCT Accountability',
    seoDescription: 'Learn about GEKCT\'s commitment to transparency, financial accountability, and impact measurement.',
    seoKeywords: ['transparency', 'accountability', 'trust', 'financial', 'impact'],
    showInNavigation: true,
    navigationOrder: 4,
    featuredImage: '/placeholder.jpg',
    featuredImageAlt: 'Trust and Transparency',
    author: 'Admin',
    lastModifiedBy: 'Admin'
  },
  {
    title: 'Contact',
    slug: 'contact',
    content: `# Contact Us

Get in touch with us to learn more about our programs, volunteer opportunities, or to offer your support.

## Office Address

**Global Education and Charitable Trust**
123 Charity Street
Ahmedabad, Gujarat 380001
India

## Contact Details

- **Phone**: +91 98765 43210
- **Email**: info@gekct.org
- **Website**: www.gekct.org

## Office Hours

- **Monday to Friday**: 9:00 AM - 6:00 PM
- **Saturday**: 9:00 AM - 2:00 PM
- **Sunday**: Closed

## Emergency Contact

For urgent matters or emergency assistance:
- **24/7 Helpline**: +91 98765 43211
- **Email**: emergency@gekct.org

## Visit Our Center

We welcome visitors to our center where you can:
- Learn about our programs
- Meet our team
- See our work in action
- Volunteer your time

## Send Us a Message

Have questions or want to get involved? We'd love to hear from you!

*We typically respond to all inquiries within 24 hours.*

## Follow Us

Stay updated with our latest activities:
- Facebook: @GEKCTOfficial
- Twitter: @GEKCTCharity
- Instagram: @gekct_trust
- LinkedIn: Global Education and Charitable Trust`,
    excerpt: 'Get in touch with GEKCT. Find our contact details, office hours, and ways to reach us for support or to get involved.',
    pageType: 'static',
    status: 'published',
    seoTitle: 'Contact GEKCT - Get in Touch with Our Charity',
    seoDescription: 'Contact Global Education and Charitable Trust. Find our address, phone, email, and office hours.',
    seoKeywords: ['contact', 'address', 'phone', 'email', 'charity'],
    showInNavigation: true,
    navigationOrder: 5,
    featuredImage: '/placeholder.jpg',
    featuredImageAlt: 'Contact Information',
    author: 'Admin',
    lastModifiedBy: 'Admin'
  },
  {
    title: 'Donate',
    slug: 'donate',
    content: `# Donate to GEKCT

Your support helps us create positive change in our community. Every contribution, no matter the size, makes a real difference in the lives of those we serve.

## How Your Donation Helps

### Education Programs
- Provide school supplies and books
- Support teacher training programs
- Fund after-school tutoring
- Enable computer literacy classes

### Animal Welfare
- Rescue and rehabilitate animals
- Provide medical treatment
- Support adoption programs
- Fund spay/neuter initiatives

### Elderly Care
- Home visits and companionship
- Medical assistance coordination
- Meal delivery services
- Social activities and support

### Environmental Conservation
- Tree planting campaigns
- Waste management programs
- Water conservation education
- Renewable energy projects

## Donation Options

### One-Time Donation
Make a single contribution to support our ongoing programs.

### Monthly Donation
Become a regular supporter with automatic monthly contributions.

### Project-Specific Donation
Choose to support a specific program or initiative.

### In-Kind Donations
Donate goods, services, or volunteer your time.

## Donation Amounts

- **₹500**: Feed a child for a month
- **₹1,000**: Provide school supplies for 5 children
- **₹2,500**: Support animal rescue operations
- **₹5,000**: Fund elderly care services
- **₹10,000**: Plant 100 trees
- **Custom Amount**: Any amount you choose

## How to Donate

### Online Donation
- Secure online payment processing
- Multiple payment options
- Instant confirmation
- Tax-deductible receipts

### Bank Transfer
- Direct bank transfer
- NEFT/RTGS options
- Corporate donations
- International transfers

### Check/Cash
- Mail checks to our office
- Cash donations at our center
- Corporate partnerships
- Bulk donation options

## Tax Benefits

All donations to GEKCT are eligible for tax deduction under Section 80G of the Income Tax Act.

## Donor Recognition

- Thank you certificates
- Annual impact reports
- Donor appreciation events
- Recognition on our website (optional)

## Contact for Donations

For donation-related queries or assistance:
- Email: donations@gekct.org
- Phone: +91 98765 43210
- WhatsApp: +91 98765 43211

*Together, we can create a better tomorrow for everyone in our community.*`,
    excerpt: 'Support our mission by making a donation. Every contribution helps us create positive change in education, animal welfare, elderly care, and environmental conservation.',
    pageType: 'static',
    status: 'published',
    seoTitle: 'Donate to GEKCT - Support Our Mission',
    seoDescription: 'Donate to Global Education and Charitable Trust. Support our programs in education, animal welfare, elderly care, and environmental conservation.',
    seoKeywords: ['donate', 'charity', 'support', 'education', 'animal welfare'],
    showInNavigation: true,
    navigationOrder: 6,
    featuredImage: '/placeholder.jpg',
    featuredImageAlt: 'Donation Support',
    author: 'Admin',
    lastModifiedBy: 'Admin'
  }
]

// POST /api/seed-pages - Seed sample pages
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase()
    
    // Clear existing pages
    await Page.deleteMany({})
    console.log('Cleared existing pages')
    
    // Insert sample pages
    const pages = await Page.insertMany(samplePages)
    console.log(`Inserted ${pages.length} sample pages`)
    
    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${pages.length} sample pages`,
      data: pages.map(page => ({
        id: page._id,
        title: page.title,
        slug: page.slug,
        status: page.status
      }))
    })
  } catch (error) {
    console.error('Error seeding pages:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to seed pages' },
      { status: 500 }
    )
  }
}
