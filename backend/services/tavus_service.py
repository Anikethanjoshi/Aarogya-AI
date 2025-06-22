import httpx
import asyncio
from typing import Dict, List, Optional, Any
import os
from fastapi import HTTPException
import logging
import json

logger = logging.getLogger(__name__)

class TavusService:
    """Service for integrating with Tavus AI video agents"""
    
    def __init__(self):
        self.api_key = os.getenv("TAVUS_API_KEY")
        self.base_url = "https://api.tavus.io/v1"
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
    
    async def create_ai_agent(self, agent_config: Dict) -> Dict:
        """Create a new AI health agent"""
        try:
            async with httpx.AsyncClient() as client:
                url = f"{self.base_url}/agents"
                
                payload = {
                    "name": agent_config.get("name", "Dr. Aarogya"),
                    "description": agent_config.get("description", "AI Health Companion"),
                    "personality": agent_config.get("personality", "professional, empathetic, knowledgeable"),
                    "voice_settings": {
                        "voice_id": agent_config.get("voice_id", "default"),
                        "speed": agent_config.get("speed", 1.0),
                        "pitch": agent_config.get("pitch", 1.0)
                    },
                    "appearance": {
                        "avatar_type": agent_config.get("avatar_type", "doctor"),
                        "gender": agent_config.get("gender", "neutral"),
                        "age_range": agent_config.get("age_range", "30-40")
                    },
                    "knowledge_base": {
                        "medical_specialties": agent_config.get("specialties", ["general_medicine"]),
                        "languages": agent_config.get("languages", ["en", "hi"]),
                        "training_data": agent_config.get("training_data", [])
                    }
                }
                
                response = await client.post(url, headers=self.headers, json=payload, timeout=30.0)
                
                if response.status_code == 201:
                    return response.json()
                else:
                    logger.error(f"Tavus agent creation failed: {response.status_code} - {response.text}")
                    return {"error": "Agent creation failed"}
                    
        except Exception as e:
            logger.error(f"Tavus agent creation error: {e}")
            return {"error": str(e)}
    
    async def start_consultation_session(self, user_id: str, agent_id: str, session_config: Dict) -> Dict:
        """Start a new consultation session with AI agent"""
        try:
            async with httpx.AsyncClient() as client:
                url = f"{self.base_url}/sessions"
                
                payload = {
                    "agent_id": agent_id,
                    "user_id": user_id,
                    "session_type": "health_consultation",
                    "configuration": {
                        "max_duration_minutes": session_config.get("max_duration", 30),
                        "language": session_config.get("language", "en"),
                        "health_context": session_config.get("health_context", {}),
                        "privacy_mode": True,
                        "recording_enabled": session_config.get("recording", False)
                    },
                    "webhook_url": session_config.get("webhook_url")
                }
                
                response = await client.post(url, headers=self.headers, json=payload, timeout=30.0)
                
                if response.status_code == 201:
                    return response.json()
                else:
                    logger.error(f"Tavus session creation failed: {response.status_code}")
                    return {"error": "Session creation failed"}
                    
        except Exception as e:
            logger.error(f"Tavus session creation error: {e}")
            return {"error": str(e)}
    
    async def send_message_to_agent(self, session_id: str, message: str, context: Dict = None) -> Dict:
        """Send a message to the AI agent during consultation"""
        try:
            async with httpx.AsyncClient() as client:
                url = f"{self.base_url}/sessions/{session_id}/messages"
                
                payload = {
                    "message": message,
                    "message_type": "user_input",
                    "context": context or {},
                    "timestamp": "2024-01-01T00:00:00Z"  # Use actual timestamp
                }
                
                response = await client.post(url, headers=self.headers, json=payload, timeout=30.0)
                
                if response.status_code == 200:
                    return response.json()
                else:
                    logger.error(f"Tavus message sending failed: {response.status_code}")
                    return {"error": "Message sending failed"}
                    
        except Exception as e:
            logger.error(f"Tavus message error: {e}")
            return {"error": str(e)}
    
    async def end_consultation_session(self, session_id: str) -> Dict:
        """End a consultation session"""
        try:
            async with httpx.AsyncClient() as client:
                url = f"{self.base_url}/sessions/{session_id}/end"
                
                response = await client.post(url, headers=self.headers, timeout=30.0)
                
                if response.status_code == 200:
                    return response.json()
                else:
                    logger.error(f"Tavus session ending failed: {response.status_code}")
                    return {"error": "Session ending failed"}
                    
        except Exception as e:
            logger.error(f"Tavus session ending error: {e}")
            return {"error": str(e)}
    
    async def get_session_analytics(self, session_id: str) -> Dict:
        """Get analytics for a consultation session"""
        try:
            async with httpx.AsyncClient() as client:
                url = f"{self.base_url}/sessions/{session_id}/analytics"
                
                response = await client.get(url, headers=self.headers, timeout=30.0)
                
                if response.status_code == 200:
                    return response.json()
                else:
                    return {"error": "Analytics retrieval failed"}
                    
        except Exception as e:
            logger.error(f"Tavus analytics error: {e}")
            return {"error": str(e)}
    
    async def customize_agent_knowledge(self, agent_id: str, knowledge_data: Dict) -> Dict:
        """Update agent's medical knowledge base"""
        try:
            async with httpx.AsyncClient() as client:
                url = f"{self.base_url}/agents/{agent_id}/knowledge"
                
                payload = {
                    "medical_guidelines": knowledge_data.get("guidelines", []),
                    "drug_database": knowledge_data.get("drugs", []),
                    "symptom_checker": knowledge_data.get("symptoms", []),
                    "treatment_protocols": knowledge_data.get("treatments", []),
                    "emergency_procedures": knowledge_data.get("emergency", [])
                }
                
                response = await client.put(url, headers=self.headers, json=payload, timeout=30.0)
                
                if response.status_code == 200:
                    return response.json()
                else:
                    return {"error": "Knowledge update failed"}
                    
        except Exception as e:
            logger.error(f"Tavus knowledge update error: {e}")
            return {"error": str(e)}
    
    async def get_available_agents(self) -> List[Dict]:
        """Get list of available AI health agents"""
        try:
            async with httpx.AsyncClient() as client:
                url = f"{self.base_url}/agents"
                
                response = await client.get(url, headers=self.headers, timeout=30.0)
                
                if response.status_code == 200:
                    return response.json().get("agents", [])
                else:
                    return []
                    
        except Exception as e:
            logger.error(f"Tavus agents retrieval error: {e}")
            return []

# Global instance
tavus_service = TavusService()

# Health-specific agent configurations
HEALTH_AGENT_CONFIGS = {
    "general_doctor": {
        "name": "Dr. Aarogya",
        "description": "General Medicine AI Doctor",
        "personality": "professional, empathetic, thorough",
        "specialties": ["general_medicine", "preventive_care", "health_screening"],
        "avatar_type": "doctor",
        "voice_id": "professional_male"
    },
    "pediatrician": {
        "name": "Dr. Priya",
        "description": "Pediatric AI Specialist",
        "personality": "gentle, patient, child-friendly",
        "specialties": ["pediatrics", "child_development", "vaccination"],
        "avatar_type": "pediatrician",
        "voice_id": "gentle_female"
    },
    "pharmacist": {
        "name": "Pharmacist Raj",
        "description": "AI Pharmacist for Medicine Guidance",
        "personality": "knowledgeable, precise, safety-focused",
        "specialties": ["pharmacology", "drug_interactions", "dosage_guidance"],
        "avatar_type": "pharmacist",
        "voice_id": "professional_male"
    }
}