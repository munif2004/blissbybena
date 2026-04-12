# BlissByBena - Deployment Guide

Complete guide to deploy your eCommerce website to production.

## Overview

The deployment strategy is:
- **Backend**: Render.com (or Railway.app, Vercel)
- **Frontend**: Vercel (or Netlify)
- **Admin**: Vercel (or Netlify)
- **Database**: MongoDB Atlas (Cloud)

## Prerequisites

- GitHub account with repository
- Render account (or Railway/Heroku)
- Vercel account
- MongoDB Atlas account

---

## Step 1: Prepare for Deployment

### 1.1 Update Backend

Edit `backend/server.js` to serve static frontend in production:

```javascript
// Optional: Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}
```

### 1.2 Build Frontend

```bash
cd frontend
npm run build
# Generates dist/ folder
```

### 1.3 Build Admin

```bash
cd admin
npm run build
# Generates dist/ folder
```

### 1.4 Test Production Build Locally

```bash
# Backend
cd backend
NODE_ENV=production npm start

# Check http://localhost:5000/api/health
```

### 1.5 Push to GitHub

```bash
git add .
git commit -m "Full stack ecommerce app"
git push origin main
```

---

## Step 2: Deploy Backend to Render

### 2.1 Create Render Account

1. Go to https://render.com
2. Sign up with GitHub
3. Authorize Render

### 2.2 Create Web Service

1. Click "New +" → "Web Service"
2. Choose your GitHub repository
3. Set configuration:
   - **Name**: blissbybena-api
   - **Environment**: Node
   - **Build command**: `npm install`
   - **Start command**: `npm start`
   - **Root directory**: `backend`

### 2.3 Set Environment Variables

Click "Environment" and add:

```
MONGODB_URI=mongodb+srv://your_user:your_password@cluster.mongodb.net/blissbybena?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_at_least_32_characters_long
NODE_ENV=production
ADMIN_EMAIL=admin@blissbybena.com
```

Generate a strong JWT_SECRET:
```bash
openssl rand -base64 32
# Output: some/secret+key==
```

### 2.4 Deploy

