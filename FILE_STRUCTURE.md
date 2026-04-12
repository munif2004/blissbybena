# BlissByBena - Complete File Structure

## 📁 Full Directory Tree

```
blissbybena/
│
├── README.md                              # Main project documentation
├── SETUP_GUIDE.md                         # Step-by-step setup instructions
├── GETTING_STARTED.md                     # Quick start guide
├── API_DOCUMENTATION.md                   # Complete API reference
├── DEPLOYMENT_GUIDE.md                    # Production deployment guide
├── PROJECT_STRUCTURE.md                   # Detailed file organization
│
│
├── 📂 backend/                            # Node.js + Express API
│   │
│   ├── 📄 server.js                       # Main server entry point
│   ├── 📄 package.json                    # Backend dependencies
│   ├── 📄 .env.example                    # Example environment file
│   ├── 📄 .gitignore                      # Git ignore rules
│   │
│   ├── 📂 config/
│   │   └── 📄 db.js                       # MongoDB connection setup
│   │
│   ├── 📂 models/
│   │   ├── 📄 Product.js                  # Product schema & validations
│   │   ├── 📄 Order.js                    # Order schema & methods
│   │   └── 📄 Admin.js                    # Admin user schema
│   │
│   ├── 📂 controllers/
│   │   ├── 📄 productController.js        # Product CRUD operations
│   │   ├── 📄 orderController.js          # Order management logic
│   │   └── 📄 authController.js           # Authentication logic
│   │
│   ├── 📂 routes/
│   │   ├── 📄 products.js                 # Product routes
│   │   ├── 📄 orders.js                   # Order routes
│   │   └── 📄 auth.js                     # Auth routes
│   │
│   └── 📂 middleware/
│       ├── 📄 auth.js                     # JWT token verification
│       └── 📄 errorHandler.js             # Error handling middleware
│
│
├── 📂 frontend/                           # React + Tailwind CSS (Customer)
│   │
│   ├── 📄 package.json                    # Frontend dependencies
│   ├── 📄 .env.example                    # Example environment file
│   ├── 📄 .gitignore                      # Git ignore rules
│   ├── 📄 vite.config.js                  # Vite bundler config
│   ├── 📄 tailwind.config.js              # Tailwind CSS setup
│   ├── 📄 postcss.config.js               # PostCSS plugins
│   ├── 📄 index.html                      # HTML template
│   │
│   ├── 📂 public/                         # Static assets
│   │   └── (Add images here)
│   │
│   └── 📂 src/
│       │
│       ├── 📄 App.jsx                     # Main app component
│       ├── 📄 main.jsx                    # React DOM entry point
│       ├── 📄 index.css                   # Global styles + Tailwind
│       │
│       ├── 📂 components/
│       │   ├── 📄 Navbar.jsx              # Navigation bar component
│       │   ├── 📄 Footer.jsx              # Footer component
│       │   ├── 📄 Toast.jsx               # Toast notification system
│       │   ├── 📄 LoadingSpinner.jsx      # Loading spinner component
│       │   └── 📄 ProductCard.jsx         # Reusable product card
│       │
│       ├── 📂 pages/
│       │   ├── 📄 Home.jsx                # Homepage with hero section
│       │   ├── 📄 Shop.jsx                # Shop with filters
│       │   ├── 📄 ProductDetail.jsx       # Single product page
│       │   ├── 📄 Cart.jsx                # Shopping cart page
│       │   ├── 📄 About.jsx               # About page
│       │   └── 📄 Contact.jsx             # Contact page
│       │
│       └── 📂 utils/
│           ├── 📄 api.js                  # Axios API service
│           └── 📄 helpers.js              # Helper functions
│
│
└── 📂 admin/                              # React + Tailwind CSS (Admin)
    │
    ├── 📄 package.json                    # Admin dependencies
    ├── 📄 .env.example                    # Example environment file
    ├── 📄 .gitignore                      # Git ignore rules
    ├── 📄 vite.config.js                  # Vite bundler config
    ├── 📄 tailwind.config.js              # Tailwind CSS setup
    ├── 📄 postcss.config.js               # PostCSS plugins
    ├── 📄 index.html                      # HTML template
    │
    ├── 📂 public/                         # Static assets
    │   └── (Add images here)
    │
    └── 📂 src/
        │
        ├── 📄 App.jsx                     # Main admin app
        ├── 📄 main.jsx                    # React DOM entry point
        ├── 📄 index.css                   # Global styles + Tailwind
        │
        ├── 📂 components/
        │   ├── 📄 Sidebar.jsx             # Admin sidebar navigation
        │   ├── 📄 Toast.jsx               # Toast notifications
        │   └── 📄 LoadingSpinner.jsx      # Loading spinner
        │
        ├── 📂 pages/
        │   ├── 📄 Login.jsx               # Login/Register page
        │   ├── 📄 Dashboard.jsx           # Admin dashboard
        │   ├── 📄 ProductsList.jsx        # Products list view
        │   ├── 📄 ProductForm.jsx         # Add/Edit product form
        │   └── 📄 OrdersList.jsx          # Orders management
        │
        └── 📂 utils/
            ├── 📄 api.js                  # Axios API service
            └── 📄 helpers.js              # Helper functions
```

