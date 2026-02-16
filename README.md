# Boutique cartes cadeaux (Apple, Nike, Amazon)

Ce projet est une base simple d'e-commerce avec **paiement Stripe Checkout**.

## Installation

```bash
npm install
cp .env.example .env
```

Ensuite, ajoute votre clé Stripe secrète dans `.env`.

## Lancer

```bash
npm run dev
```

Puis ouvrez `http://localhost:3000`.

## Recevoir les paiements sur votre compte bancaire (RIB)

Vous **ne renseignez pas le RIB dans ce code**. Avec Stripe Checkout, l'argent arrive d'abord sur votre solde Stripe, puis Stripe effectue le virement vers votre banque.

1. Créez/ouvrez votre compte Stripe: `https://dashboard.stripe.com`.
2. Allez dans **Paramètres** → **Comptes bancaires et planification** (ou **Bank accounts and scheduling**).
3. Ajoutez votre IBAN/RIB comme compte bancaire de versement.
4. Vérifiez votre identité/entreprise si Stripe le demande.
5. En mode test, utilisez vos clés test; en production, passez aux clés live.

### Cas "bénéficiaire" (si l'argent doit aller vers un tiers)

Si vous voulez que les paiements aillent vers le compte d'un autre bénéficiaire (vendeur/partenaire), il faut utiliser **Stripe Connect** (comptes connectés + transferts) et non un simple Checkout standard.

## Important (légal + sécurité)

- Vous devez respecter les politiques de revente des cartes cadeaux Apple/Nike/Amazon.
- En production, ajoutez:
  - authentification admin,
  - stockage des commandes en base,
  - webhooks Stripe pour confirmer le paiement,
  - gestion anti-fraude et KYC si nécessaire.
