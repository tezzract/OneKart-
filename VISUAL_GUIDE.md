# OneKart - Visual Guide

## Application Screenshots Description

Since this is a Java Swing application, here's what you'll see when you run it:

## 🖼️ Main Application Window

### Header (Orange Background - #FF9F0A)
```
┌─────────────────────────────────────────────────────────────────────┐
│ 🛍️ OneKart     [Search for products, brands and more...]           │
│                                              👤 Login    🛒 Cart (2) │
└─────────────────────────────────────────────────────────────────────┘
```
- **Left**: Orange shopping cart emoji + "OneKart" in large white text
- **Center**: White search bar with placeholder text
- **Right**: Login and Cart buttons with notification badge

### Category Ribbon (White Background)
```
┌────────────────────────────────────────────────────────────────────┐
│  🛍️    📱    👕    📺    🏠    ⚡    ✨    🛒    📈               │
│  All  Mobiles Fashion Elec. Home Appl. Beauty Groc. Trend.        │
└────────────────────────────────────────────────────────────────────┘
```
- Each category is a rounded button with:
  - Large emoji icon at top
  - Category name below
  - Light gray background (selected items have category color)
  - Hover effect (darkens on mouse over)

### Main Content Area

#### Left Sidebar - Filters (280px wide, White)
```
┌──────────────────┐
│ Filters          │
│ Clear All        │
│                  │
│ Price Range      │
│ Min: [____]      │
│ Max: [____]      │
│ [Apply]          │
│                  │
│ Brands           │
│ ☐ Apple          │
│ ☐ Samsung        │
│ ☐ OnePlus        │
│ ☐ Sony           │
│ ... (more)       │
│                  │
│ Customer Rating  │
│ [4★ & above]     │
│ [3★ & above]     │
│ [2★ & above]     │
│ [1★ & above]     │
└──────────────────┘
```
- Clean white panel with sections
- Input fields for price range
- Checkboxes for brands
- Button-style rating filters

