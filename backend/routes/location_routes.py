from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from pydantic import BaseModel
import math

router = APIRouter()

class HealthcareLocation(BaseModel):
    id: str
    name: str
    type: str
    address: str
    city: str
    state: str
    country: str
    latitude: float
    longitude: float
    phone: str
    website: Optional[str]
    rating: float
    reviews_count: int
    services: List[str]
    operating_hours: str
    emergency_services: bool
    insurance_accepted: List[str]

class LocationSearchRequest(BaseModel):
    latitude: float
    longitude: float
    radius_km: float = 10
    location_type: Optional[str] = None
    services: Optional[List[str]] = None

# Mock healthcare locations database
HEALTHCARE_LOCATIONS = [
    {
        "id": "loc_001",
        "name": "Apollo Hospital Bannerghatta",
        "type": "hospital",
        "address": "Bannerghatta Road, Hulimavu",
        "city": "Bangalore",
        "state": "Karnataka",
        "country": "India",
        "latitude": 12.8546,
        "longitude": 77.6211,
        "phone": "+91 80 2692 2222",
        "website": "https://apollohospitals.com",
        "rating": 4.5,
        "reviews_count": 2847,
        "services": ["Emergency", "ICU", "Surgery", "Cardiology", "Neurology"],
        "operating_hours": "24/7",
        "emergency_services": True,
        "insurance_accepted": ["Cashless", "CGHS", "ESI", "Mediclaim"]
    },
    {
        "id": "loc_002",
        "name": "Fortis Hospital Cunningham Road",
        "type": "hospital",
        "address": "14, Cunningham Road",
        "city": "Bangalore",
        "state": "Karnataka",
        "country": "India",
        "latitude": 12.9716,
        "longitude": 77.5946,
        "phone": "+91 80 6621 4444",
        "website": "https://fortishealthcare.com",
        "rating": 4.4,
        "reviews_count": 1923,
        "services": ["Emergency", "Neurology", "Orthopedics", "Oncology"],
        "operating_hours": "24/7",
        "emergency_services": True,
        "insurance_accepted": ["Cashless", "CGHS", "ESI"]
    },
    {
        "id": "loc_003",
        "name": "MedPlus Pharmacy Indiranagar",
        "type": "pharmacy",
        "address": "100 Feet Road, Indiranagar",
        "city": "Bangalore",
        "state": "Karnataka",
        "country": "India",
        "latitude": 12.9716,
        "longitude": 77.6412,
        "phone": "+91 80 2521 7890",
        "website": "https://medplusmart.com",
        "rating": 4.1,
        "reviews_count": 342,
        "services": ["Prescription Medicines", "OTC Drugs", "Health Products"],
        "operating_hours": "8:00 AM - 11:00 PM",
        "emergency_services": False,
        "insurance_accepted": ["Mediclaim", "Health Insurance"]
    }
]

def calculate_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """
    Calculate distance between two points using Haversine formula
    """
    R = 6371  # Earth's radius in kilometers
    
    lat1_rad = math.radians(lat1)
    lon1_rad = math.radians(lon1)
    lat2_rad = math.radians(lat2)
    lon2_rad = math.radians(lon2)
    
    dlat = lat2_rad - lat1_rad
    dlon = lon2_rad - lon1_rad
    
    a = math.sin(dlat/2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon/2)**2
    c = 2 * math.asin(math.sqrt(a))
    
    return R * c

@router.post("/search", response_model=List[HealthcareLocation])
async def search_healthcare_locations(search_request: LocationSearchRequest):
    """
    Search for healthcare locations near given coordinates
    """
    try:
        results = []
        
        for location in HEALTHCARE_LOCATIONS:
            # Calculate distance
            distance = calculate_distance(
                search_request.latitude, search_request.longitude,
                location["latitude"], location["longitude"]
            )
            
            # Filter by radius
            if distance <= search_request.radius_km:
                # Filter by type
                if search_request.location_type and location["type"] != search_request.location_type:
                    continue
                
                # Filter by services
                if search_request.services:
                    if not any(service in location["services"] for service in search_request.services):
                        continue
                
                # Add distance to result
                location_with_distance = location.copy()
                location_with_distance["distance_km"] = round(distance, 2)
                results.append(location_with_distance)
        
        # Sort by distance
        results.sort(key=lambda x: x["distance_km"])
        
        return results
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Location search failed: {str(e)}")

