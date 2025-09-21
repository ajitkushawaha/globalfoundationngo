const mongoose = require('mongoose')
require('dotenv').config({ path: '.env.local' })

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}

// Blog Post Schema
const BlogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  tags: [String],
  featured: { type: Boolean, default: false },
  published: { type: Boolean, default: false },
  publishedAt: Date,
  image: String,
  imageAlt: String,
  readTime: { type: String, default: '5 min read' },
  views: { type: Number, default: 0 },
  seoTitle: String,
  seoDescription: String
}, { timestamps: true })

const BlogPost = mongoose.model('BlogPost', BlogPostSchema)

// Statistic Schema
const StatisticSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ['impact', 'achievement', 'milestone'] },
  value: { type: String, required: true },
  label: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  color: { type: String, required: true },
  bgColor: { type: String, required: true },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

const Statistic = mongoose.model('Statistic', StatisticSchema)

// Initiative Schema
const InitiativeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  image: String,
  imageAlt: String,
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

const Initiative = mongoose.model('Initiative', InitiativeSchema)

// User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'editor', 'viewer'], default: 'viewer' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true })

const User = mongoose.model('User', UserSchema)

// Seed data
const seedDatabase = async () => {
  try {
    // Clear existing data
    await BlogPost.deleteMany({})
    await Statistic.deleteMany({})
    await Initiative.deleteMany({})
    await User.deleteMany({})

    console.log('Cleared existing data')

    // Seed Blog Posts
    const blogPosts = [
      {
        title: "Success Story: How We Helped 50 Children Access Quality Education",
        slug: "success-story-50-children-education",
        excerpt: "Read about our recent education initiative that provided school supplies, books, and learning materials to underprivileged children in rural Gujarat.",
        content: "This is the full content of the blog post about our education initiative...",
        author: "Dr. Priya Sharma",
        category: "Education",
        tags: ["education", "children", "success-story"],
        featured: true,
        published: true,
        publishedAt: new Date(),
        image: "/children-studying-in-classroom-with-books-and-teac.jpg",
        imageAlt: "Children studying in classroom",
        readTime: "5 min read",
        views: 150
      },
      {
        title: "Animal Rescue Mission: Saving 20 Stray Dogs from the Streets",
        slug: "animal-rescue-mission-20-stray-dogs",
        excerpt: "Our dedicated team recently conducted a rescue operation, providing medical care and finding loving homes for abandoned dogs in Ahmedabad.",
        content: "This is the full content of the blog post about our animal rescue mission...",
        author: "Rajesh Patel",
        category: "Animal Welfare",
        tags: ["animal-welfare", "rescue", "dogs"],
        featured: false,
        published: true,
        publishedAt: new Date(),
        image: "/veterinarian-caring-for-rescued-animals-in-shelter.jpg",
        imageAlt: "Veterinarian caring for rescued animals",
        readTime: "4 min read",
        views: 89
      },
      {
        title: "Elderly Care Program: Bringing Joy to Senior Citizens",
        slug: "elderly-care-program-senior-citizens",
        excerpt: "Learn about our monthly visits to elderly care centers, where we provide companionship, healthcare support, and essential supplies.",
        content: "This is the full content of the blog post about our elderly care program...",
        author: "Meera Desai",
        category: "Elderly Care",
        tags: ["elderly-care", "community", "healthcare"],
        featured: false,
        published: true,
        publishedAt: new Date(),
        image: "/elderly-people-being-cared-for-by-volunteers-in-co.jpg",
        imageAlt: "Elderly people being cared for by volunteers",
        readTime: "6 min read",
        views: 67
      },
      {
        title: "Green Initiative: Planting 1000 Trees for a Sustainable Future",
        slug: "green-initiative-planting-1000-trees",
        excerpt: "Join us in our environmental conservation efforts as we plant 1000 trees across Gujarat to combat climate change and create a greener future.",
        content: "This is the full content of the blog post about our green initiative...",
        author: "Amit Kumar",
        category: "Environmental Conservation",
        tags: ["environment", "trees", "sustainability"],
        featured: false,
        published: true,
        publishedAt: new Date(),
        image: "/volunteers-planting-trees-in-community-environment.jpg",
        imageAlt: "Volunteers planting trees",
        readTime: "5 min read",
        views: 112
      }
    ]

    await BlogPost.insertMany(blogPosts)
    console.log('Seeded blog posts')

    // Seed Statistics
    const statistics = [
      {
        type: "impact",
        value: "500+",
        label: "Lives Impacted",
        description: "Families and individuals supported",
        icon: "Users",
        color: "text-blue-600",
        bgColor: "bg-blue-100",
        order: 1,
        isActive: true
      },
      {
        type: "impact",
        value: "200+",
        label: "Animals Rescued",
        description: "Stray and injured animals helped",
        icon: "Heart",
        color: "text-red-600",
        bgColor: "bg-red-100",
        order: 2,
        isActive: true
      },
      {
        type: "impact",
        value: "150+",
        label: "Children Educated",
        description: "Quality education provided",
        icon: "GraduationCap",
        color: "text-green-600",
        bgColor: "bg-green-100",
        order: 3,
        isActive: true
      },
      {
        type: "impact",
        value: "1000+",
        label: "Trees Planted",
        description: "Environmental conservation efforts",
        icon: "TreePine",
        color: "text-emerald-600",
        bgColor: "bg-emerald-100",
        order: 4,
        isActive: true
      }
    ]

    await Statistic.insertMany(statistics)
    console.log('Seeded statistics')

    // Seed Initiatives
    const initiatives = [
      {
        title: "Education Programs",
        description: "Providing quality education and learning opportunities to underprivileged children, focusing on girl child education and literacy programs.",
        icon: "GraduationCap",
        image: "/children-studying-in-classroom-with-books-and-teac.jpg",
        imageAlt: "Children studying in classroom",
        order: 1,
        isActive: true
      },
      {
        title: "Animal Welfare",
        description: "Rescuing, rehabilitating, and providing shelter for stray and injured animals. Running adoption drives and awareness programs.",
        icon: "Heart",
        image: "/veterinarian-caring-for-rescued-animals-in-shelter.jpg",
        imageAlt: "Veterinarian caring for rescued animals",
        order: 2,
        isActive: true
      },
      {
        title: "Elderly Care",
        description: "Supporting elderly individuals with healthcare, companionship, and essential services to ensure their dignity and well-being.",
        icon: "Users",
        image: "/elderly-people-being-cared-for-by-volunteers-in-co.jpg",
        imageAlt: "Elderly people being cared for by volunteers",
        order: 3,
        isActive: true
      },
      {
        title: "Environmental Conservation",
        description: "Promoting environmental awareness through tree plantation drives and sustainable practices for a greener future.",
        icon: "TreePine",
        image: "/volunteers-planting-trees-in-community-environment.jpg",
        imageAlt: "Volunteers planting trees",
        order: 4,
        isActive: true
      }
    ]

    await Initiative.insertMany(initiatives)
    console.log('Seeded initiatives')

    // Seed Admin User
    const bcrypt = require('bcryptjs')
    const hashedPassword = await bcrypt.hash('admin123', 10)
    
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@gekct.org',
      password: hashedPassword,
      role: 'admin',
      isActive: true
    })

    await adminUser.save()
    console.log('Seeded admin user')

    console.log('Database seeded successfully!')
    console.log('Admin credentials:')
    console.log('Email: admin@gekct.org')
    console.log('Password: admin123')

  } catch (error) {
    console.error('Error seeding database:', error)
  } finally {
    mongoose.connection.close()
  }
}

// Run the seed function
connectDB().then(() => {
  seedDatabase()
})
