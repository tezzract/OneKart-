import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import javax.swing.border.*;

public class ProductCard extends JPanel {
    private Product product;
    private static final Color CARD_BG = new Color(255, 255, 255);
    private static final Color BORDER_COLOR = new Color(230, 230, 230);
    private static final Color DISCOUNT_BG = new Color(255, 107, 107);
    private static final Color PRICE_COLOR = new Color(33, 33, 33);
    private static final Color ORIGINAL_PRICE_COLOR = new Color(150, 150, 150);
    private static final Color RATING_BG = new Color(76, 175, 80);
    private static final Color BUTTON_BG = new Color(255, 159, 10);
    private static final Color BUTTON_HOVER = new Color(255, 143, 0);

    public ProductCard(Product product) {
        this.product = product;
        setLayout(new BorderLayout());
        setBackground(CARD_BG);
        setBorder(new CompoundBorder(
            new LineBorder(BORDER_COLOR, 1, true),
            new EmptyBorder(10, 10, 10, 10)
        ));
        setPreferredSize(new Dimension(280, 420));
        setCursor(new Cursor(Cursor.HAND_CURSOR));

        // Add hover effect
        addMouseListener(new MouseAdapter() {
            @Override
            public void mouseEntered(MouseEvent e) {
                setBorder(new CompoundBorder(
                    new LineBorder(new Color(255, 159, 10), 2, true),
                    new EmptyBorder(9, 9, 9, 9)
                ));
            }

            @Override
            public void mouseExited(MouseEvent e) {
                setBorder(new CompoundBorder(
                    new LineBorder(BORDER_COLOR, 1, true),
                    new EmptyBorder(10, 10, 10, 10)
                ));
            }
        });

        // Image container
        JPanel imagePanel = new JPanel(new BorderLayout());
        imagePanel.setBackground(new Color(245, 245, 245));
        imagePanel.setPreferredSize(new Dimension(260, 200));
        
        JLabel imageLabel = new JLabel("📷", SwingConstants.CENTER);
        imageLabel.setFont(new Font("Segoe UI Emoji", Font.PLAIN, 48));
        imagePanel.add(imageLabel, BorderLayout.CENTER);

        // Discount badge
        if (product.getDiscount() > 0) {
            JLabel discountLabel = new JLabel(product.getDiscount() + "% OFF");
            discountLabel.setFont(new Font("Segoe UI", Font.BOLD, 11));
            discountLabel.setForeground(Color.WHITE);
            discountLabel.setBackground(DISCOUNT_BG);
            discountLabel.setOpaque(true);
            discountLabel.setBorder(new EmptyBorder(4, 8, 4, 8));
            
            JPanel badgePanel = new JPanel(new FlowLayout(FlowLayout.LEFT, 8, 8));
            badgePanel.setOpaque(false);
            badgePanel.add(discountLabel);
            imagePanel.add(badgePanel, BorderLayout.NORTH);
        }

        add(imagePanel, BorderLayout.NORTH);

        // Info panel
        JPanel infoPanel = new JPanel();
        infoPanel.setLayout(new BoxLayout(infoPanel, BoxLayout.Y_AXIS));
        infoPanel.setBackground(CARD_BG);
        infoPanel.setBorder(new EmptyBorder(12, 0, 0, 0));

        // Brand
        JLabel brandLabel = new JLabel(product.getBrand());
        brandLabel.setFont(new Font("Segoe UI", Font.PLAIN, 11));
        brandLabel.setForeground(new Color(120, 120, 120));
        brandLabel.setAlignmentX(Component.LEFT_ALIGNMENT);

        // Product name
        JLabel nameLabel = new JLabel("<html>" + truncate(product.getName(), 40) + "</html>");
        nameLabel.setFont(new Font("Segoe UI", Font.BOLD, 14));
        nameLabel.setForeground(PRICE_COLOR);
        nameLabel.setAlignmentX(Component.LEFT_ALIGNMENT);

        // Rating panel
        JPanel ratingPanel = new JPanel(new FlowLayout(FlowLayout.LEFT, 5, 0));
        ratingPanel.setBackground(CARD_BG);
        ratingPanel.setAlignmentX(Component.LEFT_ALIGNMENT);

        JLabel ratingBadge = new JLabel("  " + FormatUtils.formatRating(product.getRating()) + " ★  ");
        ratingBadge.setFont(new Font("Segoe UI", Font.BOLD, 11));
        ratingBadge.setForeground(Color.WHITE);
        ratingBadge.setBackground(RATING_BG);
        ratingBadge.setOpaque(true);

        JLabel reviewsLabel = new JLabel("(" + FormatUtils.formatNumber(product.getReviews()) + ")");
        reviewsLabel.setFont(new Font("Segoe UI", Font.PLAIN, 11));
        reviewsLabel.setForeground(new Color(120, 120, 120));

        ratingPanel.add(ratingBadge);
        ratingPanel.add(reviewsLabel);

        // Price panel
        JPanel pricePanel = new JPanel(new FlowLayout(FlowLayout.LEFT, 8, 0));
        pricePanel.setBackground(CARD_BG);
        pricePanel.setAlignmentX(Component.LEFT_ALIGNMENT);

        JLabel currentPrice = new JLabel(FormatUtils.formatPrice(product.getPrice()));
        currentPrice.setFont(new Font("Segoe UI", Font.BOLD, 18));
        currentPrice.setForeground(PRICE_COLOR);

        JLabel originalPrice = new JLabel("<html><strike>" + FormatUtils.formatPrice(product.getOriginalPrice()) + "</strike></html>");
        originalPrice.setFont(new Font("Segoe UI", Font.PLAIN, 13));
        originalPrice.setForeground(ORIGINAL_PRICE_COLOR);

        pricePanel.add(currentPrice);
        pricePanel.add(originalPrice);

        // Features
        JPanel featuresPanel = new JPanel();
        featuresPanel.setLayout(new BoxLayout(featuresPanel, BoxLayout.Y_AXIS));
        featuresPanel.setBackground(CARD_BG);
        featuresPanel.setAlignmentX(Component.LEFT_ALIGNMENT);
        featuresPanel.setBorder(new EmptyBorder(5, 0, 5, 0));

        for (int i = 0; i < Math.min(2, product.getFeatures().size()); i++) {
            JLabel feature = new JLabel("• " + product.getFeatures().get(i));
            feature.setFont(new Font("Segoe UI", Font.PLAIN, 11));
            feature.setForeground(new Color(100, 100, 100));
            feature.setAlignmentX(Component.LEFT_ALIGNMENT);
            featuresPanel.add(feature);
        }

        // Add to cart button
        JButton addButton = new JButton(product.isInStock() ? "Add to Cart" : "Out of Stock");
        addButton.setFont(new Font("Segoe UI", Font.BOLD, 13));
        addButton.setForeground(Color.WHITE);
        addButton.setBackground(product.isInStock() ? BUTTON_BG : new Color(180, 180, 180));
        addButton.setFocusPainted(false);
        addButton.setBorderPainted(false);
        addButton.setAlignmentX(Component.LEFT_ALIGNMENT);
        addButton.setCursor(new Cursor(Cursor.HAND_CURSOR));
        addButton.setEnabled(product.isInStock());

        if (product.isInStock()) {
            addButton.addMouseListener(new MouseAdapter() {
                @Override
                public void mouseEntered(MouseEvent e) {
                    addButton.setBackground(BUTTON_HOVER);
                }

                @Override
                public void mouseExited(MouseEvent e) {
                    addButton.setBackground(BUTTON_BG);
                }
            });

            addButton.addActionListener(e -> {
                AppState.getInstance().addToCart(product);
                JOptionPane.showMessageDialog(ProductCard.this, 
                    product.getName() + " added to cart!", 
                    "Success", 
                    JOptionPane.INFORMATION_MESSAGE);
            });
        }

        infoPanel.add(brandLabel);
        infoPanel.add(Box.createVerticalStrut(3));
        infoPanel.add(nameLabel);
        infoPanel.add(Box.createVerticalStrut(8));
        infoPanel.add(ratingPanel);
        infoPanel.add(Box.createVerticalStrut(8));
        infoPanel.add(pricePanel);
        infoPanel.add(Box.createVerticalStrut(5));
        infoPanel.add(featuresPanel);
        infoPanel.add(Box.createVerticalStrut(8));
        infoPanel.add(addButton);

        add(infoPanel, BorderLayout.CENTER);
    }

    private String truncate(String text, int maxLength) {
        if (text.length() <= maxLength) return text;
        return text.substring(0, maxLength) + "...";
    }
}