---

## 📊 File Count Summary

### Backend
- **Total Files**: 16
- **Config Files**: 3 (.env.example, package.json, .gitignore)
- **Code Files**: 13

### Frontend
- **Total Files**: 32
- **Config Files**: 6 (vite, tailwind, postcss, env, .gitignore, package.json)
- **Code Files**: 18 (1 App.jsx, 1 main.jsx, 1 index.css, 5 components, 6 pages, 2 utils)
- **Static Files**: 1 (index.html)
- **Asset Folders**: 1 (public)

### Admin
- **Total Files**: 28
- **Config Files**: 6 (vite, tailwind, postcss, env, .gitignore, package.json)
- **Code Files**: 15 (1 App.jsx, 1 main.jsx, 1 index.css, 3 components, 5 pages, 2 utils)
- **Static Files**: 1 (index.html)
- **Asset Folders**: 1 (public)

### Documentation
- **Total Files**: 6 (README, SETUP, GETTING_STARTED, API, DEPLOYMENT, PROJECT_STRUCTURE)

**Total Files: 76+**
**Total Lines of Code: ~8,500**

---

## 🎯 Key Files to Know

### Critical Files
1. `backend/server.js` - Starts the API server
2. `frontend/src/App.jsx` - Main React app
3. `admin/src/App.jsx` - Main admin app
4. `backend/config/db.js` - Database connection

### Configuration Files
1. `.env` - Environment variables (create from .env.example)
2. `package.json` - Dependencies (all 3 apps)
3. `tailwind.config.js` - Design tokens
4. `vite.config.js` - Build configuration

### Component Files
1. Frontend components are reusable UI pieces
2. Admin components manage data
3. Pages combine components into full views

### Utility Files
1. `api.js` - API requests with Axios
2. `helpers.js` - Helper functions

---

## 🔄 File Dependencies

```
App.jsx (Frontend)
├── components/
│   ├── Navbar (uses useNavigate)
│   ├── Footer
│   ├── Toast
│   └── ProductCard (uses api.js, helpers.js)
│
├── pages/
│   ├── Home (uses api.js)
│   ├── Shop (uses api.js)
│   ├── ProductDetail (uses api.js, helpers.js)
│   ├── Cart (uses helpers.js, api.js)
│   ├── About
│   └── Contact
│
└── utils/
    ├── api.js (uses axios)
    └── helpers.js

App.jsx (Admin)
├── components/
│   ├── Sidebar
│   └── Toast
│
├── pages/
│   ├── Login (uses authAPI)
│   ├── Dashboard (uses productsAPI, ordersAPI)
│   ├── ProductsList (uses productsAPI)
│   ├── ProductForm (uses productsAPI)
│   └── OrdersList (uses ordersAPI)
│
└── utils/
    ├── api.js (uses axios)
    └── helpers.js
```

