import javax.swing.*;
import java.awt.*;
import javax.swing.border.*;

public class FilterPanel extends JPanel {
    private static final Color BG_COLOR = new Color(255, 255, 255);
    private static final Color HEADER_COLOR = new Color(33, 33, 33);
    private AppState appState;

    public FilterPanel() {
        this.appState = AppState.getInstance();
        setLayout(new BoxLayout(this, BoxLayout.Y_AXIS));
        setBackground(BG_COLOR);
        setBorder(new EmptyBorder(20, 20, 20, 20));
        setPreferredSize(new Dimension(280, 600));

        // Filters header
        JLabel headerLabel = new JLabel("Filters");
        headerLabel.setFont(new Font("Segoe UI", Font.BOLD, 18));
        headerLabel.setForeground(HEADER_COLOR);
        headerLabel.setAlignmentX(Component.LEFT_ALIGNMENT);

        // Clear filters button
        JButton clearBtn = new JButton("Clear All");
        clearBtn.setFont(new Font("Segoe UI", Font.PLAIN, 12));
        clearBtn.setForeground(new Color(255, 107, 107));
        clearBtn.setContentAreaFilled(false);
        clearBtn.setBorderPainted(false);
        clearBtn.setFocusPainted(false);
        clearBtn.setCursor(new Cursor(Cursor.HAND_CURSOR));
        clearBtn.setAlignmentX(Component.LEFT_ALIGNMENT);
        clearBtn.addActionListener(e -> appState.clearFilters());

        add(headerLabel);
        add(Box.createVerticalStrut(5));
        add(clearBtn);
        add(Box.createVerticalStrut(20));

        // Price Range
        add(createSectionLabel("Price Range"));
        add(createPriceRangePanel());
        add(Box.createVerticalStrut(20));

        // Brands
        add(createSectionLabel("Brands"));
        add(createBrandsPanel());
        add(Box.createVerticalStrut(20));

        // Rating
        add(createSectionLabel("Customer Rating"));
        add(createRatingPanel());
    }

    private JLabel createSectionLabel(String text) {
        JLabel label = new JLabel(text);
        label.setFont(new Font("Segoe UI", Font.BOLD, 14));
        label.setForeground(HEADER_COLOR);
        label.setAlignmentX(Component.LEFT_ALIGNMENT);
        return label;
    }

    private JPanel createPriceRangePanel() {
        JPanel panel = new JPanel();
        panel.setLayout(new BoxLayout(panel, BoxLayout.Y_AXIS));
        panel.setBackground(BG_COLOR);
        panel.setAlignmentX(Component.LEFT_ALIGNMENT);

        JPanel inputPanel = new JPanel(new GridLayout(2, 2, 10, 8));
        inputPanel.setBackground(BG_COLOR);
        inputPanel.setMaximumSize(new Dimension(240, 70));

        JLabel minLabel = new JLabel("Min:");
        minLabel.setFont(new Font("Segoe UI", Font.PLAIN, 12));
        
        JTextField minField = new JTextField("0");
        minField.setFont(new Font("Segoe UI", Font.PLAIN, 12));

        JLabel maxLabel = new JLabel("Max:");
        maxLabel.setFont(new Font("Segoe UI", Font.PLAIN, 12));
        
        JTextField maxField = new JTextField("200000");
        maxField.setFont(new Font("Segoe UI", Font.PLAIN, 12));

        inputPanel.add(minLabel);
        inputPanel.add(minField);
        inputPanel.add(maxLabel);
        inputPanel.add(maxField);

        JButton applyBtn = new JButton("Apply");
        applyBtn.setFont(new Font("Segoe UI", Font.BOLD, 11));
        applyBtn.setBackground(new Color(76, 177, 193));
        applyBtn.setForeground(Color.WHITE);
        applyBtn.setFocusPainted(false);
        applyBtn.setBorderPainted(false);
        applyBtn.setAlignmentX(Component.LEFT_ALIGNMENT);
        applyBtn.setCursor(new Cursor(Cursor.HAND_CURSOR));
        applyBtn.addActionListener(e -> {
            try {
                int min = Integer.parseInt(minField.getText());
                int max = Integer.parseInt(maxField.getText());
                appState.setPriceRange(min, max);
            } catch (NumberFormatException ex) {
                JOptionPane.showMessageDialog(this, "Please enter valid numbers", "Error", JOptionPane.ERROR_MESSAGE);
            }
        });

        panel.add(Box.createVerticalStrut(8));
        panel.add(inputPanel);
        panel.add(Box.createVerticalStrut(10));
        panel.add(applyBtn);

        return panel;
    }

    private JPanel createBrandsPanel() {
        JPanel panel = new JPanel();
        panel.setLayout(new BoxLayout(panel, BoxLayout.Y_AXIS));
        panel.setBackground(BG_COLOR);
        panel.setAlignmentX(Component.LEFT_ALIGNMENT);

        for (String brand : DataStore.getBrands()) {
            JCheckBox checkbox = new JCheckBox(brand);
            checkbox.setFont(new Font("Segoe UI", Font.PLAIN, 12));
            checkbox.setBackground(BG_COLOR);
            checkbox.setAlignmentX(Component.LEFT_ALIGNMENT);
            checkbox.setCursor(new Cursor(Cursor.HAND_CURSOR));
            checkbox.addActionListener(e -> appState.toggleBrand(brand));
            panel.add(checkbox);
            panel.add(Box.createVerticalStrut(5));
        }

        return panel;
    }

    private JPanel createRatingPanel() {
        JPanel panel = new JPanel();
        panel.setLayout(new BoxLayout(panel, BoxLayout.Y_AXIS));
        panel.setBackground(BG_COLOR);
        panel.setAlignmentX(Component.LEFT_ALIGNMENT);

        int[] ratings = {4, 3, 2, 1};
        
        for (int rating : ratings) {
            JButton ratingBtn = new JButton(rating + "★ & above");
            ratingBtn.setFont(new Font("Segoe UI", Font.PLAIN, 12));
            ratingBtn.setForeground(new Color(60, 60, 60));
            ratingBtn.setBackground(new Color(250, 250, 250));
            ratingBtn.setFocusPainted(false);
            ratingBtn.setBorder(new CompoundBorder(
                new LineBorder(new Color(230, 230, 230), 1, true),
                new EmptyBorder(6, 10, 6, 10)
            ));
            ratingBtn.setAlignmentX(Component.LEFT_ALIGNMENT);
            ratingBtn.setMaximumSize(new Dimension(240, 35));
            ratingBtn.setCursor(new Cursor(Cursor.HAND_CURSOR));
            
            ratingBtn.addActionListener(e -> {
                double currentMin = appState.getMinRating();
                appState.setMinRating(currentMin == rating ? 0 : rating);
            });

            panel.add(ratingBtn);
            panel.add(Box.createVerticalStrut(8));
        }

        return panel;
    }
}
