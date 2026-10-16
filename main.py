from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from datetime import datetime

# Créer l'application FastAPI
app = FastAPI(
    title="SMART RDV IA Service",
    description="Service de priorisation automatique des rendez-vous médicaux",
    version="1.0.0"
)

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connexion à MongoDB
try:
    mongo_client = MongoClient("mongodb://localhost:27017/")
    db = mongo_client["smartrdv_db"]
    ia_logs = db["ia_logs"]
    print("✅ Connexion à MongoDB réussie !")
    mongo_status = "connected"
except Exception as e:
    print(f"❌ Erreur de connexion à MongoDB: {e}")
    ia_logs = None
    mongo_status = "disconnected"

@app.get("/")
def read_root():
    return {
        "message": "SMART RDV IA Service is running!",
        "status": "healthy",
        "version": "1.0.0",
        "mongodb": mongo_status
    }

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "ia-service", "mongodb": mongo_status}

@app.post("/api/ia/score")
def calculate_priority(patient_data: dict):
    """
    Calcule le score de priorité basé sur les symptômes
    """
    symptoms = patient_data.get("symptoms", {})
    
    fever = symptoms.get("fever", False)
    difficulty_breathing = symptoms.get("difficulty_breathing", False)
    pain_level = symptoms.get("pain_level", 0)
    age = symptoms.get("age", 30)
    duration_days = symptoms.get("duration_days", 0)
    
    # Algorithme de scoring
    score = 0
    
    if difficulty_breathing:
        score += 40
    if fever:
        score += 20
        if pain_level > 7:
            score += 15
    if pain_level >= 8:
        score += 25
    elif pain_level >= 5:
        score += 15
    elif pain_level >= 3:
        score += 5
    if duration_days > 7:
        score += 10
    elif duration_days > 3:
        score += 5
    if age > 65:
        score += 15
    elif age < 5:
        score += 15
    
    # Déterminer la priorité
    if score >= 70:
        priority = "critique"
        recommendation = "🟥 URGENCE - Consultation immédiate"
    elif score >= 50:
        priority = "urgent"
        recommendation = "🟧 URGENT - Consultation dans les 24h"
    elif score >= 25:
        priority = "modere"
        recommendation = "🟨 MODÉRÉ - Consultation dans la semaine"
    else:
        priority = "faible"
        recommendation = "🟩 FAIBLE - Consultation non urgente"
    
    score_final = min(score, 100)
    
    response = {
        "priority": priority,
        "score": score_final,
        "confidence": 0.85,
        "recommendation": recommendation
    }
    
    # Sauvegarder dans MongoDB
    if ia_logs is not None:
        log_entry = {
            "timestamp": datetime.now(),
            "symptoms": symptoms,
            "score": score_final,
            "priority": priority,
            "recommendation": recommendation,
            "patient_data": patient_data
        }
        try:
            result = ia_logs.insert_one(log_entry)
            response["saved_to_db"] = True
            response["log_id"] = str(result.inserted_id)
        except Exception as e:
            print(f"Erreur sauvegarde: {e}")
            response["saved_to_db"] = False
    else:
        response["saved_to_db"] = False
