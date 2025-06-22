from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum

class UserRole(str, Enum):
    PATIENT = "patient"
    DOCTOR = "doctor"
    PHARMACIST = "pharmacist"
    ADMIN = "admin"

class SubscriptionPlan(str, Enum):
    BASIC = "basic"
    PREMIUM = "premium"
    ENTERPRISE = "enterprise"

class User(BaseModel):
    id: str
    email: EmailStr
    name: str
    role: UserRole = UserRole.PATIENT
    subscription: SubscriptionPlan = SubscriptionPlan.BASIC
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    country: Optional[str] = "India"
    language_preference: str = "en"
    created_at: datetime
    updated_at: datetime
    is_verified: bool = False
    tavus_api_key: Optional[str] = None

class UserCreate(BaseModel):
    email: EmailStr
    name: str
    password: str
    role: UserRole = UserRole.PATIENT
    phone: Optional[str] = None
    language_preference: str = "en"

class UserUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    language_preference: Optional[str] = None

class Medicine(BaseModel):
    id: str
    name: str
    generic_name: str
    category: str
    subcategory: Optional[str] = None
    description: str
    composition: str
    dosage: str
    max_dose: str
    side_effects: List[str]
    benefits: List[str]
    contraindications: List[str]
    interactions: List[str]
    jan_aushadhi_price: Optional[str] = None
    brand_price: str
    who_approved: bool = False
    fda_approved: bool = False
    jan_aushadhi_available: bool = False
    prescription_required: bool = True
    age_group: List[str]
    pregnancy_category: str
    breastfeeding_safe: bool
    storage_conditions: str
    manufacturer: List[str]
    created_at: datetime
    updated_at: datetime

class HospitalTool(BaseModel):
    id: str
    name: str
    category: str
    subcategory: str
    description: str
    uses: List[str]
    benefits: List[str]
    specifications: List[str]
    price_range: str
    manufacturer: List[str]
    who_approved: bool = False
    fda_approved: bool = False
    ce_marked: bool = False
    departments: List[str]
    body_parts: List[str]
    complexity: str  # Basic, Intermediate, Advanced
    maintenance_schedule: str
    training_required: str
    image_url: Optional[str] = None
    created_at: datetime
    updated_at: datetime

class HealthcareLocation(BaseModel):
    id: str
    name: str
    type: str  # hospital, pharmacy, clinic, diagnostic, jan-aushadhi
    address: str
    city: str
    state: str
    country: str
    pincode: str
    latitude: float
    longitude: float
    phone: str
    email: Optional[str] = None
    website: Optional[str] = None
    rating: float = 0.0
    reviews_count: int = 0
    services: List[str]
    facilities: List[str]
    operating_hours: str
    emergency_services: bool = False
    insurance_accepted: List[str]
    verified: bool = False
    images: List[str] = []
    created_at: datetime
    updated_at: datetime

class ConsultationSession(BaseModel):
    id: str
    user_id: str
    ai_agent_type: str  # doctor, nurse, specialist
    status: str  # active, completed, cancelled
    start_time: datetime
    end_time: Optional[datetime] = None
    duration_minutes: Optional[int] = None
    conversation_log: List[Dict[str, Any]] = []
    health_topics_discussed: List[str] = []
    recommendations: List[str] = []
    tavus_session_id: Optional[str] = None
    user_satisfaction: Optional[int] = None  # 1-5 rating
    created_at: datetime
    updated_at: datetime

class HealthRecord(BaseModel):
    id: str
    user_id: str
    record_type: str  # consultation, prescription, test_result, vaccination
    title: str
    description: str
    data: Dict[str, Any]
    doctor_name: Optional[str] = None
    hospital_name: Optional[str] = None
    date_recorded: datetime
    attachments: List[str] = []
    is_private: bool = True
    created_at: datetime
    updated_at: datetime

class APIResponse(BaseModel):
    success: bool
    message: str
    data: Optional[Any] = None
    error: Optional[str] = None
    timestamp: datetime = datetime.now()

class SearchRequest(BaseModel):
    query: str
    filters: Optional[Dict[str, Any]] = {}
    limit: int = 20
    offset: int = 0

class LocationSearchRequest(BaseModel):
    latitude: float
    longitude: float
    radius_km: float = 10
    location_type: Optional[str] = None
    services: Optional[List[str]] = None
    emergency_only: bool = False