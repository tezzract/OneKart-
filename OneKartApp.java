import javax.swing.*;
import java.awt.*;
import javax.swing.border.*;

public class OneKartApp extends JFrame {
    private static final Color HEADER_BG = new Color(255, 159, 10);
    private static final Color BADGE_BG = new Color(255, 107, 107);
    private AppState appState;
    private JLabel cartBadge;

    public OneKartApp() {
        this.appState = AppState.getInstance();
        
        setTitle("OneKart - Your Shopping Destination");
        setSize(1400, 900);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        // Main layout
        setLayout(new BorderLayout());

        // Header
        add(createHeader(), BorderLayout.NORTH);

        // Main content area
        JPanel mainPanel = new JPanel(new BorderLayout());
        
        // Category ribbon
        mainPanel.add(new CategoryPanel(), BorderLayout.NORTH);

        // Content area with sidebar and products
        JPanel contentPanel = new JPanel(new BorderLayout());
        contentPanel.setBackground(new Color(248, 248, 248));

        // Sidebar with filters
        JScrollPane filterScrollPane = new JScrollPane(new FilterPanel());
        filterScrollPane.setBorder(null);
        filterScrollPane.setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_NEVER);
        contentPanel.add(filterScrollPane, BorderLayout.WEST);

        // Products area
        contentPanel.add(new ProductsPanel(), BorderLayout.CENTER);

        mainPanel.add(contentPanel, BorderLayout.CENTER);

        add(mainPanel, BorderLayout.CENTER);

        // Listen for cart updates
        appState.addListener(this::updateCartBadge);
    }

    private JPanel createHeader() {
        JPanel header = new JPanel(new BorderLayout());
        header.setBackground(HEADER_BG);
        header.setBorder(new EmptyBorder(15, 25, 15, 25));

        // Logo and title
        JPanel logoPanel = new JPanel(new FlowLayout(FlowLayout.LEFT, 15, 0));
        logoPanel.setBackground(HEADER_BG);

        JLabel logoIcon = new JLabel("🛍️");
        logoIcon.setFont(new Font("Segoe UI Emoji", Font.PLAIN, 32));

        JLabel titleLabel = new JLabel("OneKart");
        titleLabel.setFont(new Font("Segoe UI", Font.BOLD, 24));
        titleLabel.setForeground(Color.WHITE);

        logoPanel.add(logoIcon);
        logoPanel.add(titleLabel);

        // Search bar
        JPanel searchPanel = new JPanel(new BorderLayout());
        searchPanel.setBackground(Color.WHITE);
        searchPanel.setBorder(new CompoundBorder(
            new LineBorder(new Color(230, 230, 230), 1, true),
            new EmptyBorder(8, 15, 8, 15)
        ));
        searchPanel.setPreferredSize(new Dimension(450, 40));

        JTextField searchField = new JTextField("Search for products, brands and more...");
        searchField.setFont(new Font("Segoe UI", Font.PLAIN, 13));
        searchField.setBorder(null);
        searchField.setForeground(new Color(150, 150, 150));
        searchField.addFocusListener(new java.awt.event.FocusAdapter() {
            public void focusGained(java.awt.event.FocusEvent evt) {
                if (searchField.getText().equals("Search for products, brands and more...")) {
                    searchField.setText("");
                    searchField.setForeground(Color.BLACK);
                }
            }
            public void focusLost(java.awt.event.FocusEvent evt) {
                if (searchField.getText().isEmpty()) {
                    searchField.setText("Search for products, brands and more...");
                    searchField.setForeground(new Color(150, 150, 150));
                }
            }
        });

        JButton searchBtn = new JButton("🔍");
        searchBtn.setFont(new Font("Segoe UI Emoji", Font.PLAIN, 16));
        searchBtn.setContentAreaFilled(false);
        searchBtn.setBorderPainted(false);
        searchBtn.setFocusPainted(false);
        searchBtn.setCursor(new Cursor(Cursor.HAND_CURSOR));

        searchPanel.add(searchField, BorderLayout.CENTER);
        searchPanel.add(searchBtn, BorderLayout.EAST);

        // Right side buttons
        JPanel rightPanel = new JPanel(new FlowLayout(FlowLayout.RIGHT, 15, 0));
        rightPanel.setBackground(HEADER_BG);

        JButton loginBtn = createHeaderButton("👤 Login", false);
        loginBtn.addActionListener(e -> new LoginDialog(this).setVisible(true));

        JButton cartBtn = createHeaderButton("🛒 Cart", true);
        cartBtn.setLayout(new BorderLayout());
        
        JLabel cartLabel = new JLabel("🛒 Cart");
        cartLabel.setFont(new Font("Segoe UI", Font.BOLD, 13));
        cartLabel.setForeground(Color.WHITE);
        
        cartBadge = new JLabel("0");
        cartBadge.setFont(new Font("Segoe UI", Font.BOLD, 10));
        cartBadge.setForeground(Color.WHITE);
        cartBadge.setBackground(BADGE_BG);
        cartBadge.setOpaque(true);
        cartBadge.setBorder(new EmptyBorder(2, 6, 2, 6));
        cartBadge.setVisible(false);
        
        JPanel badgePanel = new JPanel(new FlowLayout(FlowLayout.LEFT, 5, 0));
        badgePanel.setOpaque(false);
        badgePanel.add(cartLabel);
        badgePanel.add(cartBadge);
        
        cartBtn.removeAll();
        cartBtn.add(badgePanel, BorderLayout.CENTER);
        
        cartBtn.addActionListener(e -> new CartDialog(this).setVisible(true));

        rightPanel.add(loginBtn);
        rightPanel.add(cartBtn);

        header.add(logoPanel, BorderLayout.WEST);
        header.add(searchPanel, BorderLayout.CENTER);
        header.add(rightPanel, BorderLayout.EAST);

        return header;
    }

    private JButton createHeaderButton(String text, boolean isPrimary) {
        JButton button = new JButton(text);
        button.setFont(new Font("Segoe UI", Font.BOLD, 13));
        button.setForeground(Color.WHITE);
        button.setBackground(isPrimary ? new Color(245, 143, 0) : new Color(255, 179, 71));
        button.setFocusPainted(false);
        button.setBorderPainted(false);
        button.setCursor(new Cursor(Cursor.HAND_CURSOR));
        button.setBorder(new EmptyBorder(8, 20, 8, 20));
        
        button.addMouseListener(new java.awt.event.MouseAdapter() {
            public void mouseEntered(java.awt.event.MouseEvent evt) {
                button.setBackground(new Color(235, 133, 0));
            }
            public void mouseExited(java.awt.event.MouseEvent evt) {
                button.setBackground(isPrimary ? new Color(245, 143, 0) : new Color(255, 179, 71));
            }
        });
        
        return button;
    }

    private void updateCartBadge() {
        int count = appState.getCartCount();
        cartBadge.setText(String.valueOf(count));
        cartBadge.setVisible(count > 0);
    }

    public static void main(String[] args) {
        // Set system look and feel
        try {
            UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
        } catch (Exception e) {
            e.printStackTrace();
        }

        // Enable anti-aliasing
        System.setProperty("awt.useSystemAAFontSettings", "on");
        System.setProperty("swing.aatext", "true");

        SwingUtilities.invokeLater(() -> {
            OneKartApp app = new OneKartApp();
            app.setVisible(true);
        });
    }
}