@router.get("/nearby")
async def get_nearby_locations(
    latitude: float = Query(..., description="User latitude"),
    longitude: float = Query(..., description="User longitude"),
    radius_km: float = Query(10, description="Search radius in kilometers"),
    location_type: Optional[str] = Query(None, description="Filter by location type"),
    emergency_only: bool = Query(False, description="Show only emergency services"),
    limit: int = Query(20, description="Maximum results")
):
    """
    Get nearby healthcare locations
    """
    try:
        results = []
        
        for location in HEALTHCARE_LOCATIONS:
            distance = calculate_distance(latitude, longitude, location["latitude"], location["longitude"])
            
            if distance <= radius_km:
                if location_type and location["type"] != location_type:
                    continue
                if emergency_only and not location["emergency_services"]:
                    continue
                
                location_with_distance = location.copy()
                location_with_distance["distance_km"] = round(distance, 2)
                results.append(location_with_distance)
        
        results.sort(key=lambda x: x["distance_km"])
        return results[:limit]
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Nearby search failed: {str(e)}")

@router.get("/{location_id}", response_model=HealthcareLocation)
async def get_location_details(location_id: str):
    """
    Get detailed information about a specific healthcare location
    """
    location = next((l for l in HEALTHCARE_LOCATIONS if l["id"] == location_id), None)
    if not location:
        raise HTTPException(status_code=404, detail="Healthcare location not found")
    return location

@router.get("/types/available")
async def get_location_types():
    """
    Get all available healthcare location types
    """
    types = [
        {"id": "hospital", "name": "Hospitals", "icon": "🏥"},
        {"id": "pharmacy", "name": "Pharmacies", "icon": "💊"},
        {"id": "clinic", "name": "Clinics", "icon": "🩺"},
        {"id": "diagnostic", "name": "Diagnostic Centers", "icon": "🔬"},
        {"id": "jan-aushadhi", "name": "Jan Aushadhi Stores", "icon": "🏪"},
        {"id": "emergency", "name": "Emergency Services", "icon": "🚑"}
    ]
    return types

@router.get("/services/available")
async def get_available_services():
    """
    Get all available healthcare services
    """
    services = [
        "Emergency", "ICU", "Surgery", "Cardiology", "Neurology",
        "Orthopedics", "Pediatrics", "Gynecology", "Oncology",
        "Radiology", "Laboratory", "Pharmacy", "Physiotherapy"
    ]
    return services

@router.get("/{location_id}/directions")
async def get_directions(
    location_id: str,
    from_latitude: float = Query(..., description="Starting latitude"),
    from_longitude: float = Query(..., description="Starting longitude")
):
    """
    Get directions to a healthcare location
    """
    location = next((l for l in HEALTHCARE_LOCATIONS if l["id"] == location_id), None)
    if not location:
        raise HTTPException(status_code=404, detail="Location not found")
    
    distance = calculate_distance(
        from_latitude, from_longitude,
        location["latitude"], location["longitude"]
    )
    
    # Generate Google Maps URL
    google_maps_url = f"https://www.google.com/maps/dir/{from_latitude},{from_longitude}/{location['latitude']},{location['longitude']}"
    
    return {
        "location_name": location["name"],
        "distance_km": round(distance, 2),
        "estimated_time": f"{int(distance * 3)} minutes",  # Rough estimate
        "google_maps_url": google_maps_url,
        "coordinates": {
            "latitude": location["latitude"],
            "longitude": location["longitude"]
        }
    }