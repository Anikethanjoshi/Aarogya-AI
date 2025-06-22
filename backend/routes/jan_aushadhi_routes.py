from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from pydantic import BaseModel
import asyncio

router = APIRouter()

class JanAushadhiStore(BaseModel):
    id: str
    name: str
    address: str
    city: str
    state: str
    pincode: str
    phone: str
    latitude: float
    longitude: float
    operating_hours: str
    medicines_available: int
    verified: bool

class JanAushadhiMedicine(BaseModel):
    id: str
    name: str
    generic_name: str
    price: str
    pack_size: str
    manufacturer: str
    availability: str

# Mock Jan Aushadhi stores database
JAN_AUSHADHI_STORES = [
    {
        "id": "ja_001",
        "name": "Jan Aushadhi Store - Koramangala",
        "address": "5th Block, Koramangala",
        "city": "Bangalore",
        "state": "Karnataka",
        "pincode": "560095",
        "phone": "+91 80 4112 3456",
        "latitude": 12.9352,
        "longitude": 77.6245,
        "operating_hours": "9:00 AM - 9:00 PM",
        "medicines_available": 450,
        "verified": True
    },
    {
        "id": "ja_002",
        "name": "Jan Aushadhi Store - Indiranagar",
        "address": "100 Feet Road, Indiranagar",
        "city": "Bangalore",
        "state": "Karnataka",
        "pincode": "560038",
        "phone": "+91 80 2521 7890",
        "latitude": 12.9716,
        "longitude": 77.6412,
        "operating_hours": "8:00 AM - 10:00 PM",
        "medicines_available": 520,
        "verified": True
    },
    {
        "id": "ja_003",
        "name": "Jan Aushadhi Store - HSR Layout",
        "address": "HSR Layout, Sector 1",
        "city": "Bangalore",
        "state": "Karnataka",
        "pincode": "560102",
        "phone": "+91 80 3988 1234",
        "latitude": 12.9116,
        "longitude": 77.6412,
        "operating_hours": "9:00 AM - 8:00 PM",
        "medicines_available": 380,
        "verified": True
    }
]

@router.get("/stores/search", response_model=List[JanAushadhiStore])
async def search_jan_aushadhi_stores(
    city: Optional[str] = Query(None, description="City name"),
    state: Optional[str] = Query(None, description="State name"),
    pincode: Optional[str] = Query(None, description="Pincode"),
    latitude: Optional[float] = Query(None, description="User latitude"),
    longitude: Optional[float] = Query(None, description="User longitude"),
    radius_km: float = Query(10, description="Search radius in kilometers"),
    limit: int = Query(20, description="Maximum number of results")
):
    """
    Search for Jan Aushadhi stores by location
    """
    try:
        filtered_stores = []
        
        for store in JAN_AUSHADHI_STORES:
            # Filter by city/state/pincode
            if city and store["city"].lower() != city.lower():
                continue
            if state and store["state"].lower() != state.lower():
                continue
            if pincode and store["pincode"] != pincode:
                continue
            
            # Calculate distance if coordinates provided
            if latitude and longitude:
                # Simple distance calculation (in production, use proper geospatial queries)
                lat_diff = abs(store["latitude"] - latitude)
                lng_diff = abs(store["longitude"] - longitude)
                distance = ((lat_diff ** 2) + (lng_diff ** 2)) ** 0.5 * 111  # Rough km conversion
                
                if distance <= radius_km:
                    store["distance_km"] = round(distance, 2)
                    filtered_stores.append(store)
            else:
                filtered_stores.append(store)
        
        return filtered_stores[:limit]
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Store search failed: {str(e)}")

@router.get("/stores/{store_id}", response_model=JanAushadhiStore)
async def get_jan_aushadhi_store_details(store_id: str):
    """
    Get detailed information about a specific Jan Aushadhi store
    """
    store = next((s for s in JAN_AUSHADHI_STORES if s["id"] == store_id), None)
    if not store:
        raise HTTPException(status_code=404, detail="Jan Aushadhi store not found")
    return store

@router.get("/medicines/available")
async def get_jan_aushadhi_medicines(
    store_id: Optional[str] = Query(None, description="Specific store ID"),
    category: Optional[str] = Query(None, description="Medicine category"),
    search: Optional[str] = Query(None, description="Search term")
):
    """
    Get medicines available at Jan Aushadhi stores
    """
    # Mock Jan Aushadhi medicines data
    medicines = [
        {
            "id": "jam_001",
            "name": "Paracetamol",
            "generic_name": "Acetaminophen",
            "price": "₹2.50 per strip",
            "pack_size": "10 tablets",
            "manufacturer": "IDPL",
            "availability": "In Stock"
        },
        {
            "id": "jam_002",
            "name": "Amoxicillin",
            "generic_name": "Amoxicillin",
            "price": "₹18.00 per strip",
            "pack_size": "10 capsules",
            "manufacturer": "HAL",
            "availability": "In Stock"
        },
        {
            "id": "jam_003",
            "name": "Metformin",
            "generic_name": "Metformin HCl",
            "price": "₹6.50 per strip",
            "pack_size": "10 tablets",
            "manufacturer": "IDPL",
            "availability": "In Stock"
        }
    ]
    
    # Apply filters
    if search:
        medicines = [m for m in medicines if search.lower() in m["name"].lower() or search.lower() in m["generic_name"].lower()]
    
    return {
        "store_id": store_id,
        "medicines_count": len(medicines),
        "medicines": medicines
    }

@router.get("/savings-calculator")
async def calculate_jan_aushadhi_savings(
    medicine_name: str = Query(..., description="Medicine name"),
    quantity: int = Query(1, description="Quantity needed")
):
    """
    Calculate potential savings with Jan Aushadhi medicines
    """
    # Mock calculation - In production, fetch real prices
    jan_aushadhi_price = 2.50 * quantity
    brand_price = 12.00 * quantity
    savings = brand_price - jan_aushadhi_price
    savings_percentage = (savings / brand_price) * 100
    
    return {
        "medicine_name": medicine_name,
        "quantity": quantity,
        "jan_aushadhi_price": f"₹{jan_aushadhi_price:.2f}",
        "brand_price": f"₹{brand_price:.2f}",
        "savings_amount": f"₹{savings:.2f}",
        "savings_percentage": f"{savings_percentage:.1f}%",
        "recommendation": "Choose Jan Aushadhi for significant savings"
    }

@router.get("/statistics")
async def get_jan_aushadhi_statistics():
    """
    Get Jan Aushadhi program statistics
    """
    return {
        "total_stores": 8500,
        "states_covered": 36,
        "medicines_available": 1500,
        "average_savings": "50-90%",
        "beneficiaries": "10+ crores",
        "quality_certification": "WHO-GMP",
        "government_initiative": True,
        "established_year": 2008
    }