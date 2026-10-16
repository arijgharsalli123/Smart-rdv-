-- ========================================
-- SMART RDV - DONNÉES DE TEST - SPRINT 1
-- ========================================
-- Script SQL pour créer des données de test dans PostgreSQL
-- Copier-coller ce script dans pgAdmin ou DBeaver

-- ========================================
-- 1. NETTOYAGE (supprimer les anciennes données)
-- ========================================

DELETE FROM rendez_vous;
DELETE FROM creneaux;
DELETE FROM patients;
DELETE FROM medecins;
DELETE FROM utilisateurs;

-- ========================================
-- 2. UTILISATEURS DE BASE
-- ========================================

-- Mot de passe pour TOUS les utilisateurs : "password123"
-- Hash BCrypt (utilisé par Spring Security)
-- Vous pouvez vous connecter avec email + "password123"

-- ADMIN
INSERT INTO utilisateurs (id, nom, prenom, email, password_hash, telephone, role, actif, created_at) 
VALUES (1, 'Admin', 'System', 'admin@smartrdv.tn', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYzQzCXZdaa', '71000000', 'ADMIN', true, NOW());

-- PATIENTS
INSERT INTO utilisateurs (id, nom, prenom, email, password_hash, telephone, role, actif, created_at) 
VALUES 
(2, 'Ben Ali', 'Ahmed', 'ahmed.benali@email.tn', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYzQzCXZdaa', '98123456', 'PATIENT', true, NOW()),
(3, 'Trabelsi', 'Fatma', 'fatma.trabelsi@email.tn', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYzQzCXZdaa', '22456789', 'PATIENT', true, NOW()),
(4, 'Khlifi', 'Mohamed', 'mohamed.khlifi@email.tn', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYzQzCXZdaa', '50789123', 'PATIENT', true, NOW()),
(5, 'Jebali', 'Salma', 'salma.jebali@email.tn', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYzQzCXZdaa', '25678901', 'PATIENT', true, NOW());

-- MÉDECINS
INSERT INTO utilisateurs (id, nom, prenom, email, password_hash, telephone, role, actif, created_at) 
VALUES 
(6, 'Mahjoub', 'Karim', 'dr.mahjoub@smartrdv.tn', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYzQzCXZdaa', '71234567', 'MEDECIN', true, NOW()),
(7, 'Hamdi', 'Leila', 'dr.hamdi@smartrdv.tn', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYzQzCXZdaa', '71345678', 'MEDECIN', true, NOW()),
(8, 'Gharbi', 'Nabil', 'dr.gharbi@smartrdv.tn', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYzQzCXZdaa', '71456789', 'MEDECIN', true, NOW()),
(9, 'Bouazizi', 'Sarra', 'dr.bouazizi@smartrdv.tn', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYzQzCXZdaa', '71567890', 'MEDECIN', true, NOW()),
(10, 'Amri', 'Hichem', 'dr.amri@smartrdv.tn', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYzQzCXZdaa', '71678901', 'MEDECIN', true, NOW());

-- ========================================
-- 3. DÉTAILS PATIENTS
-- ========================================

INSERT INTO patients (id, age, allergies, antecedents, groupe_sanguin, fcm_token) 
VALUES 
(2, 35, 'Pénicilline', 'Diabète type 2', 'A+', NULL),
(3, 28, NULL, 'Hypertension', 'O+', NULL),
(4, 42, 'Aspirine', 'Asthme', 'B+', NULL),
(5, 31, NULL, NULL, 'AB+', NULL);

-- ========================================
-- 4. DÉTAILS MÉDECINS
-- ========================================

INSERT INTO medecins (id, specialite, ville, adresse_cabinet, notation, nb_avis, disponible) 
VALUES 
(6, 'Cardiologie', 'Tunis', '15 Avenue Habib Bourguiba, Tunis 1000', 4.8, 42, true),
(7, 'Dermatologie', 'Sfax', '23 Rue de la République, Sfax 3000', 4.5, 28, true),
(8, 'Pédiatrie', 'Sousse', '8 Boulevard Yahia Ibn Omar, Sousse 4000', 4.9, 67, true),
(9, 'Ophtalmologie', 'Tunis', '45 Rue de Marseille, Tunis 1000', 4.6, 35, true),
(10, 'Médecine Générale', 'Bizerte', '12 Avenue de France, Bizerte 7000', 4.7, 51, true);

-- ========================================
-- 5. CRÉNEAUX DISPONIBLES (3 prochains jours)
-- ========================================

-- Dr. Mahjoub (Cardiologue) - Lundi 21 Avril 2025
INSERT INTO creneaux (medecin_id, date_dispo, heure_debut, heure_fin, duree_minutes, est_disponible) 
VALUES 
(6, '2025-04-21', '08:00', '08:30', 30, true),
(6, '2025-04-21', '08:30', '09:00', 30, true),
(6, '2025-04-21', '09:00', '09:30', 30, true),
(6, '2025-04-21', '09:30', '10:00', 30, true),
(6, '2025-04-21', '10:00', '10:30', 30, true),
(6, '2025-04-21', '14:00', '14:30', 30, true),
(6, '2025-04-21', '14:30', '15:00', 30, true),
(6, '2025-04-21', '15:00', '15:30', 30, true);

-- Dr. Hamdi (Dermatologue) - Mardi 22 Avril 2025
INSERT INTO creneaux (medecin_id, date_dispo, heure_debut, heure_fin, duree_minutes, est_disponible) 
VALUES 
(7, '2025-04-22', '09:00', '09:30', 30, true),
(7, '2025-04-22', '09:30', '10:00', 30, true),
(7, '2025-04-22', '10:00', '10:30', 30, true),
(7, '2025-04-22', '10:30', '11:00', 30, true),
(7, '2025-04-22', '15:00', '15:30', 30, true),
(7, '2025-04-22', '15:30', '16:00', 30, true);

-- Dr. Gharbi (Pédiatre) - Mercredi 23 Avril 2025
INSERT INTO creneaux (medecin_id, date_dispo, heure_debut, heure_fin, duree_minutes, est_disponible) 
VALUES 
(8, '2025-04-23', '08:00', '08:30', 30, true),
(8, '2025-04-23', '08:30', '09:00', 30, true),
(8, '2025-04-23', '09:00', '09:30', 30, true),
(8, '2025-04-23', '09:30', '10:00', 30, true),
(8, '2025-04-23', '10:00', '10:30', 30, true),
(8, '2025-04-23', '14:00', '14:30', 30, true),
(8, '2025-04-23', '14:30', '15:00', 30, true),
(8, '2025-04-23', '15:00', '15:30', 30, true),
(8, '2025-04-23', '15:30', '16:00', 30, true);

-- Dr. Bouazizi (Ophtalmologue) - Jeudi 24 Avril 2025
INSERT INTO creneaux (medecin_id, date_dispo, heure_debut, heure_fin, duree_minutes, est_disponible) 
VALUES 
(9, '2025-04-24', '09:00', '09:30', 30, true),
(9, '2025-04-24', '09:30', '10:00', 30, true),
(9, '2025-04-24', '10:00', '10:30', 30, true),
(9, '2025-04-24', '14:00', '14:30', 30, true),
(9, '2025-04-24', '14:30', '15:00', 30, true);

-- Dr. Amri (Généraliste) - Vendredi 25 Avril 2025
INSERT INTO creneaux (medecin_id, date_dispo, heure_debut, heure_fin, duree_minutes, est_disponible) 
VALUES 
(10, '2025-04-25', '08:00', '08:30', 30, true),
(10, '2025-04-25', '08:30', '09:00', 30, true),
(10, '2025-04-25', '09:00', '09:30', 30, true),
(10, '2025-04-25', '09:30', '10:00', 30, true),
(10, '2025-04-25', '10:00', '10:30', 30, true),
(10, '2025-04-25', '10:30', '11:00', 30, true),
(10, '2025-04-25', '14:00', '14:30', 30, true),
(10, '2025-04-25', '14:30', '15:00', 30, true),
(10, '2025-04-25', '15:00', '15:30', 30, true),
(10, '2025-04-25', '15:30', '16:00', 30, true);

-- ========================================
-- 6. RENDEZ-VOUS DE TEST
-- ========================================

-- RDV 1 : Ahmed chez Dr. Mahjoub (Cardiologue)
INSERT INTO rendez_vous (patient_id, medecin_id, creneau_id, date_rdv, heure, statut, motif, created_at)
VALUES (2, 6, 1, '2025-04-21', '08:00', 'confirme', 'Consultation cardiaque de contrôle', NOW());

-- Marquer le créneau comme réservé
UPDATE creneaux SET est_disponible = false WHERE id = 1;

-- RDV 2 : Fatma chez Dr. Hamdi (Dermatologue)
INSERT INTO rendez_vous (patient_id, medecin_id, creneau_id, date_rdv, heure, statut, motif, created_at)
VALUES (3, 7, 9, '2025-04-22', '09:00', 'en_attente', 'Consultation dermatologique', NOW());

-- Marquer le créneau comme réservé
UPDATE creneaux SET est_disponible = false WHERE id = 9;

-- RDV 3 : Mohamed chez Dr. Gharbi (Pédiatre)
INSERT INTO rendez_vous (patient_id, medecin_id, creneau_id, date_rdv, heure, statut, motif, created_at)
VALUES (4, 8, 15, '2025-04-23', '08:00', 'confirme', 'Vaccination enfant', NOW());

-- Marquer le créneau comme réservé
UPDATE creneaux SET est_disponible = false WHERE id = 15;

-- ========================================
-- 7. RÉINITIALISER LES SÉQUENCES
-- ========================================

-- Réinitialiser les ID auto-incrémentés
SELECT setval('utilisateurs_id_seq', 10, true);
SELECT setval('creneaux_id_seq', (SELECT MAX(id) FROM creneaux), true);
SELECT setval('rendez_vous_id_seq', (SELECT MAX(id) FROM rendez_vous), true);

-- ========================================
-- 8. VÉRIFICATION
-- ========================================

-- Vérifier que les données sont bien insérées
SELECT 'UTILISATEURS' as table_name, COUNT(*) as count FROM utilisateurs
UNION ALL
SELECT 'PATIENTS', COUNT(*) FROM patients
UNION ALL
SELECT 'MÉDECINS', COUNT(*) FROM medecins
UNION ALL
SELECT 'CRÉNEAUX', COUNT(*) FROM creneaux
UNION ALL
SELECT 'RENDEZ-VOUS', COUNT(*) FROM rendez_vous;

-- ========================================
-- ✅ DONNÉES DE TEST CRÉÉES AVEC SUCCÈS !
-- ========================================

/*
COMPTES DE TEST DISPONIBLES :

📧 ADMIN
   Email    : admin@smartrdv.tn
   Password : password123

📧 PATIENTS
   Email    : ahmed.benali@email.tn      | Password : password123
   Email    : fatma.trabelsi@email.tn    | Password : password123
   Email    : mohamed.khlifi@email.tn    | Password : password123
   Email    : salma.jebali@email.tn      | Password : password123

📧 MÉDECINS
   Email    : dr.mahjoub@smartrdv.tn     | Password : password123 | Cardiologie - Tunis
   Email    : dr.hamdi@smartrdv.tn       | Password : password123 | Dermatologie - Sfax
   Email    : dr.gharbi@smartrdv.tn      | Password : password123 | Pédiatrie - Sousse
   Email    : dr.bouazizi@smartrdv.tn    | Password : password123 | Ophtalmologie - Tunis
   Email    : dr.amri@smartrdv.tn        | Password : password123 | Médecine Générale - Bizerte

📊 STATISTIQUES
   - 10 utilisateurs (1 admin + 4 patients + 5 médecins)
   - 43 créneaux disponibles sur 5 jours
   - 3 rendez-vous de test déjà créés
   - Tous les mots de passe : "password123"
*/