1. Click "Create Web Service"
2. Wait for deployment (2-5 minutes)
3. Get your URL: `https://your-service.onrender.com`
4. Save this URL (you'll need it for frontend)

### 2.5 Test Backend

```bash
# Should return 200 OK
curl https://your-service.onrender.com/api/health

# Response:
# {"success":true,"message":"Server is running"}
```

✅ **Backend is deployed!**

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Account

1. Go to https://vercel.com
2. Sign up with GitHub
3. Authorize Vercel

### 3.2 Import Frontend Repository

1. Click "Import Project"
2. Select your GitHub repository
3. Set configuration:
   - **Framework**: Vite
   - **Root Directory**: `frontend`
   - **Build command**: `npm run build` (should auto-detect)
   - **Output directory**: `dist`

### 3.3 Set Environment Variables

Add environment variable:

```
VITE_API_URL=https://your-service.onrender.com/api
```

### 3.4 Deploy

1. Click "Deploy"
2. Wait for deployment (2-3 minutes)
3. Get your URL: `https://your-project.vercel.app`

### 3.5 Test Frontend

Visit `https://your-project.vercel.app`

You should see the homepage. Test:
- Browse products
- Add to cart
- View cart
- Try checkout

If products don't load, check:
1. Backend is running
2. `VITE_API_URL` is correct
3. Browser console for errors

✅ **Frontend is deployed!**

---

## Step 4: Deploy Admin Panel to Vercel

### 4.1 Import Admin Repository

1. In Vercel, click "Add New..." → "Project"
2. Select your GitHub repository
3. Set configuration:
   - **Framework**: Vite
   - **Root Directory**: `admin`
   - **Build command**: `npm run build`
   - **Output directory**: `dist`

### 4.2 Set Environment Variables

Add environment variable:

```
VITE_API_URL=https://your-service.onrender.com/api
```

### 4.3 Deploy

1. Click "Deploy"
2. Wait for deployment
3. Get your URL: `https://admin-project.vercel.app`

### 4.4 Test Admin

1. Visit `https://admin-project.vercel.app`
2. Register a new admin account
3. Try adding a product
4. Check if products appear on frontend

✅ **Admin panel is deployed!**

---

## Alternative Deployment Options

### Backend Alternatives

#### Railway.app
1. Go to https://railway.app
2. Connect GitHub
3. Create new project
4. Select repository
5. Add variables
6. Deploy

#### Heroku (Free tier removed - use Render)
Previously free, now requires paid plan.

#### Vercel (Serverless)
Can deploy backend as serverless functions:
1. Modify `server.js` for serverless
2. Deploy to Vercel as API route
3. More complex setup

### Frontend Alternatives

#### Netlify
1. Go to https://netlify.com
2. Connect GitHub
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add build variables
6. Deploy

#### GitHub Pages
Limited to static sites, requires build step.

#### AWS Amplify
More complex but powerful option.

---

## Step 5: Custom Domain (Optional)

### 5.1 Point to Vercel Frontend

1. Buy domain (Namecheap, GoDaddy)
2. In Vercel dashboard, go to Settings
3. Add custom domain: `yourdomain.com`
4. Follow DNS instructions
5. Point nameservers or add CNAME

### 5.2 Point to Render Backend

For API subdomain:
1. In Render dashboard, add custom domain
2. Update DNS: `api.yourdomain.com` → Render URL
3. Update frontend `VITE_API_URL` to `https://api.yourdomain.com`

Example DNS Records:
```
yourdomain.com          →  Vercel IP/CNAME
api.yourdomain.com      →  Render CNAME
www.yourdomain.com      →  yourdomain.com (CNAME)
```

---

## Step 6: SSL/HTTPS

- ✅ Vercel: Automatic SSL
- ✅ Render: Automatic SSL
- ✅ Custom domains: Let's Encrypt (free)

All major platforms include free SSL certificates.

---

## Step 7: Monitoring & Maintenance

### Backend Logs

**Render:**
1. Go to Service Dashboard
2. Click "Logs"
3. View real-time logs

Check for:
- Connection errors
- API errors
- Performance issues

### Frontend Errors

**Vercel:**
1. Go to Project Dashboard
2. Click "Analytics"
3. View page views and errors

Use browser DevTools:
1. Open network tab
2. Check API requests
3. Monitor for 500 errors

### Database

**MongoDB Atlas:**
1. Go to https://cloud.mongodb.com
2. View metrics
3. Monitor storage usage
4. Check connection count

---

## Step 8: Post-Deployment Checklist

- [ ] Backend health check passes
- [ ] Frontend connects to API
- [ ] Admin panel works
- [ ] Can create products
- [ ] Can create orders
- [ ] Images load correctly
- [ ] Cart functionality works
- [ ] Checkout redirects to WhatsApp
- [ ] Mobile responsive
- [ ] All pages load
- [ ] No console errors

---

## Step 9: Update Links & Communications

### Update WhatsApp Links

Edit frontend and admin:
```javascript
// Replace with your WhatsApp number
href="https://wa.me/your_actual_number"
```

### Update Contact Information

- Email: Update in Contact page
- Instagram: Update footer links
- Phone: Update sidebar

### Create FAQ/Help Docs

Document for customers:
- How to order
- Shipping policy
- Returns policy
- Contact info

---

## Performance Optimization

### Image Optimization

Consider CDN integration:
- **Cloudinary** (free tier)
- **AWS CloudFront**
- **Netlify Image Optimization**

### Caching

Enable browser caching:
- Vercel: Automatic
- Render: Add headers in `server.js`

### Database Indexing

MongoDB indexes:
```javascript
// In MongoDB Atlas: add index on category
db.products.createIndex({ category: 1 })
db.products.createIndex({ name: "text" })
```

### Code Splitting

Already done with Vite:
- Automatic route-based splitting
- Tree-shaking enabled

---

## Continuous Deployment

### Auto-Deploy on Git Push

Both Render and Vercel auto-deploy on main branch push:

```bash
git add .
git commit -m "Update message"
git push origin main
# Automatically deploys!
```

Disable auto-deploy (optional):
- Go to deployment settings
- Disable "Auto-deploy"
- Manual deploy via dashboard

---

## Debugging Deployment Issues

### Frontend not connecting to API

1. Check `VITE_API_URL` in Vercel environment
2. Verify backend URL is correct
3. Check CORS errors in browser console
4. Ensure backend is running

### Products not loading

```javascript
// Add to browser console
fetch('https://your-api-url/api/health')
  .then(r => r.json())
  .then(d => console.log(d))
  .catch(e => console.error(e))
```

### Admin login fails

1. Verify backend database connection
2. Check MongoDB Atlas IP whitelist
3. Ensure admin user exists
4. Check JWT_SECRET is same on backend

### Images not loading

1. Verify image URLs are HTTPS
2. Check CORS on image source
3. Try different image URL format
4. Use CDN for images

### Performance slow

1. Check MongoDB query performance
2. Add database indexes
3. Enable caching headers
4. Use CDN for static assets
5. Optimize image sizes

---

## Security Best Practices

### Secrets Management

✅ Use environment variables
✅ Never commit `.env`
✅ Rotate JWT secret periodically
✅ Use strong passwords (20+ chars)
✅ Enable MongoDB Auth

### HTTPS

✅ Always use HTTPS
✅ Redirect HTTP to HTTPS

### API Security

✅ Rate limiting (add express-rate-limit)
✅ Input validation (already done)
✅ SQL injection prevention (using Mongoose)
✅ CORS configured properly

### Database Security

✅ MongoDB Atlas: IP whitelist
✅ Strong password (20+ chars)
✅ Enable encryption at rest
✅ Regular backups

### Other

✅ No sensitive data in logs
✅ Update dependencies regularly
✅ Use security headers
✅ Regular security audits

---

## Scaling Considerations

### If traffic increases:

1. **Database**: Upgrade MongoDB tier
2. **Backend**: Increase Render compute
3. **Static**: Use CDN (Cloudflare)
4. **Images**: Implement image CDN
5. **Caching**: Add Redis cache

### Expected Traffic:
- **Current**: <1000 requests/day
- **Growing**: Scale after 10k request/day
- **Enterprise**: Use microservices

---

## Cost Breakdown

### Monthly Costs
- **Backend (Render)**: $7/month
- **Frontend (Vercel)**: Free/Pro
- **Admin (Vercel)**: Free/Pro
- **Database (MongoDB)**: Free/paid tier
- **Domain**: $10-15/year

### Optimization
- Use free tiers where possible
- Monitor usage
- Scale gradually
- Remove unused resources

---

## Rollback & Recovery

### Rollback Vercel
1. Dashboard → Deployments
2. Click on previous version
3. Click "Redeploy"

### Rollback Render
1. Dashboard → Logs & Events
2. Click previous deployment
3. Redeploy

### Restore Database
**MongoDB Atlas:**
1. Go to Database Backups
2. Select restore point
3. Confirm restore

---

## Next Steps

After successful deployment:

1. ✅ Test all features
2. ✅ Connect custom domain
3. ✅ Set up email notifications (optional)
4. ✅ Add analytics (Google Analytics)
5. ✅ Create backup strategy
6. ✅ Document admin processes
7. ✅ Train team on admin panel
8. ✅ Setup monitoring alerts

---

## Support

For deployment issues:

1. Check Render/Vercel logs
2. Review MongoDB Atlas metrics
3. Check GitHub Actions
4. Review error messages
5. Check network connectivity
6. Contact platform support

---

**Your eCommerce store is now live! 🎉**

Remember to:
- Keep dependencies updated
- Monitor performance
- Backup data regularly
- Update security practices
- Scale as needed

Good luck with BlissByBena! 💎
