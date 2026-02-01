import javax.swing.*;
import java.awt.*;
import java.util.List;
import javax.swing.border.*;

public class ProductsPanel extends JPanel {
    private static final Color BG_COLOR = new Color(248, 248, 248);
    private AppState appState;
    private JPanel headerPanel;
    private JPanel gridPanel;
    private JScrollPane scrollPane;

    public ProductsPanel() {
        this.appState = AppState.getInstance();
        setLayout(new BorderLayout());
        setBackground(BG_COLOR);

        // Header
        headerPanel = createHeaderPanel();
        add(headerPanel, BorderLayout.NORTH);

        // Products grid
        gridPanel = new JPanel(new GridLayout(0, 3, 20, 20));
        gridPanel.setBackground(BG_COLOR);
        gridPanel.setBorder(new EmptyBorder(20, 20, 20, 20));

        scrollPane = new JScrollPane(gridPanel);
        scrollPane.setBorder(null);
        scrollPane.getVerticalScrollBar().setUnitIncrement(16);
        add(scrollPane, BorderLayout.CENTER);

        renderProducts();

        appState.addListener(this::renderProducts);
    }

    private JPanel createHeaderPanel() {
        JPanel panel = new JPanel(new BorderLayout());
        panel.setBackground(Color.WHITE);
        panel.setBorder(new CompoundBorder(
            new MatteBorder(0, 0, 1, 0, new Color(230, 230, 230)),
            new EmptyBorder(15, 20, 15, 20)
        ));

        JLabel titleLabel = new JLabel("All Products");
        titleLabel.setFont(new Font("Segoe UI", Font.BOLD, 20));
        titleLabel.setForeground(new Color(33, 33, 33));

        JLabel countLabel = new JLabel("0 products");
        countLabel.setFont(new Font("Segoe UI", Font.PLAIN, 13));
        countLabel.setForeground(new Color(120, 120, 120));

        panel.add(titleLabel, BorderLayout.WEST);
        panel.add(countLabel, BorderLayout.EAST);

        return panel;
    }

    private void renderProducts() {
        List<Product> products = appState.getFilteredProducts();
        
        // Update header
        Category category = DataStore.getCategoryById(appState.getSelectedCategory());
        ((JLabel)headerPanel.getComponent(0)).setText(category.getName());
        ((JLabel)headerPanel.getComponent(1)).setText("Showing " + products.size() + " products");

        // Clear and repopulate grid
        gridPanel.removeAll();

        if (products.isEmpty()) {
            JPanel emptyPanel = new JPanel();
            emptyPanel.setLayout(new BoxLayout(emptyPanel, BoxLayout.Y_AXIS));
            emptyPanel.setBackground(BG_COLOR);
            
            JLabel emptyIcon = new JLabel("🔍", SwingConstants.CENTER);
            emptyIcon.setFont(new Font("Segoe UI Emoji", Font.PLAIN, 72));
            emptyIcon.setAlignmentX(Component.CENTER_ALIGNMENT);
            
            JLabel emptyText = new JLabel("No products found", SwingConstants.CENTER);
            emptyText.setFont(new Font("Segoe UI", Font.BOLD, 18));
            emptyText.setForeground(new Color(120, 120, 120));
            emptyText.setAlignmentX(Component.CENTER_ALIGNMENT);
            
            JLabel emptySubtext = new JLabel("Try adjusting your filters", SwingConstants.CENTER);
            emptySubtext.setFont(new Font("Segoe UI", Font.PLAIN, 14));
            emptySubtext.setForeground(new Color(150, 150, 150));
            emptySubtext.setAlignmentX(Component.CENTER_ALIGNMENT);

            emptyPanel.add(Box.createVerticalGlue());
            emptyPanel.add(emptyIcon);
            emptyPanel.add(Box.createVerticalStrut(20));
            emptyPanel.add(emptyText);
            emptyPanel.add(Box.createVerticalStrut(10));
            emptyPanel.add(emptySubtext);
            emptyPanel.add(Box.createVerticalGlue());

            gridPanel.setLayout(new BorderLayout());
            gridPanel.add(emptyPanel, BorderLayout.CENTER);
        } else {
            gridPanel.setLayout(new GridLayout(0, 3, 20, 20));
            for (Product product : products) {
                gridPanel.add(new ProductCard(product));
            }
        }

        gridPanel.revalidate();
        gridPanel.repaint();
    }
}
