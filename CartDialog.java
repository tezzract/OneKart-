import javax.swing.*;
import java.awt.*;
import java.util.List;
import javax.swing.border.*;

public class CartDialog extends JDialog {
    private static final Color BG_COLOR = new Color(248, 248, 248);
    private static final Color HEADER_BG = new Color(255, 159, 10);
    private AppState appState;
    private JPanel itemsPanel;
    private JPanel summaryPanel;

    public CartDialog(Frame parent) {
        super(parent, "Shopping Cart", true);
        this.appState = AppState.getInstance();
        
        setSize(500, 600);
        setLocationRelativeTo(parent);
        setLayout(new BorderLayout());

        // Header
        JPanel headerPanel = new JPanel(new BorderLayout());
        headerPanel.setBackground(HEADER_BG);
        headerPanel.setBorder(new EmptyBorder(15, 20, 15, 20));

        JLabel titleLabel = new JLabel("Shopping Cart");
        titleLabel.setFont(new Font("Segoe UI", Font.BOLD, 20));
        titleLabel.setForeground(Color.WHITE);

        JButton closeBtn = new JButton("✕");
        closeBtn.setFont(new Font("Segoe UI", Font.BOLD, 18));
        closeBtn.setForeground(Color.WHITE);
        closeBtn.setContentAreaFilled(false);
        closeBtn.setBorderPainted(false);
        closeBtn.setFocusPainted(false);
        closeBtn.setCursor(new Cursor(Cursor.HAND_CURSOR));
        closeBtn.addActionListener(e -> dispose());

        headerPanel.add(titleLabel, BorderLayout.WEST);
        headerPanel.add(closeBtn, BorderLayout.EAST);

        add(headerPanel, BorderLayout.NORTH);

        // Items panel
        itemsPanel = new JPanel();
        itemsPanel.setLayout(new BoxLayout(itemsPanel, BoxLayout.Y_AXIS));
        itemsPanel.setBackground(BG_COLOR);
        itemsPanel.setBorder(new EmptyBorder(10, 10, 10, 10));

        JScrollPane scrollPane = new JScrollPane(itemsPanel);
        scrollPane.setBorder(null);
        scrollPane.getVerticalScrollBar().setUnitIncrement(16);
        add(scrollPane, BorderLayout.CENTER);

        // Summary panel
        summaryPanel = createSummaryPanel();
        add(summaryPanel, BorderLayout.SOUTH);

        renderCart();
        appState.addListener(this::renderCart);
    }

    private JPanel createSummaryPanel() {
        JPanel panel = new JPanel();
        panel.setLayout(new BoxLayout(panel, BoxLayout.Y_AXIS));
        panel.setBackground(Color.WHITE);
        panel.setBorder(new CompoundBorder(
            new MatteBorder(1, 0, 0, 0, new Color(230, 230, 230)),
            new EmptyBorder(15, 20, 15, 20)
        ));

        JPanel subtotalPanel = new JPanel(new BorderLayout());
        subtotalPanel.setBackground(Color.WHITE);
        JLabel subtotalLabel = new JLabel("Subtotal:");
        subtotalLabel.setFont(new Font("Segoe UI", Font.PLAIN, 14));
        JLabel subtotalAmount = new JLabel("₹0");
        subtotalAmount.setFont(new Font("Segoe UI", Font.BOLD, 14));
        subtotalPanel.add(subtotalLabel, BorderLayout.WEST);
        subtotalPanel.add(subtotalAmount, BorderLayout.EAST);

        JPanel totalPanel = new JPanel(new BorderLayout());
        totalPanel.setBackground(Color.WHITE);
        JLabel totalLabel = new JLabel("Total:");
        totalLabel.setFont(new Font("Segoe UI", Font.BOLD, 16));
        JLabel totalAmount = new JLabel("₹0");
        totalAmount.setFont(new Font("Segoe UI", Font.BOLD, 18));
        totalAmount.setForeground(new Color(255, 107, 107));
        totalPanel.add(totalLabel, BorderLayout.WEST);
        totalPanel.add(totalAmount, BorderLayout.EAST);

        JButton checkoutBtn = new JButton("Proceed to Checkout");
        checkoutBtn.setFont(new Font("Segoe UI", Font.BOLD, 14));
        checkoutBtn.setForeground(Color.WHITE);
        checkoutBtn.setBackground(new Color(76, 175, 80));
        checkoutBtn.setFocusPainted(false);
        checkoutBtn.setBorderPainted(false);
        checkoutBtn.setCursor(new Cursor(Cursor.HAND_CURSOR));
        checkoutBtn.setAlignmentX(Component.CENTER_ALIGNMENT);
        checkoutBtn.addActionListener(e -> {
            if (appState.isLoggedIn()) {
                JOptionPane.showMessageDialog(this, 
                    "Proceeding to checkout...\n(This is a demo)", 
                    "Checkout", 
                    JOptionPane.INFORMATION_MESSAGE);
            } else {
                dispose();
                new LoginDialog((Frame)getOwner()).setVisible(true);
            }
        });

        panel.add(subtotalPanel);
        panel.add(Box.createVerticalStrut(10));
        panel.add(totalPanel);
        panel.add(Box.createVerticalStrut(15));
        panel.add(checkoutBtn);

        return panel;
    }

