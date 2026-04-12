# BlissByBena Setup Guide

## 🚀 Getting Started

This is a complete eCommerce solution for BlissByBena. Follow these steps to get it running locally.

## Prerequisites

- **Node.js** 16 or higher
- **npm** or **yarn**
- **MongoDB Atlas** account (free at mongodb.com)
- **Git**

## Step 1: MongoDB Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string:
   - Click "Connect"
   - Choose "Drivers"
   - Copy the connection string
   - Replace `<username>` and `<password>` with your credentials
   - Add database name: `/blissbybena`

Example: `mongodb+srv://user:password@cluster.mongodb.net/blissbybena?retryWrites=true&w=majority`

## Step 2: Backend Setup

### Installation

```bash
cd backend
npm install
```

### Environment Configuration

```bash
# Copy example env file
cp .env.example .env

# Edit .env file with your values
```

**.env file content:**
```
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/blissbybena?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_in_production
ADMIN_EMAIL=admin@blissbybena.com
NODE_ENV=development
```

### Start Backend

```bash
npm run dev
# Server starts on http://localhost:5000
```

✅ **Backend is running!**

## Step 3: Frontend Setup

### Installation

```bash
cd frontend
npm install
```

### Environment Configuration

```bash
cp .env.example .env
```

**.env file content:**
```
VITE_API_URL=http://localhost:5000/api
```

### Start Frontend

```bash
npm run dev
# Frontend starts on http://localhost:3000
```

✅ **Frontend is running!**

## Step 4: Admin Panel Setup

### Installation

```bash
cd admin
npm install
```

### Environment Configuration

```bash
cp .env.example .env
```

**.env file content:**
```
VITE_API_URL=http://localhost:5000/api
```

### Start Admin

```bash
npm run dev
# Admin starts on http://localhost:3001
```

✅ **Admin panel is running!**

## 📍 Access URLs

- **Customer Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3001
- **API**: http://localhost:5000/api

## 🔐 Create Admin Account

1. Go to http://localhost:3001
2. Click "Register" to create a new admin account
3. Fill in email, password, and name
4. Click "Register"
5. You're logged in! Now manage products and orders

## 📦 Add Sample Products

1. Go to Admin Panel (http://localhost:3001)
2. Click "Products" in sidebar
3. Click "Add Product"
4. Fill in product details:
   - **Name**: Handmade Beaded Necklace
   - **Description**: Beautiful handmade jewelry made with love
   - **Price**: 45.99
   - **Category**: Jewellery
   - **Image URL**: Use a valid image URL (e.g., https://via.placeholder.com/500)
   - **Stock**: 10
   - **Featured**: Check this box
5. Click "Create Product"
6. Repeat for more products in different categories

## 🛍️ Test Customer Flow

1. Visit http://localhost:3000 (Homepage)
2. Click "Shop Now" to browse products
3. Click on any product to view details
4. Click "Add to Cart"
5. Go to cart (top right)
6. Enter your details
7. Click "Complete Order"
8. You'll be redirected to WhatsApp to finalize

## 📊 Admin Dashboard Features

- **Dashboard**: View stats (products, orders, revenue)
- **Products**: 
  - View all products
  - Add new products
  - Edit products
  - Delete products
- **Orders**: 
  - View all customer orders
  - Change order status (Pending → Processing → Shipped → Delivered)
  - View order details
  - Delete orders

## 🌐 Update WhatsApp Links

The app uses WhatsApp integration. Update these in the code:

### Frontend (src/pages/Home.jsx & Contact.jsx)
```javascript
// Replace with actual WhatsApp number
href="https://wa.me/1234567890"
// or
href="https://wa.me/?text=your_message"
```

### Update your WhatsApp number format:
- Without +: `https://wa.me/1234567890`
- With +: `https://wa.me/+1234567890`

## 🎨 Customize Brand

### Colors
Edit `frontend/tailwind.config.js` and `admin/tailwind.config.js`:

```javascript
colors: {
  sage: {
    500: '#7db39a', // Primary color
  },
  bliss: {
    beige: '#f5f1ed',
    pink: '#f5e6e3',
  }
}
```

### Brand Name
- Search "BlissByBena" and replace with your brand name
- Update in:
  - `frontend/src/components/Navbar.jsx`
  - `frontend/index.html`
  - `admin/src/components/Sidebar.jsx`
  - `admin/index.html`

## 🚀 Production Deployment

### Deploy Backend (Render)

1. Push code to GitHub
2. Go to https://render.com
3. Create new Web Service
4. Connect GitHub repo
5. Set environment variables:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=strong_random_string
   NODE_ENV=production
   ```
6. Deploy

### Deploy Frontend (Vercel)

1. Go to https://vercel.com
2. Import your GitHub repo
3. Set environment variable:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```
4. Deploy

### Deploy Admin (Vercel)

1. Go to https://vercel.com
2. Import your GitHub repo (admin folder)
3. Set environment variable:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```
4. Deploy

## 📱 Responsive Design

The site is fully responsive across:
- ✅ Mobile (320px+)
- ✅ Tablet (768px+)
- ✅ Desktop (1024px+)

## 🐛 Troubleshooting

### Backend won't start
- Check MongoDB URI
- Verify MongoDB Atlas IP whitelist includes your IP
- Check port 5000 is available

### Frontend won't connect to API
- Verify backend is running
- Check `VITE_API_URL` in .env
- Check browser console for CORS errors

### Admin login fails
- Verify backend is running
- Check admin account was created
- Check MongoDB connection

### Images not loading
- Use full URLs (https://...)
- Check image permissions
- Verify image format is supported (jpg, png, webp)

## 📚 Useful Commands

### Backend
```bash
npm run dev      # Start dev server with hot reload
npm start        # Start production server
npm install      # Install dependencies
```

### Frontend
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm install      # Install dependencies
```

## 🤝 Support

For issues or questions:
1. Check the README.md in root directory
2. Review your .env files
3. Check console for errors
4. Verify MongoDB connection

## 📞 Contact

- Email: hello@blissbybena.com
- WhatsApp: [Your WhatsApp Link]
- Instagram: @blissbybena

---

**You're all set! Happy selling! 🎉**
