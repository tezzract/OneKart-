#   OneKart





```
OneKart-/
├── backend/          # Node.js Express API server
│   ├── server.js     # Main server entry point
│   ├── routes/       # API route handlers
│   │   ├── products.js  # Product endpoints
│   │   ├── cart.js      # Cart endpoints
│   │   └── auth.js      # Authentication endpoints
│   └── middleware/
│       └── auth.js      # JWT authentication middleware
├── frontend/         # Static HTML/CSS/JS frontend
│   ├── index.html    # Home page
│   ├── product.html  # Product detail page
│   ├── cart.html     # Shopping cart
│   ├── login.html    # Login & signup
│   ├── css/styles.css # Amazon-like styling
│   └── js/           # Page-specific JavaScript
├── dataset/          # JSON data files
│   ├── products.json # 24 products across 6 categories
│   ├── categories.json # Product categories
│   └── users.json    # Sample user accounts
└── README.md
```

## Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)

### Setup & Run

```bash
# 1. Navigate to the project
cd amazon-clone

# 2. Install backend dependencies
cd backend
npm install

# 3. Start the server
npm start
```

Then open **http://localhost:3000** in your browser.

## Features

- **Home Page** - Hero banner, category grid, product cards with ratings & prices
- **Product Detail** - Full product view with buy box, quantity selector, add-to-cart
- **Shopping Cart** - Add/remove items, update quantities, order summary
- **Search & Filter** - Search by keyword, filter by category
- **Authentication** - Sign up and sign in with JWT tokens
- **Responsive** - Mobile-friendly design

## API Endpoints

### Products
- `GET /api/products` - Get all products (query params: `search`, `category`, `sort`, `minPrice`, `maxPrice`)
- `GET /api/products/:id` - Get single product
- `GET /api/products/meta/categories` - Get all categories

### Auth
- `POST /api/auth/signup` - Create account (`{ name, email, password }`)
- `POST /api/auth/login` - Login (`{ email, password }`)

### Cart (requires JWT token)
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item (`{ productId, quantity }`)
- `PUT /api/cart/:productId` - Update quantity (`{ quantity }`)
- `DELETE /api/cart/:productId` - Remove item

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Auth**: JWT (JSON Web Tokens), bcryptjs
- **Data**: JSON files (no database required)

## Notes

- This is an educational/demo project
- Cart works with localStorage (no login required to use cart)
- Server-side cart sync available when logged in via API
- Placeholder images are used via placeholder.com
