# BlissByBena - Complete eCommerce Platform

A modern, full-stack eCommerce website for a handmade brand featuring handmade jewellery, crochet items, and hair accessories.

## 📁 Project Structure

```
blissbybena/
├── backend/              # Node.js + Express API
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── controllers/      # Business logic
│   ├── config/          # Database configuration
│   ├── middleware/       # Auth & error handling
│   ├── server.js        # Main server file
│   ├── package.json
│   └── .env.example
│
├── frontend/            # React + Tailwind CSS (Customer)
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── utils/       # API & helper functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   ├── package.json
│   └── .env.example
│
└── admin/               # React + Tailwind CSS (Admin Dashboard)
    ├── src/
    │   ├── components/  # Admin components
    │   ├── pages/       # Dashboard pages
    │   ├── utils/       # API & helpers
    │   ├── App.jsx
    │   └── main.jsx
    ├── public/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── .env.example
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MongoDB Atlas account (free)
- Git

### 1. Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB URI and JWT secret
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blissbybena
# JWT_SECRET=your_secret_key_here
# PORT=5000

npm run dev  # Start development server
```

Backend runs on: `http://localhost:5000`
API: `http://localhost:5000/api`

### 2. Frontend Setup

```bash
cd frontend
npm install

# Create .env file
cp .env.example .env

# .env should contain:
# VITE_API_URL=http://localhost:5000/api

npm run dev  # Start development server
```

Frontend runs on: `http://localhost:3000`

### 3. Admin Panel Setup

```bash
cd admin
npm install

# Create .env file
cp .env.example .env

# .env should contain:
# VITE_API_URL=http://localhost:5000/api

npm run dev  # Start development server
```

Admin runs on: `http://localhost:3001`

## 🌐 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product
- `GET /api/products/search?query=` - Search products
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get all orders (Admin)
- `GET /api/orders/:id` - Get single order (Admin)
- `PUT /api/orders/:id` - Update order status (Admin)
- `DELETE /api/orders/:id` - Delete order (Admin)

### Authentication
- `POST /api/auth/register` - Register admin
- `POST /api/auth/login` - Login admin
- `GET /api/auth/me` - Get current admin (Protected)

## 💾 Database Schema

### Product
```javascript
{
  name: String,
  description: String,
  price: Number,
  category: String, // Jewellery, Crochet Items, Hair Accessories
  image: String,
  images: [String],
  stock: Number,
  featured: Boolean,
  timestamps: Dates
}
```

### Order
```javascript
{
  orderNumber: String,
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  items: [{
    productId: ObjectId,
    productName: String,
    quantity: Number,
    price: Number,
    total: Number
  }],
  totalPrice: Number,
  status: String, // Pending, Processing, Shipped, Delivered, Cancelled
  shippingAddress: String,
  notes: String,
  timestamps: Dates
}
```

### Admin
```javascript
{
  email: String,
  password: String (hashed),
  name: String,
  timestamps: Dates
}
```

## 🎨 Design System

### Colors
- **Sage Green**: `#7db39a` (Primary)
- **Beige**: `#f5f1ed` (Background)
- **Cream**: `#fefbf7` (Light Background)
- **Soft Pink**: `#f5e6e3` (Accent)

### Typography
- **Headers**: Playfair Display (Serif)
- **Body**: Poppins (Sans-serif)

## 📱 Features

### Customer Frontend
- ✅ Home page with hero section
- ✅ Shop page with filters and search
- ✅ Product details page
- ✅ Shopping cart with local storage
- ✅ Checkout with email collection
- ✅ About page
- ✅ Contact page with form
- ✅ WhatsApp integration
- ✅ Responsive design
- ✅ Toast notifications

### Admin Dashboard
- ✅ Login/Register
- ✅ Dashboard with stats
- ✅ Product management (CRUD)
- ✅ Order management
- ✅ Order status tracking
- ✅ Responsive admin interface

## 🔐 Authentication

- JWT-based authentication
- Password hashing with bcryptjs
- Protected admin routes
- Token stored in localStorage

## 📦 Third-Party Services

- **MongoDB Atlas** - Database
- **Vercel** - Frontend hosting
- **Netlify** - Frontend alternative
- **Render** - Backend hosting
- **Railway** - Backend alternative

## 🚀 Deployment

### Deploy Backend to Render

1. Create account on [render.com](https://render.com)
2. Connect your GitHub repository
3. Create new Web Service
4. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV=production`
5. Deploy

### Deploy Frontend to Vercel

1. Create account on [vercel.com](https://vercel.com)
2. Connect your GitHub repository
3. Set environment variables:
   - `VITE_API_URL=https://your-backend.onrender.com/api`
4. Deploy

## 📝 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blissbybena
PORT=5000
JWT_SECRET=your_super_secret_key
ADMIN_EMAIL=admin@blissbybena.com
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

### Admin (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 🧪 Testing

### Create Sample Products

```bash
# Use the admin dashboard to add products or make API calls:
curl -X POST http://localhost:5000/api/products \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Handmade Necklace",
    "description": "Beautiful handmade beaded necklace",
    "price": 45.99,
    "category": "Jewellery",
    "image": "https://example.com/image.jpg",
    "stock": 10,
    "featured": true
  }'
```

## 🐛 Common Issues

### CORS Errors
- Make sure backend is running
- Check `VITE_API_URL` in frontend .env
- Enable CORS in backend (already configured)

### MongoDB Connection Failed
- Verify MongoDB URI
- Check IP whitelist in MongoDB Atlas
- Ensure network is accessible

### Image Not Loading
- Use full URLs (https://example.com/image.jpg)
- Check image permissions
- Verify URL is valid

## 📱 Mobile Optimization
- Mobile-first design
- Touch-friendly buttons
- Responsive grid layouts
- Optimized navigation

## ♿ Accessibility
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Proper contrast ratios

## 📊 SEO Optimization
- Meta tags
- Semantic structure
- Clean URLs
- Mobile responsive

## 🎁 Features Added

- ✨ Smooth animations
- 🎯 Toast notifications
- 📦 Loading spinners
- 🔍 Product search
- 📸 Product gallery
- 💳 Shopping cart
- 📧 Email collection
- 💬 WhatsApp integration
- 🎨 Modern UI
- 📱 Fully responsive

## 📚 Additional Commands

### Backend
```bash
npm install      # Install dependencies
npm run dev      # Start development server
npm start        # Start production server
```

### Frontend
```bash
npm install      # Install dependencies
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Admin
```bash
npm install      # Install dependencies
npm run dev      # Start development server
npm run build    # Build for production
```

## 🤝 Contributing

Feel free to fork and submit pull requests.

## 📄 License

MIT License - feel free to use this project for your needs.

## 💬 Support

For support, contact hello@blissbybena.com or reach out via WhatsApp.

---

**Made with ❤️ by the BlissByBena Team**