#### Center Area - Product Grid (Gray Background #F8F8F8)
```
┌─────────────────────────────────────────────────────────────┐
│ All Products                        Showing 12 products     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                │
│  │  📷      │  │  📷      │  │  📷      │                │
│  │ 11% OFF  │  │ 13% OFF  │  │  7% OFF  │                │
│  │          │  │          │  │          │                │
│  │ Apple    │  │ Samsung  │  │ OnePlus  │                │
│  │ iPhone..│  │ Galaxy..│  │ OnePlus.│                │
│  │ 4.6 ★    │  │ 4.5 ★    │  │ 4.4 ★    │                │
│  │ (12,453) │  │ (8,932)  │  │ (5,621)  │                │
│  │          │  │          │  │          │                │
│  │ ₹1,59,900│  │ ₹1,29,999│  │ ₹64,999  │                │
│  │ ₹1,79,900│  │ ₹1,49,999│  │ ₹69,999  │                │
│  │          │  │          │  │          │                │
│  │ • 256GB  │  │ • 512GB  │  │ • 256GB  │                │
│  │ • A17 Pro│  │ • S Pen  │  │ • Snap..│                │
│  │          │  │          │  │          │                │
│  │[Add Cart]│  │[Add Cart]│  │[Add Cart]│                │
│  └──────────┘  └──────────┘  └──────────┘                │
│                                                             │
│  (More product cards in grid layout...)                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## 🛒 Shopping Cart Dialog (500x600px)

```
┌──────────────────────────────────────┐
│ Shopping Cart                     ✕  │ ← Orange header
├──────────────────────────────────────┤
│                                      │
│ ┌────────────────────────────────┐  │
│ │ 📷  iPhone 15 Pro Max          │  │
│ │     Apple                      │  │
│ │     ₹1,59,900                  │  │
│ │     [−] 1 [+]              🗑  │  │
│ └────────────────────────────────┘  │
│                                      │
│ ┌────────────────────────────────┐  │
│ │ 📷  Samsung Galaxy S24 Ultra   │  │
│ │     Samsung                    │  │
│ │     ₹1,29,999                  │  │
│ │     [−] 1 [+]              🗑  │  │
│ └────────────────────────────────┘  │
│                                      │
├──────────────────────────────────────┤
│ Subtotal:              ₹2,89,899     │
│                                      │
│ Total:                 ₹2,89,899     │ ← Red/pink color
│                                      │
│      [Proceed to Checkout]           │ ← Green button
└──────────────────────────────────────┘
```

## 👤 Login Dialog (400x450px)

```
┌──────────────────────────────────────┐
│ Welcome to OneKart             ✕     │ ← Teal header
├──────────────────────────────────────┤
│                                      │
│ Sign in to your account              │
│                                      │
│ Email or Phone                       │
│ ┌──────────────────────────────────┐ │
│ │                                  │ │
│ └──────────────────────────────────┘ │
│                                      │
│ Password                             │
│ ┌──────────────────────────────────┐ │
│ │ ••••••••                         │ │
│ └──────────────────────────────────┘ │
│                                      │
│          [Login]                     │ ← Teal button
│                                      │
│        Forgot password?              │ ← Underlined link
│                                      │
│   Don't have an account? Sign up    │
│                                      │
└──────────────────────────────────────┘
```

## 🎨 Color Scheme

### Primary Colors
- **Orange** (#FF9F0A): Header, primary buttons, cart button
- **Teal** (#4CB1C1): Login elements, "All" category
- **Red/Pink** (#FF6B6B): Discount badges, prices, delete buttons
- **Green** (#4CAF50): Rating badges, checkout button

### Category Colors
- Mobiles: #FF6B6B (Red)
- Fashion: #4ECDC4 (Teal)
- Electronics: #95E1D3 (Light teal)
- Home: #F38181 (Pink)
- Appliances: #AA96DA (Purple)
- Beauty: #FCBAD3 (Light pink)
- Grocery: #A8D8EA (Light blue)
- Trending: #FFD93D (Yellow)

### Neutral Colors
- Background: #F8F8F8 (Light gray)
- Cards: #FFFFFF (White)
- Borders: #E6E6E6 (Light gray)
- Text Primary: #212121 (Dark gray)
- Text Secondary: #787878 (Medium gray)

## 📐 Layout Specifications

### Main Window
- Size: 1400 x 900 pixels
- Layout: BorderLayout

### Product Cards
- Size: 280 x 420 pixels
- Grid: 3 columns with 20px gaps
- Border: 1px solid light gray, rounded corners
- Hover: 2px orange border

### Header
- Height: ~70px
- Padding: 15px horizontal

### Category Ribbon
- Height: ~110px
- Buttons: 100 x 90px each
- Spacing: 15px between buttons

### Filter Sidebar
- Width: 280px
- Scrollable if content overflows

## 🖱️ Interactive Elements

### Hover Effects
1. **Product Cards**: Border changes from gray to orange (2px)
2. **Buttons**: Background darkens slightly
3. **Category Buttons**: Background lightens

### Click Feedback
1. **Add to Cart**: Shows success message dialog
2. **Cart Badge**: Updates count in real-time
3. **Filters**: Products re-filter immediately

### Animations
- Smooth color transitions on hover (would need CSS-like effects in Java)
- Dialog fade-in (modal appears)

## 📱 Responsive Behavior
- Window is resizable
- Product grid adjusts to window width
- Sidebar remains fixed width
- Products wrap to new rows as needed

## 🎯 Visual Hierarchy

1. **Most Prominent**: Header (orange, top of screen)
2. **Secondary**: Category ribbon (colorful icons)
3. **Content**: Product cards (white with clear borders)
4. **Tertiary**: Filters (subtle gray sidebar)

## ✨ Polish Details

- **Rounded Corners**: All buttons and cards
- **Shadows**: Subtle on product cards
- **Icons**: Emoji for visual appeal
- **Typography**: 
  - Headings: Segoe UI Bold
  - Body: Segoe UI Regular
  - Prices: Segoe UI Bold (larger)

## 🔍 Empty States

### No Products Found
```
        🔍
        
  No products found
  
  Try adjusting your filters
```

### Empty Cart
```
        🛒
        
   Your cart is empty
```

---

When you run the application, you'll see a modern, clean interface with vibrant colors,
clear typography, and intuitive layouts that make shopping easy and enjoyable!
