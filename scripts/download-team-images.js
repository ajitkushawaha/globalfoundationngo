const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const https = require('https')
const http = require('http')
require('dotenv').config({ path: '.env.local' })

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB')
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    process.exit(1)
  }
}

// Team Member Schema
const TeamMemberSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, required: true, trim: true },
  instagramLink: { type: String, trim: true },
  profession: { type: String, required: true, trim: true },
  photo: { type: String, trim: true },
  joinAs: { type: String, required: true, enum: ['team', 'volunteer', 'board_member', 'advisor'] },
  role: { type: String, trim: true },
  department: { type: String, trim: true },
  skills: [{ type: String, trim: true }],
  availability: { type: String, enum: ['full_time', 'part_time', 'weekends', 'evenings', 'flexible'], default: 'flexible' },
  status: { type: String, enum: ['active', 'inactive', 'pending', 'suspended'], default: 'pending' },
  joinDate: { type: Date, default: Date.now },
  lastActive: { type: Date },
  socialLinks: {
    instagram: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    twitter: { type: String, trim: true },
    facebook: { type: String, trim: true }
  },
  address: {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    country: { type: String, trim: true },
    zipCode: { type: String, trim: true }
  },
  emergencyContact: {
    name: { type: String, trim: true },
    phone: { type: String, trim: true },
    relationship: { type: String, trim: true }
  },
  achievements: [{ type: String, trim: true }],
  notes: { type: String, maxlength: 500 },
  isPublic: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 }
}, {
  timestamps: true
})

const TeamMember = mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema)

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'team')
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
  console.log('📁 Created uploads/team directory')
}

// Function to download image from URL
const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http
    
    const request = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      }
    }, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(filepath)
        response.pipe(file)
        
        file.on('finish', () => {
          file.close()
          resolve(filepath)
        })
        
        file.on('error', (err) => {
          fs.unlink(filepath, () => {}) // Delete the file on error
          reject(err)
        })
      } else if (response.statusCode === 302 || response.statusCode === 301) {
        // Handle redirects
        downloadImage(response.headers.location, filepath)
          .then(resolve)
          .catch(reject)
      } else {
        reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`))
      }
    })
    
    request.on('error', (err) => {
      reject(err)
    })
    
    request.setTimeout(30000, () => {
      request.destroy()
      reject(new Error('Request timeout'))
    })
  })
}

// Function to get file extension from content type
const getFileExtension = (contentType) => {
  const extensions = {
    'image/jpeg': '.jpg',
    'image/jpg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
    'image/webp': '.webp',
    'image/svg+xml': '.svg'
  }
  return extensions[contentType] || '.jpg'
}

// Function to sanitize filename
const sanitizeFilename = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// Function to convert Google Drive URL to direct download URL
const convertGoogleDriveUrl = (url) => {
  if (!url || !url.includes('drive.google.com')) {
    return url
  }
  
  // Extract file ID
  let fileId = null
  
  // Format: https://drive.google.com/uc?export=view&id=FILE_ID
  const ucMatch = url.match(/\/uc\?export=view&id=([a-zA-Z0-9_-]+)/)
  if (ucMatch) {
    fileId = ucMatch[1]
  }
  
  // Format: https://drive.google.com/open?id=FILE_ID
  const openMatch = url.match(/\/open\?id=([a-zA-Z0-9_-]+)/)
  if (openMatch) {
    fileId = openMatch[1]
  }
  
  if (fileId) {
    // Try different Google Drive download URLs
    return [
      `https://drive.google.com/uc?export=download&id=${fileId}`,
      `https://drive.google.com/uc?export=view&id=${fileId}`,
      `https://docs.google.com/uc?export=download&id=${fileId}`
    ]
  }
  
  return [url]
}

const downloadTeamImages = async () => {
  try {
    await connectDB()
    
    console.log('📥 Starting to download team member images...')
    
    const teamMembers = await TeamMember.find({
      photo: { $exists: true, $ne: null }
    })
    
    console.log(`📊 Found ${teamMembers.length} team members with photos`)
    
    if (teamMembers.length === 0) {
      console.log('✅ No team members with photos found')
      return
    }
    
    let successCount = 0
    let errorCount = 0
    
    for (const member of teamMembers) {
      try {
        console.log(`\n📸 Processing ${member.fullName}...`)
        
        const originalUrl = member.photo
        const possibleUrls = convertGoogleDriveUrl(originalUrl)
        
        let downloaded = false
        let localPath = null
        
        for (const url of possibleUrls) {
          try {
            console.log(`   🔗 Trying: ${url}`)
            
            const filename = `${sanitizeFilename(member.fullName)}-${member._id}`
            const filepath = path.join(uploadsDir, `${filename}.jpg`)
            
            await downloadImage(url, filepath)
            
            // Verify the file was downloaded and is actually an image
            const stats = fs.statSync(filepath)
            if (stats.size > 1000) { // At least 1KB
              localPath = `/uploads/team/${filename}.jpg`
              downloaded = true
              console.log(`   ✅ Downloaded: ${localPath}`)
              break
            } else {
              fs.unlinkSync(filepath) // Delete small/invalid files
              console.log(`   ⚠️  File too small, trying next URL...`)
            }
          } catch (error) {
            console.log(`   ❌ Failed: ${error.message}`)
            continue
          }
        }
        
        if (downloaded && localPath) {
          // Update the database with the local path
          await TeamMember.findByIdAndUpdate(member._id, { photo: localPath })
          console.log(`   💾 Updated database: ${localPath}`)
          successCount++
        } else {
          console.log(`   ❌ Could not download image for ${member.fullName}`)
          errorCount++
        }
        
        // Add a small delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 1000))
        
      } catch (error) {
        console.error(`   ❌ Error processing ${member.fullName}:`, error.message)
        errorCount++
      }
    }
    
    console.log(`\n🎉 Download completed!`)
    console.log(`   ✅ Successfully downloaded: ${successCount} images`)
    console.log(`   ❌ Failed downloads: ${errorCount} images`)
    console.log(`   📁 Images saved to: ${uploadsDir}`)
    console.log(`   🌐 Access via: http://localhost:3001/uploads/team/`)
    
  } catch (error) {
    console.error('❌ Error downloading images:', error)
  } finally {
    await mongoose.connection.close()
    console.log('🔌 Database connection closed')
  }
}

// Run the download
downloadTeamImages()
