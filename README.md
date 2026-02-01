# OneKart E-Commerce Application

A modern, feature-rich e-commerce desktop application built with Java Swing.

## 🎯 Features

### Core Functionality
- **Product Catalog**: Browse 12 products across 9 categories (Mobiles, Fashion, Electronics, Home, Appliances, Beauty & Toys, Grocery, Trending)
- **Smart Filtering**: Filter by price range, brand, and customer ratings
- **Shopping Cart**: Add/remove items, adjust quantities, view totals
- **User Authentication**: Login system (demo mode)
- **Category Navigation**: Quick access to product categories via icon ribbon
- **Responsive Grid Layout**: Products displayed in a clean 3-column grid

### User Interface
- **Modern Design**: Clean, professional UI with vibrant colors
- **Product Cards**: Rich product information including:
  - Product images (placeholder icons)
  - Brand and name
  - Customer ratings and review counts
  - Original and discounted prices
  - Discount badges
  - Key features
  - Stock status
- **Interactive Elements**:
  - Hover effects on cards and buttons
  - Visual feedback on interactions
  - Modal dialogs for cart and login

### Technical Features
- **State Management**: Centralized AppState with observer pattern
- **Real-time Updates**: UI automatically updates when state changes
- **Data Models**: Structured Product, Category, and CartItem classes
- **Formatting Utilities**: Indian Rupee currency formatting
- **Extensible Architecture**: Easy to add new products and categories

## 📋 Product Catalog

The application includes 12 sample products:

**Mobiles:**
- iPhone 15 Pro Max (₹1,59,900)
- Samsung Galaxy S24 Ultra (₹1,29,999)
- OnePlus 12 (₹64,999)

**Electronics:**
- Sony WH-1000XM5 Headphones (₹29,990)
- LG 55" 4K OLED TV (₹89,990)
- MacBook Pro M3 (₹1,99,900)

**Fashion:**
- Levi's Men's Jeans (₹2,499)
- Nike Air Max 270 (₹12,995)

**Other Categories:**
- Dyson V15 Vacuum (₹52,900)
- Wooden Coffee Table (₹8,999)
- Lakme Makeup Kit (₹1,499)
- Organic Grocery Combo (₹899)

## 🚀 How to Run

### Prerequisites
- Java Development Kit (JDK) 8 or higher
- Terminal/Command Prompt

### Compilation and Execution

**Option 1: Using the provided script (Linux/Mac)**
```bash
./run.sh
```

**Option 2: Manual compilation**
```bash
# Compile all Java files
javac *.java

# Run the application
java OneKartApp
```

**Option 3: Windows**
```cmd
javac *.java
java OneKartApp
```

## 📁 Project Structure

```
OneKart/
├── OneKartApp.java          # Main application window
├── Product.java             # Product model
├── Category.java            # Category model
├── CartItem.java            # Shopping cart item model
├── AppState.java            # Application state manager
├── DataStore.java           # Product and category data
├── FormatUtils.java         # Number formatting utilities
├── ProductCard.java         # Product card UI component
├── CategoryPanel.java       # Category ribbon component
├── FilterPanel.java         # Sidebar filter component
├── ProductsPanel.java       # Products grid display
├── CartDialog.java          # Shopping cart modal
├── LoginDialog.java         # Login modal
├── run.sh                   # Run script
└── README.md               # This file
```

## 🎨 Architecture

### Design Patterns
- **Singleton**: AppState uses singleton pattern for centralized state
- **Observer**: State change notifications to update UI components
- **MVC**: Separation of data models, UI views, and control logic

### Key Components

**AppState**
- Manages shopping cart
- Handles product filtering
- Maintains user session
- Notifies listeners of state changes

**DataStore**
- Stores product catalog
- Provides category definitions
- Lists available brands

**UI Components**
- ProductCard: Individual product display
- CategoryPanel: Category navigation ribbon
- FilterPanel: Sidebar with filters
- ProductsPanel: Main product grid
- CartDialog: Shopping cart interface
- LoginDialog: User authentication

## 🎯 Usage Guide

### Browsing Products
1. **Select a Category**: Click any category in the top ribbon
2. **View Products**: Browse products in the main grid
3. **Apply Filters**: Use the left sidebar to:
   - Set price range (Min/Max)
   - Filter by brand (checkboxes)
   - Filter by rating (4★, 3★, 2★, 1★ and above)
4. **Clear Filters**: Click "Clear All" to reset filters

### Shopping
1. **Add to Cart**: Click "Add to Cart" on any product card
2. **View Cart**: Click the "🛒 Cart" button in the header
3. **Manage Cart**:
   - Adjust quantity with +/− buttons
   - Remove items with trash icon
   - View subtotal and total
4. **Checkout**: Click "Proceed to Checkout" (demo mode)

### User Account
1. Click "👤 Login" in the header
2. Enter any email and password (demo - not validated)
3. Click "Login" button

## 🎨 Customization

### Adding New Products
Edit `DataStore.java` and add to the `initializeProducts()` method:

```java
new Product(
    13,                          // ID
    "Product Name",              // Name
    "Brand",                     // Brand
    "category",                  // Category ID
    9999,                        // Price
    12999,                       // Original Price
    4.5,                         // Rating
    1000,                        // Reviews
    "image-url",                 // Image URL
    true,                        // In stock
    23,                          // Discount %
    Arrays.asList("Feature 1", "Feature 2")  // Features
)
```

### Adding New Categories
Edit `DataStore.java` in the `initializeCategories()` method:

```java
new Category(
    "id",                        // Category ID
    "Display Name",              // Name
    "🎯",                        // Icon (emoji)
    new Color(255, 107, 107)    // Color
)
```

### Styling
- Colors are defined as constants in each UI component class
- Modify `Color` objects to change the color scheme
- Fonts use "Segoe UI" - change in respective component classes

## 🔧 Technical Details

### State Management
The application uses a centralized state management system:
- All state changes go through `AppState`
- UI components register as listeners
- Automatic UI updates on state changes
- Thread-safe updates using `SwingUtilities.invokeLater()`

### Filtering Logic
Products are filtered by:
1. Selected category (all or specific)
2. Price range (min/max)
3. Selected brands (multiple selection)
4. Minimum rating threshold

### Cart Management
- Supports adding multiple quantities
- Automatic quantity updates
- Item removal
- Real-time total calculation
- Badge counter in header

## 🎓 Learning Objectives

This project demonstrates:
- Java Swing UI development
- Event-driven programming
- State management patterns
- Object-oriented design
- Layout managers (BorderLayout, BoxLayout, GridLayout, FlowLayout)
- Custom component creation
- Dialog and modal windows
- Observer pattern implementation

## 📝 License

This is a demo application for educational purposes.

## 🤝 Contributing

Feel free to fork this project and add:
- More products and categories
- Enhanced filtering (search, sorting)
- Product detail views
- Wishlist functionality
- Order history
- Database integration
- Payment gateway integration
- User registration

## 📞 Support

For questions or issues, please refer to the code comments and documentation within each Java file.

---

**Enjoy shopping with OneKart!** 🛍️
