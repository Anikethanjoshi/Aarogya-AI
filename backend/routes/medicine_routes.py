from fastapi import APIRouter, HTTPException, Query, Depends
from typing import List, Optional
from pydantic import BaseModel
import asyncio
from db import db

router = APIRouter()

class Medicine(BaseModel):
    id: str
    name: str
    generic_name: str
    category: str
    description: str
    composition: str
    dosage: str
    side_effects: List[str]
    benefits: List[str]
    contraindications: List[str]
    jan_aushadhi_price: Optional[str]
    brand_price: Optional[str]
    who_approved: bool
    fda_approved: bool
    jan_aushadhi_available: bool
    prescription_required: bool
    manufacturer: List[str]

class MedicineSearch(BaseModel):
    query: str
    category: Optional[str] = None
    prescription_required: Optional[bool] = None
    jan_aushadhi_only: Optional[bool] = False

# Mock medicine database - In production, this would be MongoDB
MEDICINES_DB = [
    {
        "id": "med_001",
        "name": "Paracetamol",
        "generic_name": "Acetaminophen",
        "category": "analgesic",
        "description": "Common pain reliever and fever reducer",
        "composition": "Paracetamol 500mg",
        "dosage": "500mg-1000mg every 4-6 hours",
        "side_effects": ["Nausea", "Stomach upset", "Liver damage (overdose)"],
        "benefits": ["Pain relief", "Fever reduction", "Safe for most people"],
        "contraindications": ["Severe liver disease", "Alcohol dependency"],
        "jan_aushadhi_price": "₹2-5 per tablet",
        "brand_price": "₹8-15 per tablet",
        "who_approved": True,
        "fda_approved": True,
        "jan_aushadhi_available": True,
        "prescription_required": False,
        "manufacturer": ["Cipla", "Sun Pharma", "Dr. Reddy's"]
    },
    {
        "id": "med_002",
        "name": "Amoxicillin",
        "generic_name": "Amoxicillin",
        "category": "antibiotic",
        "description": "Broad-spectrum antibiotic for bacterial infections",
        "composition": "Amoxicillin 500mg",
        "dosage": "250mg-500mg every 8 hours",
        "side_effects": ["Diarrhea", "Nausea", "Skin rash", "Allergic reactions"],
        "benefits": ["Treats bacterial infections", "Well-tolerated", "Broad spectrum"],
        "contraindications": ["Penicillin allergy", "Mononucleosis"],
        "jan_aushadhi_price": "₹15-25 per course",
        "brand_price": "₹50-100 per course",
        "who_approved": True,
        "fda_approved": True,
        "jan_aushadhi_available": True,
        "prescription_required": True,
        "manufacturer": ["Cipla", "Ranbaxy", "Aurobindo"]
    },
    {
        "id": "med_003",
        "name": "Metformin",
        "generic_name": "Metformin Hydrochloride",
        "category": "diabetes",
        "description": "First-line medication for type 2 diabetes",
        "composition": "Metformin HCl 500mg",
        "dosage": "500mg twice daily with meals",
        "side_effects": ["GI upset", "Diarrhea", "Metallic taste"],
        "benefits": ["Lowers blood glucose", "Weight neutral", "CV benefits"],
        "contraindications": ["Kidney disease", "Liver disease", "Heart failure"],
        "jan_aushadhi_price": "₹3-8 per tablet",
        "brand_price": "₹12-25 per tablet",
        "who_approved": True,
        "fda_approved": True,
        "jan_aushadhi_available": True,
        "prescription_required": True,
        "manufacturer": ["Sun Pharma", "Cipla", "Dr. Reddy's"]
    }
]

@router.get("/search", response_model=List[Medicine])
async def search_medicines(
    query: str = Query(..., description="Search term for medicines"),
    category: Optional[str] = Query(None, description="Medicine category filter"),
    prescription_required: Optional[bool] = Query(None, description="Filter by prescription requirement"),
    jan_aushadhi_only: bool = Query(False, description="Show only Jan Aushadhi available medicines"),
    limit: int = Query(20, description="Maximum number of results")
):
    """
    Search medicines by name, generic name, or description
    """
    try:
        # Filter medicines based on search criteria
        filtered_medicines = []
        
        for medicine in MEDICINES_DB:
            # Text search
            if (query.lower() in medicine["name"].lower() or 
                query.lower() in medicine["generic_name"].lower() or 
                query.lower() in medicine["description"].lower()):
                
                # Apply filters
                if category and medicine["category"] != category:
                    continue
                if prescription_required is not None and medicine["prescription_required"] != prescription_required:
                    continue
                if jan_aushadhi_only and not medicine["jan_aushadhi_available"]:
                    continue
                
                filtered_medicines.append(medicine)
        
        return filtered_medicines[:limit]
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search failed: {str(e)}")

@router.get("/categories")
async def get_medicine_categories():
    """
    Get all available medicine categories
    """
    categories = [
        {"id": "analgesic", "name": "Pain Relief", "count": 15},
        {"id": "antibiotic", "name": "Antibiotics", "count": 25},
        {"id": "diabetes", "name": "Diabetes", "count": 12},
        {"id": "cardiovascular", "name": "Heart & Blood", "count": 18},
        {"id": "respiratory", "name": "Respiratory", "count": 10},
        {"id": "gastrointestinal", "name": "Digestive", "count": 14}
    ]
    return categories

@router.get("/{medicine_id}", response_model=Medicine)
async def get_medicine_details(medicine_id: str):
    """
    Get detailed information about a specific medicine
    """
    medicine = next((m for m in MEDICINES_DB if m["id"] == medicine_id), None)
    if not medicine:
        raise HTTPException(status_code=404, detail="Medicine not found")
    return medicine

@router.get("/jan-aushadhi/compare/{medicine_name}")
async def compare_jan_aushadhi_prices(medicine_name: str):
    """
    Compare Jan Aushadhi prices with brand prices
    """
    medicine = next((m for m in MEDICINES_DB if m["name"].lower() == medicine_name.lower()), None)
    if not medicine:
        raise HTTPException(status_code=404, detail="Medicine not found")
    
    if not medicine["jan_aushadhi_available"]:
        raise HTTPException(status_code=404, detail="Medicine not available in Jan Aushadhi")
    
    return {
        "medicine_name": medicine["name"],
        "jan_aushadhi_price": medicine["jan_aushadhi_price"],
        "brand_price": medicine["brand_price"],
        "savings_percentage": "60-80%",
        "availability": "Available at 8000+ Jan Aushadhi stores"
    }

@router.post("/interaction-check")
async def check_drug_interactions(medicine_ids: List[str]):
    """
    Check for potential drug interactions between medicines
    """
    if len(medicine_ids) < 2:
        raise HTTPException(status_code=400, detail="At least 2 medicines required for interaction check")
    
    # Mock interaction data - In production, use drug interaction APIs
    interactions = [
        {
            "medicine_1": "Paracetamol",
            "medicine_2": "Warfarin",
            "severity": "moderate",
            "description": "May increase bleeding risk",
            "recommendation": "Monitor INR levels closely"
        }
    ]
    
    return {
        "interactions_found": len(interactions),
        "interactions": interactions,
        "safe_to_combine": len(interactions) == 0
    }