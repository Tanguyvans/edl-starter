import org.junit.Test;
import static org.junit.Assert.*;

/**
 * Tests unitaires pour Money
 */
public class MoneyTest {

    // ===== EXEMPLE =====

    @Test
    public void testAmount() {
        Money instance = new Money(12, "EUR");
        assertEquals(12, instance.amount());
    }

    // ===== TEST FOURNI : il échoue tant que Money.add() n'est pas écrite =====

    @Test
    public void testAddSameCurrency() throws Exception {
        Money result = new Money(12, "EUR").add(new Money(14, "EUR"));

        assertEquals(26, result.amount());
        assertEquals("EUR", result.currency());
    }

    // ===== À VOUS : supprimez fail(...) et écrivez le test =====

    /** currency() renvoie la devise donnée au constructeur. */
    @Test
    public void testCurrency() {
        fail("Test à écrire");
    }

    /**
     * Additionner 12 EUR et 5 USD doit lever une Exception.
     * Indice : @Test(expected = Exception.class) fait passer le test
     * seulement si l'exception est levée.
     */
    @Test
    public void testAddDifferentCurrency() throws Exception {
        fail("Test à écrire");
    }
}
