# OneKart Application Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        OneKartApp (Main)                        │
│                    JFrame - Main Application                    │
└────────────┬────────────────────────────────────────────────────┘
             │
             ├─── Header Panel
             │    ├── Logo & Title
             │    ├── Search Bar
             │    └── Login & Cart Buttons
             │
             ├─── CategoryPanel (Category Ribbon)
             │    └── Category Buttons (All, Mobiles, Fashion, etc.)
             │
             └─── Content Area
                  ├── FilterPanel (Sidebar)
                  │   ├── Price Range Filter
                  │   ├── Brand Checkboxes
                  │   └── Rating Filters
                  │
                  └── ProductsPanel (Main Content)
                      ├── Header (Title & Count)
                      └── Product Grid
                          └── ProductCard (x12)
```

## Component Hierarchy

```
OneKartApp.java (Main Window)
│
├── CategoryPanel.java (Top Ribbon)
│   └── Creates category buttons from DataStore
│
├── FilterPanel.java (Left Sidebar)
│   ├── Price range inputs
│   ├── Brand checkboxes
│   └── Rating buttons
│
├── ProductsPanel.java (Center Area)
│   └── ProductCard.java (Individual Product)
│       ├── Image placeholder
│       ├── Product details
│       ├── Rating badge
│       ├── Price display
│       └── Add to Cart button
│
├── CartDialog.java (Modal)
│   ├── Cart items list
│   ├── Quantity controls
│   ├── Remove buttons
│   └── Checkout button
│
└── LoginDialog.java (Modal)
    ├── Email input
    ├── Password input
    └── Login button
```

## Data Flow

```
┌──────────────┐
│  DataStore   │  ← Static data repository
│  .java       │     • Products
│              │     • Categories
└──────┬───────┘     • Brands
       │
       ↓
┌──────────────┐
│  AppState    │  ← Singleton state manager
│  .java       │     • Shopping cart
│              │     • Selected category
└──────┬───────┘     • Filters
       │             • User session
       │
       ↓ (Observable)
┌──────────────────────────────────┐
│  UI Components (Observers)       │
│  • CategoryPanel                 │
│  • ProductsPanel                 │
│  • CartDialog                    │
│  • OneKartApp (header)          │
└──────────────────────────────────┘
```

## State Management Flow

```
User Action (Click/Input)
       ↓
UI Component Event Handler
       ↓
AppState Method Call
    • addToCart(product)
    • setCategory(categoryId)
    • setFilters(filters)
    • updateQuantity(id, qty)
       ↓
State Updated
       ↓
notifyListeners() called
       ↓
All registered UI components receive update
       ↓
Components re-render with new state
       ↓
User sees updated UI
```

## Class Relationships

```
┌─────────────┐
│   Product   │────────┐
└─────────────┘        │
                       ↓
┌─────────────┐   ┌─────────────┐
│  Category   │   │  CartItem   │
└─────────────┘   └─────────────┘
                       │
                       ↓
                  ┌─────────────┐
                  │  AppState   │←──── Singleton
                  └──────┬──────┘
                         │
                    Observable
                         │
        ┌────────────────┼────────────────┐
        ↓                ↓                ↓
  ┌──────────┐    ┌──────────┐    ┌──────────┐
  │ Category │    │ Products │    │   Cart   │
  │  Panel   │    │  Panel   │    │  Dialog  │
  └──────────┘    └──────────┘    └──────────┘
```

## Key Design Patterns

### 1. Singleton Pattern
```java
AppState.getInstance()
```
- Ensures single source of truth for application state
- Accessible from any component

### 2. Observer Pattern
```java
appState.addListener(this::updateUI);
appState.notify();
```
- Components register as listeners
- Automatic updates when state changes
- Decouples UI from state management

### 3. Model-View-Controller (MVC)
```
Model:      Product, Category, CartItem, AppState
View:       ProductCard, ProductsPanel, CartDialog, etc.
Controller: Event handlers in UI components
```

## Data Models

### Product
```
- id: int
- name: String
- brand: String
- category: String
- price: int
- originalPrice: int
- rating: double
- reviews: int
- imageUrl: String
- inStock: boolean
- discount: int
- features: List<String>
```

### Category
```
- id: String
- name: String
- icon: String (emoji)
- color: Color
```

### CartItem
```
- product: Product
- quantity: int
+ getTotalPrice(): int
```

### AppState
```
- cart: List<CartItem>
- selectedCategory: String
- selectedBrands: Set<String>
- priceRange: [int, int]
- minRating: double
- isLoggedIn: boolean
- listeners: List<StateChangeListener>
```

## UI Component Responsibilities

### OneKartApp
- Main application window
- Header with logo, search, login, cart
- Coordinates layout of all panels
- Updates cart badge

### CategoryPanel
- Displays category buttons
- Handles category selection
- Updates on state change

### FilterPanel
- Displays all filters
- Handles filter interactions
- Communicates with AppState

### ProductsPanel
- Displays filtered products
- Creates ProductCard for each product
- Shows "no products" state

### ProductCard
- Displays single product
- Hover effects
- Add to cart action

### CartDialog
- Shows cart contents
- Quantity controls
- Remove items
- Calculate totals
- Checkout action

### LoginDialog
- User credentials input
- Login action
- Form validation

## Threading Model

```
Main Thread (Event Dispatch Thread)
    │
    ├── UI Rendering
    ├── Event Handling
    │
    └── State Updates
        │
        └── SwingUtilities.invokeLater()
            └── Ensures thread-safe UI updates
```

## File Organization

```
OneKart/
│
├── Models (Data)
│   ├── Product.java
│   ├── Category.java
│   └── CartItem.java
│
├── State Management
│   ├── AppState.java
│   └── DataStore.java
│
├── UI Components
│   ├── OneKartApp.java (Main)
│   ├── ProductCard.java
│   ├── CategoryPanel.java
│   ├── FilterPanel.java
│   ├── ProductsPanel.java
│   ├── CartDialog.java
│   └── LoginDialog.java
│
└── Utilities
    └── FormatUtils.java
```

## Extension Points

To extend the application:

1. **Add Products**: Edit `DataStore.initializeProducts()`
2. **Add Categories**: Edit `DataStore.initializeCategories()`
3. **Add Filters**: Extend `FilterPanel` and `AppState.filters`
4. **Add Features**: Create new UI components that observe `AppState`
5. **Add Persistence**: Integrate database in `AppState` methods
6. **Add Search**: Implement in `ProductsPanel` filter logic

## Performance Considerations

- **Lazy Loading**: Products rendered only when visible
- **Efficient Re-rendering**: Only changed components update
- **Event Debouncing**: Could be added for search/filters
- **Image Caching**: Could be implemented for product images

## Security Notes (For Production)

Current implementation is a demo. For production:
- ❌ No password hashing
- ❌ No input validation
- ❌ No SQL injection protection
- ❌ No XSS protection
- ✅ State management architecture is solid
- ✅ UI/Logic separation is clean

## Testing Strategy

Suggested testing approach:
1. **Unit Tests**: Test AppState methods independently
2. **Integration Tests**: Test UI component interactions
3. **UI Tests**: Test visual rendering (manual)
4. **State Tests**: Test observer pattern notifications

---

This architecture provides a solid foundation for a production e-commerce application.
The clean separation of concerns makes it easy to extend and maintain.
