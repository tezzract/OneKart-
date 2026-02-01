import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import javax.swing.border.*;

public class CategoryPanel extends JPanel {
    private static final Color BG_COLOR = new Color(255, 255, 255);
    private AppState appState;

    public CategoryPanel() {
        this.appState = AppState.getInstance();
        setLayout(new FlowLayout(FlowLayout.LEFT, 15, 10));
        setBackground(BG_COLOR);
        setBorder(new EmptyBorder(10, 20, 10, 20));

        renderCategories();

        appState.addListener(this::renderCategories);
    }

    private void renderCategories() {
        removeAll();
        
        for (Category category : DataStore.getCategories()) {
            JButton categoryBtn = createCategoryButton(category);
            add(categoryBtn);
        }
        
        revalidate();
        repaint();
    }

    private JButton createCategoryButton(Category category) {
        boolean isSelected = appState.getSelectedCategory().equals(category.getId());
        
        JButton button = new JButton();
        button.setLayout(new BorderLayout(0, 5));
        button.setPreferredSize(new Dimension(100, 90));
        button.setBackground(isSelected ? category.getColor() : new Color(250, 250, 250));
        button.setFocusPainted(false);
        button.setBorder(new CompoundBorder(
            new LineBorder(isSelected ? category.getColor() : new Color(230, 230, 230), 2, true),
            new EmptyBorder(8, 5, 8, 5)
        ));
        button.setCursor(new Cursor(Cursor.HAND_CURSOR));

        // Icon
        JLabel iconLabel = new JLabel(category.getIcon(), SwingConstants.CENTER);
        iconLabel.setFont(new Font("Segoe UI Emoji", Font.PLAIN, 32));
        iconLabel.setOpaque(false);

        // Name
        JLabel nameLabel = new JLabel(category.getName(), SwingConstants.CENTER);
        nameLabel.setFont(new Font("Segoe UI", Font.BOLD, 11));
        nameLabel.setForeground(isSelected ? Color.WHITE : new Color(60, 60, 60));

        button.add(iconLabel, BorderLayout.CENTER);
        button.add(nameLabel, BorderLayout.SOUTH);

        button.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseEntered(MouseEvent e) {
                if (!isSelected) {
                    button.setBackground(new Color(245, 245, 245));
                }
            }

            @Override
            public void mouseExited(MouseEvent e) {
                if (!isSelected) {
                    button.setBackground(new Color(250, 250, 250));
                }
            }
        });

        button.addActionListener(e -> appState.setCategory(category.getId()));

        return button;
    }
}
