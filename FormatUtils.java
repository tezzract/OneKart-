import java.text.NumberFormat;
import java.util.Locale;

public class FormatUtils {
    private static final NumberFormat indianFormat = NumberFormat.getInstance(new Locale("en", "IN"));

    public static String formatPrice(int price) {
        return "₹" + indianFormat.format(price);
    }

    public static String formatNumber(int number) {
        return indianFormat.format(number);
    }

    public static String formatRating(double rating) {
        return String.format("%.1f", rating);
    }
}
