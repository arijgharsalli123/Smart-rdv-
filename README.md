# 🏥 SMART RDV

**Intelligent medical appointment booking platform with automatic AI-based prioritization**

> PFA project (Agile / Scrum) — Academic year 2025-2026 — Team of 2 students

![Expo](https://img.shields.io/badge/Expo-SDK%2051+-000020?logo=expo)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3-6DB33F?logo=springboot)
![FastAPI](https://img.shields.io/badge/FastAPI-Python%203.11-009688?logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql)
![MongoDB](https://img.shields.io/badge/MongoDB-6-47A248?logo=mongodb)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker)

---

## 📖 Table of Contents

1. [About](#-about)
2. [Features](#-features)
3. [Architecture](#-architecture)
4. [Tech Stack](#-tech-stack)
5. [Repository Structure](#-repository-structure)
6. [Getting Started](#-getting-started)
7. [AI Service](#-ai-service)
8. [REST API Overview](#-rest-api-overview)
9. [Data Model](#-data-model)
10. [Security](#-security)
11. [Testing](#-testing)
12. [Scrum Planning](#-scrum-planning)
13. [Roadmap](#-roadmap)
14. [Team](#-team)

---

## 📌 About

**SMART RDV** is a cross-platform mobile application (iOS & Android) that lets patients book medical appointments online.

Patients fill in a symptom questionnaire, and an AI service assigns a **priority score** (`faible`, `modéré`, `urgent`, `critique`). This score is used to automatically reorganize doctors' schedules so the most urgent cases are seen first — always with the explicit consent of any patient whose appointment would be moved.

If the AI service is unavailable, a **default score (MODÉRÉ)** is assigned so the service keeps running and no risk is under-estimated.

### Actors

| Actor | Role |
|---|---|
| **Patient** | Searches doctors, books appointments, fills the questionnaire, receives notifications |
| **Doctor** | Manages agenda and slots, views patients and their priority level |
| **Administrator** | Manages users, supervises the platform, views statistics |
| **AI System** | Analyses symptoms, scores priority, optimizes the schedule |

---

## ✨ Features

### MVP (essential)

- 🔐 Registration / login with JWT and role-based access (Patient / Doctor / Admin)
- 🔎 Doctor search with filters (specialty, city, rating, availability)
- 📅 Appointment booking (slot selection, reason for consultation, summary)
- 🧠 AI symptom questionnaire with priority scoring
- 🗂️ Doctor agenda with priority indicators
- ♻️ Simplified automatic schedule reorganization (with patient consent)
- 🕒 Slot management (CRUD) and patient medical record

### Optional (if time allows)

- 🔔 Push notifications (Firebase Cloud Messaging)
- 💬 Rule-based medical chatbot (no LLM, keyword → specialty suggestion)
- 📊 Advanced admin dashboard

### Priority levels

| Score | Label | Color | Meaning |
|:---:|---|:---:|---|
| 1 | FAIBLE | 🟢 | Routine consultation |
| 2 | MODÉRÉ | 🟡 | Consultation recommended within 48h |
| 3 | URGENT | 🟠 | Consultation needed within 12h |
| 4 | CRITIQUE | 🔴 | Immediate consultation required |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────┐
│  Mobile App — Expo React Native (iOS / Android)          │
│  Patient screens · Doctor screens · Admin dashboard      │
└───────────────────────────┬──────────────────────────────┘
                            │ HTTPS / REST + JWT Bearer
┌───────────────────────────▼──────────────────────────────┐
│  Backend — Spring Boot 3 (Java 17)                       │
│  Controller → Service → Repository (JPA) + Spring Sec.   │
└──────────┬───────────────────────────────┬───────────────┘
           │ JDBC / JPA                    │ HTTP (internal)
   ┌───────▼────────┐             ┌────────▼─────────────────┐
   │  PostgreSQL    │             │  AI Service — FastAPI    │
   │  (relational)  │             │  scoring + logs          │
   └────────────────┘             └────────┬─────────────────┘
                                           │
                                  ┌────────▼────────┐
                                  │ MongoDB (logs)  │
                                  └─────────────────┘

   Firebase Cloud Messaging ──► push notifications (iOS / Android)
```

### Backend layers

| Layer | Package | Responsibility |
|---|---|---|
| Controller | `controller/` | Handles incoming HTTP requests |
| Service | `service/` | Business logic |
| Repository | `repository/` | Database access (JPA) |
| Entity | `entity/` | JPA entities |
| Security | `security/` | JWT authentication, RBAC |
| DTO | `dto/` | Data transfer objects |
| Exception | `exception/` | Global error handling (`@ControllerAdvice`) |
| Config | `config/` | CORS, Firebase, AI client configuration |

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Mobile | Expo SDK 51+, React Native 0.74, Expo Router, NativeWind, Zustand, Axios, React Query, React Hook Form + Zod |
| Backend | Spring Boot 3, Java 17, Spring Security, JWT, JPA/Hibernate |
| AI service | Python 3.11, FastAPI, scikit-learn / TensorFlow (planned model), PyMongo |
| Databases | PostgreSQL 15 (business data), MongoDB 6 (AI logs), Redis 7 (cache / JWT blacklist) |
| Notifications | Firebase Cloud Messaging |
| DevOps | Docker Compose, GitHub Actions |
| Project management | Scrum, Taiga.io |
| Design | Figma |

---

## 📁 Repository Structure

```
smart-rdv/
├── backend/                  # Spring Boot API
│   └── src/main/java/com/smartrdv/
│       ├── controller/
│       ├── service/
│       ├── repository/
│       ├── entity/
│       ├── dto/
│       ├── security/
│       ├── exception/
│       └── config/
├── ia-service/               # Python FastAPI microservice
│   └── main.py
├── smartrdv-mobile/          # Expo React Native app
│   ├── app/                  # Expo Router (file-based navigation)
│   │   ├── (auth)/           # login, register
│   │   ├── (patient)/        # home, search, doctor/[id], slots, booking/*, ...
│   │   ├── (medecin)/        # dashboard, appointments, patient/[id], slots
│   │   └── (admin)/          # dashboard, users
│   ├── components/           # DoctorCard, AppointmentCard, PriorityBadge, ui/*
│   ├── hooks/                # useAuth, useDoctors, useAppointments, useNotifications
│   ├── services/             # api.ts (Axios), authService, doctorService, iaService...
│   ├── store/                # Zustand stores (auth, appointment/questionnaire)
│   ├── constants/            # Colors, Config
│   └── types/                # User, Doctor, Appointment, Priority
├── docker-compose.yml
├── .github/workflows/ci.yml
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Docker & Docker Compose
- Java 17 + Maven (to run the backend outside Docker)
- Python 3.11+ (to run the AI service outside Docker)
- Node.js 18+ and the Expo CLI / Expo Go app (for the mobile app)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/smart-rdv.git
cd smart-rdv
```

### 2. Configure environment variables

Create a `.env` file at the project root (**never commit it** — make sure it is in `.gitignore`):

```env
DB_PASSWORD=change_me
JWT_SECRET=change_me_to_a_random_string_of_at_least_256_bits
FIREBASE_SERVER_KEY=your_firebase_server_key
IA_MODEL_PATH=/app/models/priority_model_v1.pkl
```

### 3. Start the infrastructure and services with Docker

```bash
docker compose up -d --build
```

| Service | Port | Description |
|---|---|---|
| `postgres` | 5432 | Relational database |
| `mongodb` | 27017 | AI logs |
| `redis` | 6379 | Cache / JWT blacklist |
| `backend` | 8080 | Spring Boot API |
| `ia-service` | 8000 | FastAPI AI service |

### 4. Run the AI service locally (optional)

```bash
cd ia-service
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install fastapi uvicorn pymongo
uvicorn main:app --reload --port 8000
```

Interactive docs: <http://localhost:8000/docs>

### 5. Run the backend locally (optional)

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### 6. Run the mobile app

```bash
cd smartrdv-mobile
npm install
npx expo start
```

Scan the QR code with **Expo Go**, or press `a` (Android emulator) / `i` (iOS simulator).

Set the API URL through an environment variable:

```env
# smartrdv-mobile/.env
EXPO_PUBLIC_API_URL=http://10.0.2.2:8080     # Android emulator → host machine
```

> On a physical device, use your computer's local network IP instead of `10.0.2.2`.

---

## 🧠 AI Service

The AI microservice receives the patient's symptoms and returns a priority score. Every analysis is logged to MongoDB (`ia_logs` collection).

### Current implementation (`ia-service/main.py`)

The current version is a **rule-based scoring engine** that adds weighted points for each risk factor:

| Factor | Points |
|---|---|
| Breathing difficulty | +40 |
| Fever | +20 (+15 more if pain level > 7) |
| Pain level ≥ 8 / ≥ 5 / ≥ 3 | +25 / +15 / +5 |
| Symptom duration > 7 days / > 3 days | +10 / +5 |
| Age > 65 or < 5 | +15 |

| Total score | Priority |
|---|---|
| ≥ 70 | `critique` |
| ≥ 50 | `urgent` |
| ≥ 25 | `modere` |
| < 25 | `faible` |

### Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Service status |
| GET | `/health` | Health check (includes MongoDB status) |
| POST | `/api/ia/score` | Compute the priority score |

### Example

**Request**

```bash
curl -X POST http://localhost:8000/api/ia/score \
  -H "Content-Type: application/json" \
  -d '{
    "symptoms": {
      "fever": true,
      "difficulty_breathing": true,
      "pain_level": 8,
      "age": 70,
      "duration_days": 5
    }
  }'
```

**Response**

```json
{
  "priority": "critique",
  "score": 100,
  "confidence": 0.85,
  "recommendation": "🟥 URGENCE - Consultation immédiate",
  "saved_to_db": true,
  "log_id": "..."
}
```

### Planned ML model

The target design (see the specification) is a **Random Forest Classifier** (scikit-learn, 100 trees, max depth 10) using 8 features: `fievre`, `niveau_douleur`, `duree_symptomes`, `difficulte_respiratoire`, `antecedents_chroniques`, `age_patient`, `symptomes_neurologiques`, `specialite_cible`.

- Minimum confidence threshold: **60 %** — below it, the default score **MODÉRÉ** is applied.
- Full log persisted in MongoDB: input features, predicted score, class probabilities, model version, inference time, timestamp.
- A TTL index of **90 days** automatically purges old logs.
- A TensorFlow/Keras MLP is envisaged for future versions.

### Fallback behavior

If the AI service cannot be reached, the backend (and the mobile `iaService`) returns the default score **MODÉRÉ** with confidence `0`.

---

## 🔌 REST API Overview

Base URL: `http://localhost:8080`. All routes except those marked *Public* require `Authorization: Bearer <token>`.

### Authentication — `/api/auth`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register a new patient |
| POST | `/api/auth/login` | Public | Login → access token + refresh token + role |
| POST | `/api/auth/refresh` | Public | Renew the access token |
| POST | `/api/auth/logout` | Authenticated | Invalidate the refresh token |

### Doctors — `/api/medecins`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/medecins?specialite=&ville=&notation_min=&disponible=` | Patient, Admin | Filtered doctor list |
| GET | `/api/medecins/{id}` | Patient, Admin | Doctor profile |
| GET | `/api/medecins/{id}/creneaux?date=` | Patient | Available slots |
| PUT | `/api/medecins/{id}` | Doctor, Admin | Update profile |
| POST | `/api/medecins/{id}/creneaux` | Doctor | Add a slot |
| DELETE | `/api/medecins/{id}/creneaux/{c}` | Doctor | Delete a slot |

### Appointments — `/api/rdv`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/rdv` | Patient | Create an appointment |
| GET | `/api/rdv/patient/{id}` | Patient | Patient's appointments |
| GET | `/api/rdv/medecin/{id}` | Doctor | Doctor's agenda |
| PUT | `/api/rdv/{id}/statut` | Doctor, Admin | Change status (+ push notification) |
| DELETE | `/api/rdv/{id}` | Patient, Admin | Cancel an appointment |

### Patients — `/api/patients`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/patients/{id}` | Patient, Doctor, Admin | Profile + medical record |
| PUT | `/api/patients/{id}` | Patient, Admin | Update medical profile |
| PUT | `/api/patients/{id}/fcm-token` | Patient | Update the Firebase token |
| DELETE | `/api/patients/{id}/account` | Patient | Right to erasure |

### AI & Admin

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/ia/score` | Patient | Submit questionnaire → priority score |
| POST | `/api/ia/chatbot` | Patient | Medical chatbot (optional) |
| GET | `/api/admin/stats` | Admin | Dashboard statistics |
| GET | `/api/admin/users` | Admin | User management |

---

## 🗄️ Data Model

### PostgreSQL

- **utilisateurs** — parent table (JPA `JOINED` inheritance): `id`, `nom`, `prenom`, `email` (unique), `password_hash`, `telephone`, `role`, `actif`, `created_at`
- **patients** — `age`, `allergies`, `antecedents`, `groupe_sanguin`, `fcm_token`
- **medecins** — `specialite`, `ville`, `adresse_cabinet`, `notation`, `nb_avis`, `disponible`
- **creneaux** — `medecin_id`, `date_dispo`, `heure_debut`, `heure_fin`, `duree_minutes`, `est_disponible`
- **rendez_vous** — `patient_id`, `medecin_id`, `creneau_id`, `date_rdv`, `heure`, `statut`, `score_priorite`, `motif`, `created_at`
- **questionnaire_ia** — `rdv_id`, `reponses_json` (JSONB), `score_calcule`, `created_at`

**Relationships:** a doctor has many slots · a patient has many appointments · an appointment links one patient, one doctor and one slot · an appointment has 0..1 AI questionnaire.

### MongoDB — `ia_logs`

Document-oriented, append-only logs of AI analyses (flexible schema across model versions, high write throughput, independent retention via TTL index).

---

## 🔒 Security

- **Authentication:** JWT (access + refresh tokens), stored on mobile with `expo-secure-store` (iOS Keychain / Android Keystore)
- **Authorization:** RBAC (Patient / Doctor / Admin) enforced with `@PreAuthorize`; patients can only access their own data, doctors only their own patients
- **Passwords:** BCrypt (cost 12)
- **In transit:** HTTPS / TLS 1.3
- **At rest:** AES-256 column encryption for sensitive data (`pgcrypto`)
- **Row-Level Security** on sensitive PostgreSQL tables
- **Privacy:** data minimization, explicit consent at registration, right to erasure, audit logging of access to medical data (GDPR principles / Tunisian law n° 2004-63)
- **Consent-based rescheduling:** no appointment is ever moved without the explicit acceptance of the affected patient (2-hour response window, configurable)

---

## 🧪 Testing

| Type | Tool | Scope |
|---|---|---|
| Unit | JUnit 5 + Mockito | Spring Boot services |
| Integration | Spring Boot Test | Controller → Service → DB |
| API | Postman / REST Assured | HTTP codes and response bodies |
| Mobile | Jest + React Native Testing Library | Components, forms, navigation |
| Performance | k6 / JMeter | Booking and AI scoring endpoints |

```bash
# Backend
cd backend && mvn test

# Mobile
cd smartrdv-mobile && npm test
```

CI runs on every push / pull request to `main` through GitHub Actions (`.github/workflows/ci.yml`).

---

## 📆 Scrum Planning

Method: **Scrum**, 2-week sprints, managed with **Taiga**.

| Sprint | Content | Story Points |
|---|---|:---:|
| Sprint 0 | Project setup, environment, architecture | – |
| Sprint 1 | Authentication (US01) · Doctor search (US02) · Basic booking (US03) | 13 |
| Sprint 2 | AI questionnaire (US04) · Doctor schedule (US05) · AI reorganization (US11) | 21 |
| Sprint 3 | Notifications (US06) · Agenda management (US07) · Medical record (US10) | 11 |
| Sprint 4 | Chatbot (US09) · Admin dashboard (US08) | 13 |

### Definition of Done

1. Code compiles and the feature satisfies the user story
2. Unit tests written (at least one per service)
3. REST endpoint tested with Postman (correct HTTP codes)
4. Mobile ↔ backend integration validated
5. Code reviewed through a Pull Request
6. Realistic test data available
7. Security verified (protected routes reject requests without a valid token)
8. Task closed in Taiga with a closing comment

---

## 🗺️ Roadmap

- [x] Specification, UML diagrams and wireframes
- [x] AI service prototype (rule-based scoring + MongoDB logging)
- [ ] Authentication & role-based navigation
- [ ] Doctor search and appointment booking
- [ ] AI questionnaire integrated in the booking flow
- [ ] Doctor agenda with priority badges
- [ ] Automatic schedule reorganization with patient consent
- [ ] Slot management and patient medical record
- [ ] Push notifications (FCM)
- [ ] Rule-based chatbot
- [ ] Admin dashboard and statistics
- [ ] Replace rule-based scoring with the trained Random Forest model

---

## 👥 Team

| Name | Role |
|---|---|
| _Student 1_ | Developer |
| _Student 2_ | Developer |

Academic supervisor: _to be completed_

---

## 📄 License

Academic project — PFA 2025-2026. _Add a license here if the repository is made public._