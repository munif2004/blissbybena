# BlissByBena - Complete Project Structure

```
blissbybena/
│
├── 📄 README.md                          # Main project documentation
├── 📄 SETUP_GUIDE.md                     # Step-by-step setup instructions
├── 📄 API_DOCUMENTATION.md               # API reference
├── 📄 DEPLOYMENT_GUIDE.md                # Deployment instructions
│
│
├── 📁 backend/                           # Node.js + Express API
│   ├── 📁 models/
│   │   ├── Product.js                    # Product schema
│   │   ├── Order.js                      # Order schema
│   │   └── Admin.js                      # Admin user schema
│   │
│   ├── 📁 controllers/
│   │   ├── productController.js          # Product CRUD logic
│   │   ├── orderController.js            # Order management logic
│   │   └── authController.js             # Authentication logic
│   │
│   ├── 📁 routes/
│   │   ├── products.js                   # Product routes
│   │   ├── orders.js                     # Order routes
│   │   └── auth.js                       # Auth routes
│   │
│   ├── 📁 middleware/
│   │   ├── auth.js                       # JWT verification
│   │   └── errorHandler.js               # Error handling
│   │
│   ├── 📁 config/
│   │   └── db.js                         # MongoDB connection
│   │
│   ├── server.js                         # Main server entry point
│   ├── package.json                      # Backend dependencies
│   ├── .env.example                      # Example environment variables
│   └── .gitignore                        # Git ignore rules
│
│
├── 📁 frontend/                          # React + Tailwind (Customer Site)
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   ├── Navbar.jsx                # Navigation bar
│   │   │   ├── Footer.jsx                # Footer section
│   │   │   ├── Toast.jsx                 # Toast notifications
│   │   │   ├── LoadingSpinner.jsx        # Loading indicator
│   │   │   └── ProductCard.jsx           # Product card component
│   │   │
│   │   ├── 📁 pages/
│   │   │   ├── Home.jsx                  # Homepage with hero
│   │   │   ├── Shop.jsx                  # Shop page with filter
│   │   │   ├── ProductDetail.jsx         # Product detail page
│   │   │   ├── Cart.jsx                  # Shopping cart
│   │   │   ├── About.jsx                 # About page
│   │   │   └── Contact.jsx               # Contact page
│   │   │
│   │   ├── 📁 utils/
│   │   │   ├── api.js                    # API service with Axios
│   │   │   └── helpers.js                # Helper functions
│   │   │
│   │   ├── App.jsx                       # Main app component
│   │   ├── main.jsx                      # React DOM mount
│   │   └── index.css                     # Tailwind styles
│   │
│   ├── 📁 public/                        # Static assets
│   ├── index.html                        # HTML template
│   ├── vite.config.js                    # Vite configuration
│   ├── tailwind.config.js                # Tailwind configuration
│   ├── postcss.config.js                 # PostCSS configuration
│   ├── package.json                      # Frontend dependencies
│   ├── .env.example                      # Example env variables
│   └── .gitignore                        # Git ignore rules
│
│
└── 📁 admin/                             # React + Tailwind (Admin Dashboard)
    ├── 📁 src/
    │   ├── 📁 components/
    │   │   ├── Sidebar.jsx               # Admin sidebar navigation
    │   │   ├── Toast.jsx                 # Toast notifications
    │   │   └── LoadingSpinner.jsx        # Loading indicator
    │   │
    │   ├── 📁 pages/
    │   │   ├── Login.jsx                 # Login/Register page
    │   │   ├── Dashboard.jsx             # Admin dashboard
    │   │   ├── ProductsList.jsx          # Products list
    │   │   ├── ProductForm.jsx           # Add/Edit product
    │   │   └── OrdersList.jsx            # Orders management
    │   │
    │   ├── 📁 utils/
    │   │   ├── api.js                    # API service
    │   │   └── helpers.js                # Helper functions
    │   │
    │   ├── App.jsx                       # Main admin app
    │   ├── main.jsx                      # React DOM mount
    │   └── index.css                     # Tailwind styles
    │
    ├── 📁 public/                        # Static assets
    ├── index.html                        # HTML template
    ├── vite.config.js                    # Vite configuration
    ├── tailwind.config.js                # Tailwind configuration
    ├── postcss.config.js                 # PostCSS configuration
    ├── package.json                      # Admin dependencies
    ├── .env.example                      # Example env variables
    └── .gitignore                        # Git ignore rules
```

## 📊 File Statistics

