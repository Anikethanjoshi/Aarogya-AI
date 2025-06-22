from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from pydantic import BaseModel

router = APIRouter()

class HospitalTool(BaseModel):
    id: str
    name: str
    category: str
    description: str
    uses: List[str]
    specifications: List[str]
    price_range: str
    manufacturer: List[str]
    who_approved: bool
    fda_approved: bool
    departments: List[str]
    complexity: str
    training_required: str

class HospitalEquipment(BaseModel):
    id: str
    name: str
    type: str
    description: str
    technical_specs: dict
    safety_guidelines: List[str]
    maintenance_schedule: str
    certification: List[str]

# Mock hospital tools database
HOSPITAL_TOOLS = [
    {
        "id": "tool_001",
        "name": "Digital Stethoscope",
        "category": "diagnostic",
        "description": "Advanced digital stethoscope with noise cancellation",
        "uses": ["Heart sound examination", "Lung sound analysis", "Telemedicine"],
        "specifications": ["Frequency: 20Hz-20kHz", "Battery: 40+ hours", "Bluetooth enabled"],
        "price_range": "₹15,000 - ₹50,000",
        "manufacturer": ["3M Littmann", "Eko", "Thinklabs"],
        "who_approved": True,
        "fda_approved": True,
        "departments": ["Cardiology", "Pulmonology", "General Medicine"],
        "complexity": "Basic",
        "training_required": "2-4 hours"
    },
    {
        "id": "tool_002",
        "name": "Ultrasound Machine - Portable",
        "category": "imaging",
        "description": "Portable ultrasound for real-time imaging",
        "uses": ["Pregnancy monitoring", "Organ examination", "Emergency diagnostics"],
        "specifications": ["Frequency: 2-15 MHz", "Display: 15-inch LCD", "Battery: 2+ hours"],
        "price_range": "₹2,00,000 - ₹15,00,000",
        "manufacturer": ["GE Healthcare", "Philips", "Siemens"],
        "who_approved": True,
        "fda_approved": True,
        "departments": ["Radiology", "Obstetrics", "Emergency"],
        "complexity": "Intermediate",
        "training_required": "40-80 hours"
    },
    {
        "id": "tool_003",
        "name": "ECG Machine - 12 Lead",
        "category": "cardiac",
        "description": "Digital 12-lead ECG for cardiac analysis",
        "uses": ["Heart rhythm monitoring", "Cardiac diagnosis", "Pre-operative assessment"],
        "specifications": ["12-lead capability", "Digital display", "Thermal printer"],
        "price_range": "₹25,000 - ₹1,50,000",
        "manufacturer": ["Philips", "GE Healthcare", "Schiller"],
        "who_approved": True,
        "fda_approved": True,
        "departments": ["Cardiology", "Emergency", "ICU"],
        "complexity": "Basic",
        "training_required": "8-16 hours"
    }
]

@router.get("/tools/search", response_model=List[HospitalTool])
async def search_hospital_tools(
    query: Optional[str] = Query(None, description="Search term"),
    category: Optional[str] = Query(None, description="Tool category"),
    department: Optional[str] = Query(None, description="Hospital department"),
    complexity: Optional[str] = Query(None, description="Complexity level"),
    who_approved: Optional[bool] = Query(None, description="WHO approved only"),
    limit: int = Query(20, description="Maximum results")
):
    """
    Search hospital tools and equipment
    """
    try:
        filtered_tools = []
        
        for tool in HOSPITAL_TOOLS:
            # Text search
            if query:
                if not (query.lower() in tool["name"].lower() or 
                       query.lower() in tool["description"].lower() or
                       any(query.lower() in use.lower() for use in tool["uses"])):
                    continue
            
            # Apply filters
            if category and tool["category"] != category:
                continue
            if department and department not in tool["departments"]:
                continue
            if complexity and tool["complexity"] != complexity:
                continue
            if who_approved is not None and tool["who_approved"] != who_approved:
                continue
            
            filtered_tools.append(tool)
        
        return filtered_tools[:limit]
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Tool search failed: {str(e)}")

@router.get("/tools/{tool_id}", response_model=HospitalTool)
async def get_tool_details(tool_id: str):
    """
    Get detailed information about a specific hospital tool
    """
    tool = next((t for t in HOSPITAL_TOOLS if t["id"] == tool_id), None)
    if not tool:
        raise HTTPException(status_code=404, detail="Hospital tool not found")
    return tool

@router.get("/categories")
async def get_tool_categories():
    """
    Get all available tool categories
    """
    categories = [
        {"id": "diagnostic", "name": "Diagnostic Equipment", "count": 45},
        {"id": "surgical", "name": "Surgical Instruments", "count": 120},
        {"id": "monitoring", "name": "Monitoring Systems", "count": 35},
        {"id": "imaging", "name": "Medical Imaging", "count": 25},
        {"id": "laboratory", "name": "Laboratory Equipment", "count": 60},
        {"id": "emergency", "name": "Emergency Equipment", "count": 30}
    ]
    return categories

@router.get("/departments")
async def get_hospital_departments():
    """
    Get all hospital departments
    """
    departments = [
        "Cardiology", "Neurology", "Orthopedics", "Pediatrics",
        "Radiology", "Emergency", "ICU", "Surgery", "Laboratory",
        "Pulmonology", "Gastroenterology", "Oncology"
    ]
    return departments

@router.get("/tools/{tool_id}/safety-guidelines")
async def get_tool_safety_guidelines(tool_id: str):
    """
    Get safety guidelines for a specific tool
    """
    tool = next((t for t in HOSPITAL_TOOLS if t["id"] == tool_id), None)
    if not tool:
        raise HTTPException(status_code=404, detail="Tool not found")
    
    # Mock safety guidelines
    guidelines = {
        "pre_use_checks": [
            "Verify equipment calibration",
            "Check power connections",
            "Ensure sterile conditions"
        ],
        "during_use": [
            "Follow manufacturer protocols",
            "Monitor patient vitals",
            "Maintain sterile technique"
        ],
        "post_use": [
            "Clean and disinfect",
            "Store in designated area",
            "Log usage details"
        ],
        "emergency_procedures": [
            "Immediate shutdown protocol",
            "Patient safety measures",
            "Contact technical support"
        ]
    }
    
    return {
        "tool_name": tool["name"],
        "safety_guidelines": guidelines,
        "certification_required": tool["who_approved"] or tool["fda_approved"],
        "training_duration": tool["training_required"]
    }

@router.get("/compliance/who-standards")
async def get_who_compliance_info():
    """
    Get WHO compliance information for medical equipment
    """
    return {
        "who_standards": {
            "quality_management": "ISO 13485",
            "risk_management": "ISO 14971",
            "usability": "IEC 62366",
            "electrical_safety": "IEC 60601"
        },
        "compliance_requirements": [
            "Design controls and documentation",
            "Clinical evaluation and testing",
            "Post-market surveillance",
            "Quality management system"
        ],
        "certification_process": [
            "Technical documentation review",
            "Quality system assessment",
            "Clinical data evaluation",
            "Ongoing compliance monitoring"
        ]
    }