    private void renderCart() {
        itemsPanel.removeAll();
        List<CartItem> cart = appState.getCart();

        if (cart.isEmpty()) {
            JPanel emptyPanel = new JPanel();
            emptyPanel.setLayout(new BoxLayout(emptyPanel, BoxLayout.Y_AXIS));
            emptyPanel.setBackground(BG_COLOR);
            emptyPanel.setBorder(new EmptyBorder(50, 0, 50, 0));

            JLabel emptyIcon = new JLabel("🛒", SwingConstants.CENTER);
            emptyIcon.setFont(new Font("Segoe UI Emoji", Font.PLAIN, 64));
            emptyIcon.setAlignmentX(Component.CENTER_ALIGNMENT);

            JLabel emptyText = new JLabel("Your cart is empty", SwingConstants.CENTER);
            emptyText.setFont(new Font("Segoe UI", Font.BOLD, 16));
            emptyText.setForeground(new Color(120, 120, 120));
            emptyText.setAlignmentX(Component.CENTER_ALIGNMENT);

            emptyPanel.add(emptyIcon);
            emptyPanel.add(Box.createVerticalStrut(15));
            emptyPanel.add(emptyText);

            itemsPanel.add(emptyPanel);
            summaryPanel.setVisible(false);
        } else {
            summaryPanel.setVisible(true);
            
            for (CartItem item : cart) {
                itemsPanel.add(createCartItemPanel(item));
                itemsPanel.add(Box.createVerticalStrut(10));
            }

            // Update totals
            JPanel subtotalPanel = (JPanel)summaryPanel.getComponent(0);
            JLabel subtotalAmount = (JLabel)subtotalPanel.getComponent(1);
            subtotalAmount.setText(FormatUtils.formatPrice(appState.getCartTotal()));

            JPanel totalPanel = (JPanel)summaryPanel.getComponent(2);
            JLabel totalAmount = (JLabel)totalPanel.getComponent(1);
            totalAmount.setText(FormatUtils.formatPrice(appState.getCartTotal()));
        }

        itemsPanel.revalidate();
        itemsPanel.repaint();
    }

