# 🎯 GUIDE SIMPLE - DONNÉES DE TEST POSTGRESQL

## 📦 Ce que contient le fichier `donnees_test.sql`

✅ **1 administrateur**
✅ **4 patients** avec leurs infos médicales
✅ **5 médecins** (différentes spécialités et villes)
✅ **43 créneaux disponibles** sur 5 jours
✅ **3 rendez-vous** de test déjà créés

**Tous les mots de passe : `password123`**

---

## 🚀 COMMENT UTILISER CE FICHIER ?

### Méthode 1 : Avec pgAdmin (Recommandé)

1. **Ouvrir pgAdmin**
2. **Connectez-vous à votre base de données** `smartrdv_db`
3. **Clic droit sur la base** → **Query Tool**
4. **Ouvrir le fichier** : Fichier → Ouvrir → `donnees_test.sql`
5. **Exécuter** : Appuyer sur ▶️ (ou F5)
6. ✅ **Terminé !** Vous avez maintenant des données de test

### Méthode 2 : Avec DBeaver

1. **Ouvrir DBeaver**
2. **Connectez-vous à votre base** `smartrdv_db`
3. **Nouveau script SQL** : Ctrl+Shift+N
4. **Copier-coller** le contenu de `donnees_test.sql`
5. **Exécuter** : Ctrl+Enter
6. ✅ **Terminé !**

### Méthode 3 : En ligne de commande

```bash
psql -U smartrdv -d smartrdv_db -f donnees_test.sql
```

---

## 👥 COMPTES DE TEST

### 🔐 ADMIN
```
Email    : admin@smartrdv.tn
Password : password123
```

### 🧑 PATIENTS (4 comptes)

| Email | Mot de passe | Âge | Ville |
|-------|--------------|-----|-------|
| ahmed.benali@email.tn | password123 | 35 ans | Tunis |
| fatma.trabelsi@email.tn | password123 | 28 ans | Sfax |
| mohamed.khlifi@email.tn | password123 | 42 ans | Sousse |
| salma.jebali@email.tn | password123 | 31 ans | Bizerte |

### 👨‍⚕️ MÉDECINS (5 comptes)

| Email | Mot de passe | Spécialité | Ville | Note |
|-------|--------------|------------|-------|------|
| dr.mahjoub@smartrdv.tn | password123 | Cardiologie | Tunis | ⭐ 4.8 |
| dr.hamdi@smartrdv.tn | password123 | Dermatologie | Sfax | ⭐ 4.5 |
| dr.gharbi@smartrdv.tn | password123 | Pédiatrie | Sousse | ⭐ 4.9 |
| dr.bouazizi@smartrdv.tn | password123 | Ophtalmologie | Tunis | ⭐ 4.6 |
| dr.amri@smartrdv.tn | password123 | Médecine Générale | Bizerte | ⭐ 4.7 |

---

## 📅 CRÉNEAUX DISPONIBLES

Le script crée des créneaux pour les **5 prochains jours** :

| Médecin | Date | Créneaux |
|---------|------|----------|
| Dr. Mahjoub (Cardio) | Lundi 21/04 | 8h-10h30 + 14h-15h30 |
| Dr. Hamdi (Dermato) | Mardi 22/04 | 9h-11h + 15h-16h |
| Dr. Gharbi (Pédiatre) | Mercredi 23/04 | 8h-10h30 + 14h-16h |
| Dr. Bouazizi (Ophtalmo) | Jeudi 24/04 | 9h-10h30 + 14h-15h |
| Dr. Amri (Généraliste) | Vendredi 25/04 | 8h-11h + 14h-16h |

---

## 📋 RENDEZ-VOUS DE TEST

Le script crée **3 rendez-vous** de test :

| Patient | Médecin | Date | Heure | Statut |
|---------|---------|------|-------|--------|
| Ahmed Ben Ali | Dr. Mahjoub (Cardio) | 21/04 | 08:00 | ✅ Confirmé |
| Fatma Trabelsi | Dr. Hamdi (Dermato) | 22/04 | 09:00 | ⏳ En attente |
| Mohamed Khlifi | Dr. Gharbi (Pédiatre) | 23/04 | 08:00 | ✅ Confirmé |

---

## 🧪 COMMENT TESTER VOTRE APPLICATION ?

### Test 1 : Connexion Patient

1. Ouvrez votre app mobile
2. Connectez-vous avec :
   - Email : `ahmed.benali@email.tn`
   - Password : `password123`
