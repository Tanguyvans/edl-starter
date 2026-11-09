/**
 * Classe Money - Gestion de monnaie et devise
 * Exercice II - Workshop 1
 */
public class Money {

    private int mAmount;
    private String mCurrency;

    /**
     * Constructeur (DÉJÀ IMPLÉMENTÉ)
     */
    public Money(int amount, String currency) {
        this.mAmount = amount;
        this.mCurrency = currency;
    }

    public int amount() {
        return mAmount;
    }

    public String currency() {
        return mCurrency;
    }

    /**
     * TODO : écrire cette méthode.
     *
     * Additionne deux montants de même devise : 12 EUR + 14 EUR = 26 EUR.
     * Si les devises sont différentes, lève une Exception.
     *
     * @param m La monnaie à ajouter
     * @return Une nouvelle Money avec la somme
     * @throws Exception si les devises sont différentes
     */
    public Money add(Money m) throws Exception {
        return null;
    }
}
