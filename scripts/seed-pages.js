const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://ajitkushwhaha:ajitkushwhaha@cluster0.8jqjq.mongodb.net/gekct?retryWrites=true&w=majority';

const samplePages = [
  {
    title: 'About Us',
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
    navigationOrder: 1,
    featuredImage: '/gkct.jpg',
    featuredImageAlt: 'GEKCT Logo',
    author: 'Admin',
    lastModifiedBy: 'Admin'
  },
  {
    title: 'Our Services',
    slug: 'services',
    content: `# Our Services

At GEKCT, we offer a comprehensive range of services designed to make a meaningful impact in our community.

## Education Programs

### Primary Education
- Free schooling for underprivileged children
- Quality teaching materials and resources
- After-school tutoring programs
- Computer literacy classes

### Adult Education
- Basic literacy programs
- Vocational training courses
- Digital skills workshops
- Language learning support

## Animal Welfare Services

### Rescue Operations
- Emergency animal rescue
- Medical treatment for injured animals
- Rehabilitation programs
- Adoption services

### Community Outreach
- Spay/neuter programs
- Vaccination drives
- Animal welfare awareness campaigns
- Pet care education

## Elderly Care Programs

### Daily Support
- Home visits and companionship
- Medical assistance coordination
- Meal delivery services
- Transportation assistance

### Social Activities
- Community gatherings
- Health check-up camps
- Recreational activities
- Support groups

## Environmental Initiatives

### Conservation Projects
- Tree planting campaigns
- Waste management programs
- Water conservation education
- Renewable energy promotion

### Community Gardens
- Urban farming initiatives
- Sustainable agriculture training
- Organic farming support
- Green space development

## How to Access Our Services

1. **Contact Us**: Reach out through our contact form
2. **Visit Our Center**: Come to our main office
3. **Call Us**: Use our helpline for immediate assistance
4. **Online Application**: Fill out our service request form

*All services are provided free of charge to those in need.*`,
    excerpt: 'Discover our comprehensive range of services including education programs, animal welfare, elderly care, and environmental initiatives.',
    pageType: 'static',
    status: 'published',
    seoTitle: 'Our Services - GEKCT Programs and Initiatives',
    seoDescription: 'Explore GEKCT\'s comprehensive services including education, animal welfare, elderly care, and environmental programs.',
    seoKeywords: ['services', 'programs', 'education', 'animal welfare', 'elderly care'],
    showInNavigation: true,
    navigationOrder: 2,
    featuredImage: '/diverse-group-of-children-and-adults-in-colorful-t.jpg',
    featuredImageAlt: 'Community Services',
    author: 'Admin',
    lastModifiedBy: 'Admin'
  },
  {
    title: 'Contact Information',
    slug: 'contact',
    content: `# Contact Us

Get in touch with us to learn more about our programs or to offer your support.

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
    navigationOrder: 3,
    featuredImage: '/placeholder.jpg',
    featuredImageAlt: 'Contact Information',
    author: 'Admin',
    lastModifiedBy: 'Admin'
  },
  {
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    content: `# Privacy Policy

*Last updated: January 2024*

## Introduction

Global Education and Charitable Trust ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.

## Information We Collect

### Personal Information
- Name and contact details
- Email address
- Phone number
- Mailing address
- Donation history

### Non-Personal Information
- Website usage data
- Browser information
- IP address
- Cookies and tracking data

## How We Use Your Information

We use the collected information to:
- Process donations and transactions
- Send updates about our programs
- Improve our services
- Comply with legal requirements
- Communicate with supporters

## Information Sharing

We do not sell, trade, or rent your personal information to third parties. We may share information only:
- With your consent
- To comply with legal obligations
- With trusted service providers
- In case of emergency situations

## Data Security

We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

## Your Rights

You have the right to:
- Access your personal information
- Correct inaccurate data
- Request data deletion
- Opt-out of communications
- Withdraw consent

## Contact Us

If you have questions about this Privacy Policy, please contact us at:
- Email: privacy@gekct.org
- Phone: +91 98765 43210
- Address: 123 Charity Street, Ahmedabad, Gujarat 380001`,
    excerpt: 'Read our privacy policy to understand how we collect, use, and protect your personal information.',
    pageType: 'static',
    status: 'draft',
    seoTitle: 'Privacy Policy - GEKCT Data Protection',
    seoDescription: 'Learn about how GEKCT protects your privacy and handles your personal information.',
    seoKeywords: ['privacy', 'policy', 'data protection', 'personal information'],
    showInNavigation: false,
    navigationOrder: 0,
    author: 'Admin',
    lastModifiedBy: 'Admin'
  },
  {
    title: 'Terms of Service',
    slug: 'terms-of-service',
    content: `# Terms of Service

*Last updated: January 2024*

## Acceptance of Terms

By accessing and using the Global Education and Charitable Trust website and services, you accept and agree to be bound by the terms and provision of this agreement.

## Use License

Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only.

## Disclaimer

The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties.

## Limitations

In no event shall Global Education and Charitable Trust or its suppliers be liable for any damages arising out of the use or inability to use the materials on our website.

## Accuracy of Materials

The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials are accurate, complete, or current.

## Links

We have not reviewed all of the sites linked to our website and are not responsible for the contents of any such linked site.

## Modifications

We may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the current version of these terms.

## Governing Law

These terms and conditions are governed by and construed in accordance with the laws of India.

## Contact Information

For questions about these Terms of Service, contact us at:
- Email: legal@gekct.org
- Phone: +91 98765 43210`,
    excerpt: 'Read our terms of service to understand the rules and guidelines for using our website and services.',
    pageType: 'static',
    status: 'draft',
    seoTitle: 'Terms of Service - GEKCT Website Terms',
    seoDescription: 'Read the terms and conditions for using the GEKCT website and services.',
    seoKeywords: ['terms', 'service', 'conditions', 'website', 'legal'],
    showInNavigation: false,
    navigationOrder: 0,
    author: 'Admin',
    lastModifiedBy: 'Admin'
  }
];

async function seedPages() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('gekct');
    const pagesCollection = db.collection('pages');
    
    // Clear existing pages
    await pagesCollection.deleteMany({});
    console.log('Cleared existing pages');
    
    // Insert sample pages
    const result = await pagesCollection.insertMany(samplePages);
    console.log(`Inserted ${result.insertedCount} sample pages`);
    
    // List all pages
    const pages = await pagesCollection.find({}).toArray();
    console.log('\nPages created:');
    pages.forEach(page => {
      console.log(`- ${page.title} (${page.slug}) - Status: ${page.status}`);
    });
    
  } catch (error) {
    console.error('Error seeding pages:', error);
  } finally {
    await client.close();
  }
}

seedPages();