3. ✅ Vous devriez voir le dashboard patient

### Test 2 : Recherche de médecins

1. Connecté en tant que patient
2. Allez sur l'écran de recherche
3. ✅ Vous devriez voir 5 médecins
4. Filtrez par ville "Tunis"
5. ✅ Vous devriez voir 2 médecins (Dr. Mahjoub + Dr. Bouazizi)

### Test 3 : Voir les créneaux disponibles

1. Cliquez sur Dr. Mahjoub (Cardiologue)
2. Cliquez sur "Prendre rendez-vous"
3. ✅ Vous devriez voir 7 créneaux disponibles pour le 21/04
   (8 créneaux - 1 déjà réservé)

### Test 4 : Prendre un rendez-vous

1. Sélectionnez un créneau disponible
2. Saisissez un motif : "Consultation de contrôle"
3. Confirmez
4. ✅ Le RDV devrait être créé

### Test 5 : Voir mes rendez-vous

1. Allez sur "Mes rendez-vous"
2. ✅ Vous devriez voir le RDV avec Dr. Mahjoub (créé automatiquement)
3. ✅ Plus le RDV que vous venez de créer

### Test 6 : Connexion Médecin

1. Déconnectez-vous
2. Connectez-vous avec :
   - Email : `dr.mahjoub@smartrdv.tn`
   - Password : `password123`
3. ✅ Vous devriez voir le dashboard médecin
4. ✅ Vous devriez voir le RDV avec Ahmed Ben Ali

---

## 🔄 RÉINITIALISER LES DONNÉES

Si vous voulez tout effacer et recommencer :

**Méthode simple :** Relancez le script `donnees_test.sql`
- Il supprime automatiquement les anciennes données
- Il recrée tout depuis zéro

---

## ⚠️ PROBLÈMES COURANTS

### Problème 1 : "Erreur de clé étrangère"

**Cause :** Les tables n'existent pas encore

**Solution :**
1. Assurez-vous que Spring Boot a créé les tables
2. Lancez votre application Spring Boot au moins une fois
3. Puis exécutez le script

### Problème 2 : "Password hash invalide"

**Cause :** Le hash BCrypt n'est pas reconnu

**Solution :**
- Le hash `$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYzQzCXZdaa` correspond à "password123"
- Assurez-vous que Spring Security est bien configuré avec BCrypt

### Problème 3 : "Séquence not found"

**Cause :** PostgreSQL ne trouve pas les séquences

**Solution :**
- Commentez les lignes de réinitialisation des séquences (lignes avec `setval`)
- Ou créez les séquences manuellement avant

---

## 📊 VÉRIFIER QUE TOUT FONCTIONNE

Exécutez cette requête SQL pour vérifier :

```sql
SELECT 'UTILISATEURS' as table_name, COUNT(*) as count FROM utilisateurs
UNION ALL
SELECT 'PATIENTS', COUNT(*) FROM patients
UNION ALL
SELECT 'MÉDECINS', COUNT(*) FROM medecins
UNION ALL
SELECT 'CRÉNEAUX', COUNT(*) FROM creneaux
UNION ALL
SELECT 'RENDEZ-VOUS', COUNT(*) FROM rendez_vous;
```

**Résultat attendu :**
```
UTILISATEURS  | 10
PATIENTS      | 4
MÉDECINS      | 5
CRÉNEAUX      | 43
RENDEZ-VOUS   | 3
```

---

## ✅ CHECKLIST

- [ ] J'ai exécuté le script `donnees_test.sql` dans PostgreSQL
- [ ] Les données sont bien créées (vérification avec la requête ci-dessus)
- [ ] Je peux me connecter avec `ahmed.benali@email.tn` / `password123`
- [ ] Je vois 5 médecins dans la recherche
- [ ] Je peux voir les créneaux disponibles
- [ ] Je peux prendre un rendez-vous
- [ ] Je peux me connecter en tant que médecin
- [ ] Le médecin voit ses rendez-vous

---

## 🎯 PROCHAINES ÉTAPES

Une fois que vous avez testé avec ces données :

1. **Sprint 2** : Ajouter le questionnaire IA
2. **Sprint 3** : Notifications push
3. **Sprint 4** : Dashboard admin

---

## 💡 ASTUCE

Gardez ce fichier SQL ! Vous pourrez le réexécuter à tout moment pour :
- Réinitialiser la base de données
- Tester avec des données propres
- Faire des démos

---

🎉 **Bon test !**
