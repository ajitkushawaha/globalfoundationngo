# 🚀 Production Deployment Guide

## ✅ Production Readiness Checklist

### Critical Issues Fixed:
- [x] **Dynamic Server Usage Errors** - Added `export const dynamic = 'force-dynamic'` to all API routes
- [x] **JWT Security** - Removed fallback secret, now requires JWT_SECRET env var
- [x] **Metadata Base** - Added proper metadataBase for social media images
- [x] **Image Optimization** - Enabled for production, disabled only in development
- [x] **Admin Credentials** - Removed from login page

### Remaining Issues to Address:

#### 1. Environment Variables (REQUIRED)
Create `.env.local` with these variables:

```bash
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gekct_production

# JWT Secret (Generate a strong secret key)
JWT_SECRET=your-super-secure-jwt-secret-key-here

# Base URL
NEXT_PUBLIC_BASE_URL=https://gekct.org

# Email Configuration (Choose one)
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=your_16_character_app_password
EMAIL_FROM="GEKCT Foundation" <yourgmail@gmail.com>

# Email Action Secret
EMAIL_ACTION_SECRET=your-email-action-secret-key

# Razorpay
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Environment
NODE_ENV=production
```

#### 2. Database Indexes (RECOMMENDED)
Fix duplicate schema index warnings by removing duplicate index definitions in models.

#### 3. ESLint Configuration (MINOR)
Update ESLint config to remove deprecated options.

## 🚀 Deployment Steps

### For Vercel (Recommended):

1. **Connect Repository:**
   ```bash
   # Push your code to GitHub
   git add .
   git commit -m "Production ready"
   git push origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set environment variables in Vercel dashboard
   - Deploy

3. **Configure Domain:**
   - Add your custom domain in Vercel
   - Update DNS records
   - Update `NEXT_PUBLIC_BASE_URL` to your domain

### For Other Platforms:

#### Railway:
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### DigitalOcean App Platform:
- Connect GitHub repository
- Set environment variables
- Configure build settings
- Deploy

## 🔒 Security Checklist

- [x] JWT secret is properly configured
- [x] Admin credentials removed from code
- [x] Environment variables are secure
- [ ] Rate limiting implemented (optional)
- [ ] Input validation enhanced (optional)
- [ ] CORS properly configured (optional)

## 📊 Performance Optimizations

- [x] Image optimization enabled
- [x] Static generation where possible
- [x] Dynamic routes properly configured
- [ ] CDN configured (if using Vercel)
- [ ] Database connection pooling (optional)

## 🧪 Testing Before Production

1. **Build Test:**
   ```bash
   npm run build
   npm start
   ```

2. **Functionality Test:**
   - Test all forms (join, donate, contact)
   - Test admin panel login
   - Test email functionality
   - Test payment integration

3. **Performance Test:**
   - Check page load times
   - Test on mobile devices
   - Verify image optimization

## 🚨 Critical Security Notes

1. **Never commit `.env.local`** - It contains sensitive data
2. **Use strong JWT secrets** - Generate with: `openssl rand -base64 32`
3. **Enable 2FA** on all accounts (GitHub, Vercel, MongoDB)
4. **Regular security updates** - Keep dependencies updated
5. **Monitor logs** - Set up error tracking (Sentry recommended)

## 📈 Post-Deployment

1. **Set up monitoring:**
   - Error tracking (Sentry)
   - Analytics (Google Analytics)
   - Uptime monitoring

2. **Backup strategy:**
   - Database backups
   - Code backups
   - Environment variable backup

3. **SSL Certificate:**
   - Vercel provides free SSL
   - Other platforms may need manual setup

## 🆘 Troubleshooting

### Common Issues:

1. **Build Fails:**
   - Check environment variables
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **Database Connection:**
   - Verify MongoDB URI
   - Check network access
   - Verify credentials

3. **Email Not Working:**
   - Check SMTP credentials
   - Verify Gmail app password
   - Test with `/api/test-email`

4. **Images Not Loading:**
   - Check image domains in next.config.mjs
   - Verify file permissions
   - Check CDN configuration

## 📞 Support

For deployment issues:
1. Check Vercel/Platform logs
2. Review environment variables
3. Test locally with production env vars
4. Contact platform support if needed

---

**Ready for Production! 🎉**

The application is now production-ready with all critical issues fixed. Follow the deployment steps above to go live.
