import java.awt.Color;

public class Category {
    private String id;
    private String name;
    private String icon;
    private Color color;

    public Category(String id, String name, String icon, Color color) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.color = color;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public String getIcon() { return icon; }
    public Color getColor() { return color; }
}
