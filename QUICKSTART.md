# OneKart - Quick Start Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Ensure Java is Installed
You need Java JDK 8 or higher installed on your system.

**Check if Java is installed:**
```bash
java -version
javac -version
```

**If not installed:**
- **Windows/Mac**: Download from [Oracle](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://adoptium.net/)
- **Linux**: 
  ```bash
  sudo apt-get update
  sudo apt-get install default-jdk
  ```

### Step 2: Compile the Application

**Linux/Mac:**
```bash
chmod +x run.sh
./run.sh
```

**Windows:**
```cmd
run.bat
```

**Or manually:**
```bash
javac *.java
java OneKartApp
```

### Step 3: Start Shopping!

The application window will open. You can now:
- ✅ Browse products by category
- ✅ Filter by price, brand, and rating
- ✅ Add items to cart
- ✅ Manage your shopping cart
- ✅ Login (demo mode)

## 🎯 Key Features at a Glance

| Feature | Description |
|---------|-------------|
| **Categories** | 9 categories: Mobiles, Fashion, Electronics, Home, Appliances, Beauty & Toys, Grocery, Trending |
| **Products** | 12 sample products with real pricing and features |
| **Filters** | Price range, Brand selection, Rating filter |
| **Cart** | Full cart management with quantity controls |
| **UI** | Modern, responsive design with hover effects |

## 💡 Tips

1. **Category Selection**: Click any category icon in the top ribbon to filter products
2. **Multiple Filters**: You can combine price, brand, and rating filters
3. **Cart Badge**: The cart icon shows the number of items in your cart
4. **Clear Filters**: Use the "Clear All" button to reset all filters
5. **Login**: Click login in the header (demo mode - accepts any credentials)

## 🎨 What You'll See

```
┌──────────────────────────────────────────────────────────────┐
│  🛍️ OneKart          [Search Bar]      👤 Login  🛒 Cart    │
├──────────────────────────────────────────────────────────────┤
│  🛍️ All  📱 Mobiles  👕 Fashion  📺 Electronics  🏠 Home  ⚡ │
├──────────┬──────────────────────────────────────────────────┤
│ Filters  │  [Product Grid - 3 columns]                      │
│          │                                                   │
│ Price    │  ┌──────┐  ┌──────┐  ┌──────┐                   │
│ Range    │  │Product│  │Product│  │Product│                   │
│          │  │ Card  │  │ Card  │  │ Card  │                   │
│ Brands   │  └──────┘  └──────┘  └──────┘                   │
│          │                                                   │
│ Rating   │  ┌──────┐  ┌──────┐  ┌──────┐                   │
│          │  │Product│  │Product│  │Product│                   │
│          │  │ Card  │  │ Card  │  │ Card  │                   │
└──────────┴──────────────────────────────────────────────────┘
```

## ❓ Troubleshooting

**Problem**: `javac: command not found`
- **Solution**: Install Java JDK (see Step 1)

**Problem**: Application doesn't start
- **Solution**: Make sure you're running `java OneKartApp` after compilation

**Problem**: Window too large for screen
- **Solution**: The app is 1400x900. Resize the window after it opens

## 📚 Next Steps

After running the app, explore:
1. The comprehensive **README.md** for full documentation
2. Source code comments for implementation details
3. Customization options to add your own products

---

**Ready to code?** Open any `.java` file to see clean, well-documented Java code!

**Need help?** Check the main README.md file for detailed documentation.