---

## 🚀 Startup Order

To start the full application:

1. **Terminal 1 - Backend**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   Backend ready at: http://localhost:5000

2. **Terminal 2 - Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend ready at: http://localhost:3000

3. **Terminal 3 - Admin**
   ```bash
   cd admin
   npm install
   npm run dev
   ```
   Admin ready at: http://localhost:3001

---

## 📝 File Naming Conventions

### Components (React)
- **PascalCase**: `ProductCard.jsx`, `Navbar.jsx`
- **Purpose**: Reusable UI pieces
- **Location**: `src/components/`

### Pages (React)
- **PascalCase**: `Home.jsx`, `ProductDetail.jsx`
- **Purpose**: Full page views
- **Location**: `src/pages/`

### Controllers (Backend)
- **camelCase**: `productController.js`
- **Format**: controllerName.js
- **Contains**: Business logic

### Routes (Backend)
- **camelCase**: `products.js`, `orders.js`
- **Contains**: Endpoint definitions

### Models (Backend)
- **PascalCase**: `Product.js`, `Order.js`
- **Purpose**: Database schemas
- **Contains**: Schema & methods

### Utilities
- **camelCase**: `api.js`, `helpers.js`
- **Purpose**: Shared functions
- **Reusable**: Across multiple files

---

## 🎨 Asset Directory

### Images Location
```
frontend/public/              # Frontend images
admin/public/                 # Admin images
```

### How to Add Images
1. Place image files in `public/` folder
2. Reference in code: `/image-name.jpg`
3. Or use external URLs

---

## 📦 Dependencies Quick Reference

### Backend
- **express**: Web framework
- **mongoose**: MongoDB ORM
- **jsonwebtoken**: JWT authentication
- **bcryptjs**: Password hashing
- **dotenv**: Environment variables
- **cors**: Cross-origin handling

### Frontend
- **react**: UI library
- **react-router-dom**: Routing
- **axios**: HTTP client
- **tailwindcss**: Styling
- **lucide-react**: Icons

### Admin
- **react**: UI library  
- **react-router-dom**: Routing
- **axios**: HTTP client
- **tailwindcss**: Styling
- **lucide-react**: Icons

---

## 🔍 Finding Things

### To find a component
```bash
# Search in frontend/src/components/
ls frontend/src/components/
```

### To find a page
```bash
# Search in frontend/src/pages/ or admin/src/pages/
ls frontend/src/pages/
```

### To find an API endpoint
```bash
# Check backend/routes/
ls backend/routes/
```

### To find database logic
```bash
# Check backend/models/
ls backend/models/
```

---

## ✏️ Editing Files

### To customize colors
Edit: `frontend/tailwind.config.js` and `admin/tailwind.config.js`

### To add new API endpoints
Edit: `backend/routes/` and `backend/controllers/`

### To add new pages
Create: `frontend/src/pages/NewPage.jsx`

### To add new products
Use: Admin dashboard UI at `/admin`

---

## 🎯 Common Tasks

### Add a new product
1. Visit http://localhost:3001 (Admin)
2. Go to Products
3. Click "Add Product"
4. Fill form and submit

### Create new component
1. Create `src/components/MyComponent.jsx`
2. Import in needed files
3. Use with props

### Add new API endpoint
1. Create route in `backend/routes/`
2. Create controller logic
3. Update frontend API service

### Deploy to production
1. See `DEPLOYMENT_GUIDE.md`
2. Push to GitHub
3. Deploy to Render/Vercel

---

## 📚 Documentation Links

- **Setup**: See `SETUP_GUIDE.md`
- **API**: See `API_DOCUMENTATION.md`
- **Deployment**: See `DEPLOYMENT_GUIDE.md`
- **Structure**: See `PROJECT_STRUCTURE.md`
- **Overview**: See `README.md`

---

**Everything is organized, documented, and ready to use!** 🎉