    private JPanel createCartItemPanel(CartItem item) {
        Product product = item.getProduct();
        
        JPanel panel = new JPanel(new BorderLayout(10, 0));
        panel.setBackground(Color.WHITE);
        panel.setBorder(new CompoundBorder(
            new LineBorder(new Color(230, 230, 230), 1, true),
            new EmptyBorder(10, 10, 10, 10)
        ));
        panel.setMaximumSize(new Dimension(Integer.MAX_VALUE, 100));

        // Image
        JLabel imageLabel = new JLabel("📷", SwingConstants.CENTER);
        imageLabel.setFont(new Font("Segoe UI Emoji", Font.PLAIN, 32));
        imageLabel.setPreferredSize(new Dimension(80, 80));
        imageLabel.setBackground(new Color(245, 245, 245));
        imageLabel.setOpaque(true);

        // Details
        JPanel detailsPanel = new JPanel();
        detailsPanel.setLayout(new BoxLayout(detailsPanel, BoxLayout.Y_AXIS));
        detailsPanel.setBackground(Color.WHITE);

        JLabel nameLabel = new JLabel(product.getName());
        nameLabel.setFont(new Font("Segoe UI", Font.BOLD, 13));
        nameLabel.setAlignmentX(Component.LEFT_ALIGNMENT);

        JLabel brandLabel = new JLabel(product.getBrand());
        brandLabel.setFont(new Font("Segoe UI", Font.PLAIN, 11));
        brandLabel.setForeground(new Color(120, 120, 120));
        brandLabel.setAlignmentX(Component.LEFT_ALIGNMENT);

        JLabel priceLabel = new JLabel(FormatUtils.formatPrice(product.getPrice()));
        priceLabel.setFont(new Font("Segoe UI", Font.BOLD, 14));
        priceLabel.setForeground(new Color(255, 107, 107));
        priceLabel.setAlignmentX(Component.LEFT_ALIGNMENT);

        // Quantity controls
        JPanel qtyPanel = new JPanel(new FlowLayout(FlowLayout.LEFT, 5, 0));
        qtyPanel.setBackground(Color.WHITE);
        qtyPanel.setAlignmentX(Component.LEFT_ALIGNMENT);

        JButton minusBtn = createQuantityButton("−");
        minusBtn.addActionListener(e -> 
            appState.updateQuantity(product.getId(), item.getQuantity() - 1)
        );

        JLabel qtyLabel = new JLabel(String.valueOf(item.getQuantity()));
        qtyLabel.setFont(new Font("Segoe UI", Font.BOLD, 13));
        qtyLabel.setBorder(new EmptyBorder(0, 10, 0, 10));

        JButton plusBtn = createQuantityButton("+");
        plusBtn.addActionListener(e -> 
            appState.updateQuantity(product.getId(), item.getQuantity() + 1)
        );

        qtyPanel.add(minusBtn);
        qtyPanel.add(qtyLabel);
        qtyPanel.add(plusBtn);

        detailsPanel.add(nameLabel);
        detailsPanel.add(Box.createVerticalStrut(3));
        detailsPanel.add(brandLabel);
        detailsPanel.add(Box.createVerticalStrut(8));
        detailsPanel.add(priceLabel);
        detailsPanel.add(Box.createVerticalStrut(5));
        detailsPanel.add(qtyPanel);

        // Remove button
        JButton removeBtn = new JButton("🗑");
        removeBtn.setFont(new Font("Segoe UI Emoji", Font.PLAIN, 18));
        removeBtn.setForeground(new Color(255, 107, 107));
        removeBtn.setContentAreaFilled(false);
        removeBtn.setBorderPainted(false);
        removeBtn.setFocusPainted(false);
        removeBtn.setCursor(new Cursor(Cursor.HAND_CURSOR));
        removeBtn.addActionListener(e -> appState.removeFromCart(product.getId()));

        panel.add(imageLabel, BorderLayout.WEST);
        panel.add(detailsPanel, BorderLayout.CENTER);
        panel.add(removeBtn, BorderLayout.EAST);

        return panel;
    }

    private JButton createQuantityButton(String text) {
        JButton btn = new JButton(text);
        btn.setFont(new Font("Segoe UI", Font.BOLD, 14));
        btn.setPreferredSize(new Dimension(30, 30));
        btn.setBackground(new Color(245, 245, 245));
        btn.setFocusPainted(false);
        btn.setBorder(new LineBorder(new Color(230, 230, 230), 1));
        btn.setCursor(new Cursor(Cursor.HAND_CURSOR));
        return btn;
    }
}
