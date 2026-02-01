import java.awt.Color;
import java.util.*;

public class DataStore {
    private static List<Category> categories;
    private static List<Product> products;
    private static List<String> brands;

    static {
        initializeCategories();
        initializeProducts();
        initializeBrands();
    }

    private static void initializeCategories() {
        categories = Arrays.asList(
            new Category("all", "All", "🛍️", new Color(76, 177, 193)),
            new Category("mobiles", "Mobiles", "📱", new Color(255, 107, 107)),
            new Category("fashion", "Fashion", "👕", new Color(78, 205, 196)),
            new Category("electronics", "Electronics", "📺", new Color(149, 225, 211)),
            new Category("home", "Home", "🏠", new Color(243, 129, 129)),
            new Category("appliances", "Appliances", "⚡", new Color(170, 150, 218)),
            new Category("beauty", "Beauty & Toys", "✨", new Color(252, 186, 211)),
            new Category("grocery", "Grocery", "🛒", new Color(168, 216, 234)),
            new Category("trending", "Trending", "📈", new Color(255, 217, 61))
        );
    }

    private static void initializeProducts() {
        products = Arrays.asList(
            new Product(1, "iPhone 15 Pro Max", "Apple", "mobiles", 159900, 179900, 4.6, 12453,
                "https://images.unsplash.com/photo-1696446702514-c8f8dd2ff527?w=400&h=400&fit=crop",
                true, 11, Arrays.asList("256GB Storage", "A17 Pro Chip", "Titanium Design")),
            
            new Product(2, "Samsung Galaxy S24 Ultra", "Samsung", "mobiles", 129999, 149999, 4.5, 8932,
                "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop",
                true, 13, Arrays.asList("512GB Storage", "S Pen Included", "AI Features")),
            
            new Product(3, "OnePlus 12", "OnePlus", "mobiles", 64999, 69999, 4.4, 5621,
                "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
                true, 7, Arrays.asList("256GB Storage", "Snapdragon 8 Gen 3", "100W Charging")),
            
            new Product(4, "Sony WH-1000XM5", "Sony", "electronics", 29990, 34990, 4.7, 15234,
                "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop",
                true, 14, Arrays.asList("Industry-leading ANC", "30hr Battery", "Premium Sound")),
            
            new Product(5, "Levi's Men's Jeans", "Levi's", "fashion", 2499, 3999, 4.3, 8745,
                "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
                true, 38, Arrays.asList("Slim Fit", "100% Cotton", "Classic Blue")),
            
            new Product(6, "Nike Air Max 270", "Nike", "fashion", 12995, 16995, 4.5, 6234,
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
                true, 24, Arrays.asList("Air Cushioning", "Mesh Upper", "Lightweight")),
            
            new Product(7, "LG 55\" 4K OLED TV", "LG", "electronics", 89990, 119990, 4.6, 3421,
                "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=400&fit=crop",
                true, 25, Arrays.asList("OLED Display", "Dolby Vision", "Smart TV")),
            
            new Product(8, "Dyson V15 Vacuum", "Dyson", "appliances", 52900, 64900, 4.8, 2156,
                "https://images.unsplash.com/photo-1558317374-067fb86dc52d?w=400&h=400&fit=crop",
                true, 18, Arrays.asList("Laser Detection", "HEPA Filter", "60min Runtime")),
            
            new Product(9, "Wooden Coffee Table", "Urban Ladder", "home", 8999, 14999, 4.2, 1843,
                "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400&h=400&fit=crop",
                true, 40, Arrays.asList("Solid Wood", "Storage Shelf", "Modern Design")),
            
            new Product(10, "Lakme Makeup Kit", "Lakme", "beauty", 1499, 2499, 4.1, 9876,
                "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
                true, 40, Arrays.asList("Complete Kit", "Long Lasting", "Dermatologist Tested")),
            
            new Product(11, "Organic Grocery Combo", "Nature's Best", "grocery", 899, 1299, 4.4, 5432,
                "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
                true, 31, Arrays.asList("100% Organic", "Chemical Free", "Farm Fresh")),
            
            new Product(12, "MacBook Pro M3", "Apple", "electronics", 199900, 219900, 4.9, 4521,
                "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
                true, 9, Arrays.asList("M3 Pro Chip", "16GB RAM", "512GB SSD"))
        );
    }

    private static void initializeBrands() {
        brands = Arrays.asList("Apple", "Samsung", "OnePlus", "Sony", "Levi's", 
                               "Nike", "LG", "Dyson", "Urban Ladder", "Lakme", "Nature's Best");
    }

    public static List<Category> getCategories() {
        return new ArrayList<>(categories);
    }

    public static List<Product> getProducts() {
        return new ArrayList<>(products);
    }

    public static List<String> getBrands() {
        return new ArrayList<>(brands);
    }

    public static Category getCategoryById(String id) {
        for (Category category : categories) {
            if (category.getId().equals(id)) {
                return category;
            }
        }
        return categories.get(0); // Return "All" by default
    }
}