### Backend
- **Files**: 16
- **Total Lines**: ~2000
- **Main Dependencies**: Express, Mongoose, JWT, bcryptjs

### Frontend
- **Files**: 32
- **Components**: 5
- **Pages**: 6
- **Total Lines**: ~3500
- **Dependencies**: React, React Router, Axios, Tailwind

### Admin
- **Files**: 28
- **Components**: 3
- **Pages**: 5
- **Total Lines**: ~3000
- **Dependencies**: React, React Router, Axios, Tailwind

### Total
- **Files**: 76
- **Lines of Code**: ~8500
- **Components**: 13
- **Pages**: 16

## 🔗 Key File Relationships

```
Frontend <---> Admin
    │           │
    └─────┬──────┘
        API
        │
    Backend (Node.js)
        │
    MongoDB

Data Flow:
1. Customer browses frontend
2. Frontend calls Backend API
3. Backend queries MongoDB
4. Admin manages products via Admin panel
5. Admin controls orders status
```

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcryptjs
- **Validation**: express-validator

### Frontend
- **Framework**: React 18
- **Bundler**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: Lucide React

### Admin
- **Framework**: React 18
- **Bundler**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: Lucide React

## 🎯 Component Hierarchy

```
App
├── Navbar
├── Router
│   ├── Home
│   │   ├── Hero
│   │   ├── Categories
│   │   ├── FeaturedProducts
│   │   │   └── ProductCard[] (multiple)
│   │   ├── Testimonials
│   │   └── CTA
│   │
│   ├── Shop
│   │   ├── Sidebar (Filters)
│   │   └── ProductCard[] (grid)
│   │
│   ├── ProductDetail
│   │   ├── ImageGallery
│   │   ├── ProductInfo
│   │   ├── QuantitySelector
│   │   └── RelatedProducts
│   │
│   ├── Cart
│   │   ├── CartItems
│   │   ├── CheckoutForm
│   │   └── OrderSummary
│   │
│   ├── About
│   ├── Contact
│   └── 404
│
├── Footer
└── Toast (Global)
```

## 🔐 Authentication Flow

```
User (Admin) → Login Form → Backend
                              ↓
                      Verify Email + Password
                              ↓
                      Generate JWT Token
                              ↓
                      Return Token
                              ↓
User ← Store in localStorage ← Token
  ↓
Include in Authorization Header
  ↓
Protected API Calls
  ↓
Backend verifies token
  ↓
Return Protected Data
```

## 📡 API Request/Response Flow

```
Frontend/Admin
    ↓
Axios Instance (with JWT)
    ↓
HTTP Request
    ↓
Backend Express Server
    ↓
CORS Middleware
    ↓
Routes
    ↓
Controllers
    ↓
Models (Mongoose)
    ↓
MongoDB
    ↓
Response back through stack
    ↓
Frontend/Admin receives JSON
```

## 🎨 Styling Architecture

```
Tailwind CSS
├── Global Styles (index.css)
├── Custom Colors (tailwind.config.js)
│   ├── Sage Green (Primary)
│   ├── Beige (Secondary)
│   ├── Cream (Light)
│   └── Pink (Accent)
├── Custom Fonts
│   ├── Playfair Display (Headers)
│   └── Poppins (Body)
└── Animations
    ├── fadeIn
    ├── slideUp
    └── pulse
```

## 💾 Data Models

### Product Model
```javascript
{
  _id: ObjectId
  name: String
  description: String
  price: Number
  category: String (enum)
  image: String (URL)
  images: [String] (URLs)
  stock: Number
  featured: Boolean
  createdAt: Date
  updatedAt: Date
}
```

### Order Model
```javascript
{
  _id: ObjectId
  orderNumber: String (unique)
  customerName: String
  customerEmail: String
  customerPhone: String
  items: [
    {
      productId: ObjectId
      productName: String
      quantity: Number
      price: Number
      total: Number
    }
  ]
  totalPrice: Number
  status: String (enum)
  shippingAddress: String
  notes: String
  createdAt: Date
  updatedAt: Date
}
```

### Admin Model
```javascript
{
  _id: ObjectId
  email: String (unique)
  password: String (hashed)
  name: String
  createdAt: Date
  updatedAt: Date
}
```

## 📦 Deployment Targets

```
GitHub Repository
├── Backend → Render.com
├── Frontend → Vercel
└── Admin → Vercel

MongoDB Atlas (Cloud Database)
```

---

**Project created with modern development practices and best defaults.**
