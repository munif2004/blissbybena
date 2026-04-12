# 🔧 Quick Troubleshooting Guide

## Issue 1: Admin Login Error

### ❌ Problem
"An error occurred" when trying to login

### ✅ Solution

**Step 1: Register a new admin account**

1. Go to http://localhost:3001/admin
2. Click **"Don't have an account? Register"**
3. Fill in:
   - **Name:** Your name
   - **Email:** admin@blissbybena.com
   - **Password:** any password (e.g., password123)
4. Click **"Register"**
5. You'll be logged in automatically

**Step 2: Verify Login Works**

- You should see the Admin Dashboard
- Dashboard shows products count, orders count, revenue
- Navigation menu appears on left

**If still failing:**
- Check browser console (Press F12)
- Check if backend is running on port 5000
- Test: https://blissbybena.onrender.com/api/health should return success

---

## Issue 2: Product Creation Fails

### ❌ Problem  
"Failed to save product" when clicking Create Product

### ✅ Solution

**Check 1: Form Validation**
Make sure ALL fields are filled:
- ✅ Product Name (required)
- ✅ Description (required)
- ✅ Price (required)
- ✅ Stock (required)
- ✅ Category (required)
- ✅ Image file (required for new products)

**Check 2: Image Upload**
- File must be: JPG, PNG, GIF
- File size must be under 5MB
- Image preview should appear before submitting

**Check 3: Backend Connection**
Test your backend API:
```
GET http://localhost:5000/api/health
```
Should return:
```json
{
  "success": true,
  "message": "Server is running"
}
```

**Check 4: Uploads Folder**
The backend needs an `uploads/` folder:
- Location: `c:\Users\hp\blissbybena\backend\uploads\`
- If doesn't exist, create it manually
- Must have write permissions

---

## Complete Workflow

### Step 1: Start All Services

**Terminal 1 - Backend (Port 5000):**
```bash
cd c:\Users\hp\blissbybena\backend
npm run dev
# Should show: Server running on port 5000
```

**Terminal 2 - Frontend (Port 3000):**
```bash
cd c:\Users\hp\blissbybena\frontend
npm run dev
# Should show: Local: http://localhost:3000
```

**Terminal 3 - Admin (Port 3001):**
```bash
cd c:\Users\hp\blissbybena\admin
npm run dev
# Should show: Local: http://localhost:3001
```

### Step 2: Create Admin Account

1. Go to http://localhost:3001
2. Click "Register"
3. Create account
4. You're logged in!

### Step 3: Add First Product

1. Click "Add New Product"
2. Fill form:
   - Name: Test Product
   - Description: This is a test
   - Price: 100
   - Stock: 5
   - Category: Jewellery
   - Upload an image
3. Click "Create Product"
4. ✅ Should see success message

### Step 4: View on Frontend

1. Go to http://localhost:3000/shop
2. Should see your product
3. Image should display
4. Price shows ₹100

---

## Debug Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Admin panel running on port 3001
- [ ] Admin account registered
- [ ] Can login without errors
- [ ] Can view products list
- [ ] Uploads folder exists at `backend/uploads/`
- [ ] Product form fills completely
- [ ] Image uploads and shows preview
- [ ] Product creates successfully
- [ ] Product appears in frontend shop
- [ ] Images display in shop page

---

## Common Errors & Fixes

### Error: "Cannot find module 'multer'"
**Fix:**
```bash
cd backend
npm install multer
npm run dev
```

### Error: "ENOENT: no such file or directory, open 'uploads/...'"
**Fix:**
Create uploads folder:
```bash
cd backend
mkdir uploads
```

### Error: "JWT_SECRET is not defined"
**Fix:**
Check `.env` file has: `JWT_SECRET=your_secret_key`

### Error: "Route not found"
**Fix:**
- Make sure backend is running on port 5000
- Check API base URL is correct
- Test: `http://localhost:5000/api/health`

---

## Testing Each Component

### Test Backend API
```
GET http://localhost:5000/api/health
```
Expected: `{"success": true, "message": "Server is running"}`

### Test Products API
```
GET http://localhost:5000/api/products
```
Expected: Array of products (empty initially)

### Test Image Upload
Submit a product via admin panel, then check:
```
GET http://localhost:5000/api/products
```
Should see your product with image path like:
```
"image": "uploads/image-1712958400000-123456789.jpg"
```

---

## Contact Support

If issues persist:
1. Check all three services are running
2. Check no port conflicts (5000, 3000, 3001)
3. Check MongoDB connection is working
4. Clear browser cache and refresh
5. Check browser console for specific errors (F12)

