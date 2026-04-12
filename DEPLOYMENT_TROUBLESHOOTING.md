# Deployment Troubleshooting Guide

## Issue: Admin/Frontend showing "Page not found" after deployment

### Problem
After deploying to Netlify, accessing routes like `/admin/products` returns a 404 error.

### Root Cause
Single Page Applications (SPAs) like React need special routing configuration on Netlify. Without it, Netlify tries to serve actual files instead of routing through React Router.

### Solution

#### 1. **_redirects File** ✅ (Already Added)
Each React app needs a `_redirects` file in the `public/` folder:

```
/* /index.html 200
```

This tells Netlify to serve `/index.html` for all routes, letting React Router handle navigation.

**Files added:**
- `frontend/public/_redirects`
- `admin/public/_redirects`

#### 2. **netlify.toml Config** ✅ (Already Added)
Alternative to _redirects with build configuration:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Files added:**
- `frontend/netlify.toml`
- `admin/netlify.toml`

#### 3. **Environment Variables** (YOU MUST DO THIS)

You need to set production environment variables on Netlify:

##### For Frontend (`frontend/.env`):
```
VITE_API_URL=https://your-render-backend-url.onrender.com/api
```

##### For Admin (`admin/.env`):
```
VITE_API_URL=https://your-render-backend-url.onrender.com/api
```

**Find your Render Backend URL:**
1. Go to Render Dashboard
2. Click on your "blissbybena" service
3. Copy the URL (e.g., `https://blissbybena-xxx.onrender.com`)
4. Use: `https://blissbybena-xxx.onrender.com/api`

**How to set on Netlify:**
1. Go to Netlify Site Settings
2. Build & Deploy → Environment
3. Add new environment variable:
   - Key: `VITE_API_URL`
   - Value: `https://your-render-url.onrender.com/api`
4. Trigger a redeploy

#### 4. **CORS Configuration** ✅ (Already Updated)
Backend CORS is now configured for production URLs.

**Backend `.env` should include:**
```
NODE_ENV=production
FRONTEND_URL=https://blissbybena.netlify.app
ADMIN_URL=https://blissbybena-admin.netlify.app
```

---

## Step-by-Step Fix

### For Frontend (Shop)

1. **Netlify Settings:**
   - Go to `App Settings` → `Build & Deploy` → `Environment`
   - Add: `VITE_API_URL` = `https://your-render-url.onrender.com/api`

2. **Redeploy:**
   - Trigger a Manual Deploy in Netlify
   - Or push to GitHub if connected

3. **Test:**
   - Visit `https://blissbybena.netlify.app/shop`
   - Should now show products

### For Admin

1. **Same as Frontend:**
   - Add `VITE_API_URL` environment variable
   - Trigger redeploy

2. **Test:**
   - Visit your admin Netlify URL
   - Routes should now work (e.g., `/admin/products`)

### For Backend (Render)

1. **Update `.env` on Render:**
   - Go to Render Dashboard
   - Click your service
   - Settings → Environment
   - Add/Update:
     ```
     FRONTEND_URL=https://blissbybena.netlify.app
     ADMIN_URL=https://your-admin-netlify-url.netlify.app
     ```

2. **Redeploy:**
   - Click "Redeploy" on Render dashboard

---

## Common Issues & Fixes

### Issue: Still getting 404
- **Check:** Is `_redirects` file in `public/` folder?
- **Check:** Did you redeploy after adding file?
- **Fix:** Hard refresh (Ctrl+Shift+R)

### Issue: API calls failing
- **Check:** Is `VITE_API_URL` correct in Netlify environment variables?
- **Check:** Is Render backend still running?
- **Fix:** Test API directly: `https://your-render-url.onrender.com/api/health`

### Issue: CORS errors
- **Check:** Backend CORS allows your Netlify domains
- **Fix:** Contact support if needed

### Issue: Infinite redirect loop
- **Delete:** Old `_redirects` if you're using `netlify.toml`
- **Use:** One method only (either _redirects OR netlify.toml)

---

## Verification Checklist

- [ ] `_redirects` file exists in `frontend/public/`
- [ ] `_redirects` file exists in `admin/public/`
- [ ] `netlify.toml` exists in both projects
- [ ] `VITE_API_URL` environment variable set on Netlify
- [ ] API URL points to correct Render backend
- [ ] Redeployed after making changes
- [ ] Hard refreshed browser (Ctrl+Shift+R)
- [ ] Tested routes like `/shop`, `/admin/products`

---

## Support

If still having issues:
1. Check browser console for errors (F12)
2. Check Network tab to see API calls
3. Check Netlify Deploy logs for build errors
4. Verify VITE_API_URL format

**Correct format:** `https://your-render-url.onrender.com/api`
**Wrong format:** `http://localhost:5000/api`
