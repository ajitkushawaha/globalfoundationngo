# NGO Images Setup Instructions

## Quick Start

1. **Create placeholder images:**
   ```bash
   node scripts/create-placeholder-images.js
   ```

2. **Download real images (optional):**
   ```bash
   # Get free Unsplash API key from https://unsplash.com/developers
   export UNSPLASH_ACCESS_KEY=your_key_here
   node scripts/download-ngo-images.js
   ```

3. **Optimize images:**
   ```bash
   node scripts/optimize-images.js
   ```

## Manual Image Addition

### Recommended Image Sources:
- **Unsplash**: https://unsplash.com (free, high-quality)
- **Pexels**: https://pexels.com (free, diverse)
- **Pixabay**: https://pixabay.com (free, various licenses)

### Search Terms for NGO Images:
- "charity organization"
- "volunteers helping"
- "community development"
- "children education"
- "animal welfare"
- "elderly care"
- "environmental conservation"
- "social work"
- "nonprofit organization"
- "community service"

### Image Specifications:
- **Hero Images**: 1920x1080px (16:9)
- **Program Images**: 800x600px (4:3)
- **Team Photos**: 400x400px (1:1)
- **Gallery Images**: 1200x800px (3:2)
- **Impact Images**: 600x400px (3:2)

## Usage in Components

```tsx
import { HeroImage, ProgramImage, TeamImage } from '@/components/ngo-image'

// Hero section
<HeroImage 
  src="/images/hero/hero-main.jpg" 
  alt="Community helping together" 
/>

// Program section
<ProgramImage 
  src="/images/programs/education-program.jpg" 
  alt="Children studying" 
/>

// Team section
<TeamImage 
  src="/images/team/founder.jpg" 
  alt="Organization founder" 
/>
```

## Next Steps

1. Replace placeholder images with real photos
2. Add proper alt text for accessibility
3. Optimize images for web performance
4. Test image loading across devices
5. Update components to use new images
