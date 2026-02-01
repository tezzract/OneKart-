import java.util.*;
import javax.swing.SwingUtilities;

public class AppState {
    private List<CartItem> cart;
    private String selectedCategory;
    private Set<String> selectedBrands;
    private int minPrice;
    private int maxPrice;
    private double minRating;
    private boolean isLoggedIn;
    private List<StateChangeListener> listeners;

    private static AppState instance;

    public interface StateChangeListener {
        void onStateChanged();
    }

    private AppState() {
        cart = new ArrayList<>();
        selectedCategory = "all";
        selectedBrands = new HashSet<>();
        minPrice = 0;
        maxPrice = 200000;
        minRating = 0;
        isLoggedIn = false;
        listeners = new ArrayList<>();
    }

    public static AppState getInstance() {
        if (instance == null) {
            instance = new AppState();
        }
        return instance;
    }

    public void addListener(StateChangeListener listener) {
        listeners.add(listener);
    }

    private void notifyListeners() {
        SwingUtilities.invokeLater(() -> {
            for (StateChangeListener listener : listeners) {
                listener.onStateChanged();
            }
        });
    }

    public void addToCart(Product product) {
        for (CartItem item : cart) {
            if (item.getProduct().getId() == product.getId()) {
                item.setQuantity(item.getQuantity() + 1);
                notifyListeners();
                return;
            }
        }
        cart.add(new CartItem(product, 1));
        notifyListeners();
    }

    public void removeFromCart(int productId) {
        cart.removeIf(item -> item.getProduct().getId() == productId);
        notifyListeners();
    }

    public void updateQuantity(int productId, int quantity) {
        for (CartItem item : cart) {
            if (item.getProduct().getId() == productId) {
                item.setQuantity(quantity);
                notifyListeners();
                return;
            }
        }
    }

    public void clearCart() {
        cart.clear();
        notifyListeners();
    }

    public int getCartCount() {
        return cart.stream().mapToInt(CartItem::getQuantity).sum();
    }

    public int getCartTotal() {
        return cart.stream().mapToInt(CartItem::getTotalPrice).sum();
    }

    public void setCategory(String category) {
        this.selectedCategory = category;
        notifyListeners();
    }

    public void toggleBrand(String brand) {
        if (selectedBrands.contains(brand)) {
            selectedBrands.remove(brand);
        } else {
            selectedBrands.add(brand);
        }
        notifyListeners();
    }

    public void setPriceRange(int min, int max) {
        this.minPrice = min;
        this.maxPrice = max;
        notifyListeners();
    }

    public void setMinRating(double rating) {
        this.minRating = rating;
        notifyListeners();
    }

    public void clearFilters() {
        selectedBrands.clear();
        minPrice = 0;
        maxPrice = 200000;
        minRating = 0;
        notifyListeners();
    }

    public void login() {
        isLoggedIn = true;
        notifyListeners();
    }

    public List<Product> getFilteredProducts() {
        List<Product> filtered = new ArrayList<>();
        for (Product product : DataStore.getProducts()) {
            if (!selectedCategory.equals("all") && !product.getCategory().equals(selectedCategory)) {
                continue;
            }
            if (product.getPrice() < minPrice || product.getPrice() > maxPrice) {
                continue;
            }
            if (!selectedBrands.isEmpty() && !selectedBrands.contains(product.getBrand())) {
                continue;
            }
            if (product.getRating() < minRating) {
                continue;
            }
            filtered.add(product);
        }
        return filtered;
    }

    // Getters
    public List<CartItem> getCart() { return new ArrayList<>(cart); }
    public String getSelectedCategory() { return selectedCategory; }
    public Set<String> getSelectedBrands() { return new HashSet<>(selectedBrands); }
    public int getMinPrice() { return minPrice; }
    public int getMaxPrice() { return maxPrice; }
    public double getMinRating() { return minRating; }
    public boolean isLoggedIn() { return isLoggedIn; }
}
