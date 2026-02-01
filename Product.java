import java.util.List;

public class Product {
    private int id;
    private String name;
    private String brand;
    private String category;
    private int price;
    private int originalPrice;
    private double rating;
    private int reviews;
    private String imageUrl;
    private boolean inStock;
    private int discount;
    private List<String> features;

    public Product(int id, String name, String brand, String category, int price, 
                   int originalPrice, double rating, int reviews, String imageUrl, 
                   boolean inStock, int discount, List<String> features) {
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.category = category;
        this.price = price;
        this.originalPrice = originalPrice;
        this.rating = rating;
        this.reviews = reviews;
        this.imageUrl = imageUrl;
        this.inStock = inStock;
        this.discount = discount;
        this.features = features;
    }

    // Getters
    public int getId() { return id; }
    public String getName() { return name; }
    public String getBrand() { return brand; }
    public String getCategory() { return category; }
    public int getPrice() { return price; }
    public int getOriginalPrice() { return originalPrice; }
    public double getRating() { return rating; }
    public int getReviews() { return reviews; }
    public String getImageUrl() { return imageUrl; }
    public boolean isInStock() { return inStock; }
    public int getDiscount() { return discount; }
    public List<String> getFeatures() { return features; }
}
