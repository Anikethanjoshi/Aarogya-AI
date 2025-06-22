import httpx
import asyncio
from typing import Dict, List, Optional, Any
import os
from fastapi import HTTPException
import logging

logger = logging.getLogger(__name__)

class ExternalAPIService:
    """Service for integrating with external healthcare APIs"""
    
    def __init__(self):
        self.openfda_base_url = "https://api.fda.gov"
        self.rxnorm_base_url = "https://rxnav.nlm.nih.gov/REST"
        self.who_base_url = "https://apps.who.int/gho/athena/api"
        self.google_maps_api_key = os.getenv("GOOGLE_MAPS_API_KEY")
        
    async def search_fda_drugs(self, query: str, limit: int = 10) -> List[Dict]:
        """Search FDA drug database"""
        try:
            async with httpx.AsyncClient() as client:
                url = f"{self.openfda_base_url}/drug/label.json"
                params = {
                    "search": f"openfda.brand_name:{query}",
                    "limit": limit
                }
                
                response = await client.get(url, params=params, timeout=10.0)
                if response.status_code == 200:
                    data = response.json()
                    return data.get("results", [])
                else:
                    logger.warning(f"FDA API returned status {response.status_code}")
                    return []
                    
        except Exception as e:
            logger.error(f"FDA API error: {e}")
            return []
    
    async def search_rxnorm_drugs(self, query: str) -> List[Dict]:
        """Search RxNorm drug database"""
        try:
            async with httpx.AsyncClient() as client:
                url = f"{self.rxnorm_base_url}/drugs.json"
                params = {"name": query}
                
                response = await client.get(url, params=params, timeout=10.0)
                if response.status_code == 200:
                    data = response.json()
                    return data.get("drugGroup", {}).get("conceptGroup", [])
                else:
                    return []
                    
        except Exception as e:
            logger.error(f"RxNorm API error: {e}")
            return []
    
    async def get_drug_interactions(self, drug_list: List[str]) -> Dict:
        """Check drug interactions using RxNorm"""
        try:
            async with httpx.AsyncClient() as client:
                # Convert drug names to RxCUI codes first
                rxcui_list = []
                for drug in drug_list:
                    url = f"{self.rxnorm_base_url}/rxcui.json"
                    params = {"name": drug, "search": "2"}
                    
                    response = await client.get(url, params=params, timeout=10.0)
                    if response.status_code == 200:
                        data = response.json()
                        rxcui = data.get("idGroup", {}).get("rxnormId", [])
                        if rxcui:
                            rxcui_list.append(rxcui[0])
                
                # Check interactions
                if len(rxcui_list) >= 2:
                    url = f"{self.rxnorm_base_url}/interaction/list.json"
                    params = {"rxcuis": "+".join(rxcui_list)}
                    
                    response = await client.get(url, params=params, timeout=10.0)
                    if response.status_code == 200:
                        return response.json()
                
                return {"interactionTypeGroup": []}
                
        except Exception as e:
            logger.error(f"Drug interaction API error: {e}")
            return {"interactionTypeGroup": []}
    
    async def search_google_places(self, query: str, location: str, place_type: str = "hospital") -> List[Dict]:
        """Search Google Places for healthcare facilities"""
        if not self.google_maps_api_key:
            logger.warning("Google Maps API key not configured")
            return []
            
        try:
            async with httpx.AsyncClient() as client:
                url = "https://maps.googleapis.com/maps/api/place/textsearch/json"
                params = {
                    "query": f"{query} {place_type} {location}",
                    "type": place_type,
                    "key": self.google_maps_api_key
                }
                
                response = await client.get(url, params=params, timeout=10.0)
                if response.status_code == 200:
                    data = response.json()
                    return data.get("results", [])
                else:
                    logger.warning(f"Google Places API returned status {response.status_code}")
                    return []
                    
        except Exception as e:
            logger.error(f"Google Places API error: {e}")
            return []
    
    async def get_place_details(self, place_id: str) -> Dict:
        """Get detailed information about a place"""
        if not self.google_maps_api_key:
            return {}
            
        try:
            async with httpx.AsyncClient() as client:
                url = "https://maps.googleapis.com/maps/api/place/details/json"
                params = {
                    "place_id": place_id,
                    "fields": "name,formatted_address,formatted_phone_number,website,rating,reviews,opening_hours,geometry",
                    "key": self.google_maps_api_key
                }
                
                response = await client.get(url, params=params, timeout=10.0)
                if response.status_code == 200:
                    data = response.json()
                    return data.get("result", {})
                else:
                    return {}
                    
        except Exception as e:
            logger.error(f"Google Place Details API error: {e}")
            return {}
    
    async def geocode_address(self, address: str) -> Dict:
        """Convert address to coordinates"""
        if not self.google_maps_api_key:
            return {}
            
        try:
            async with httpx.AsyncClient() as client:
                url = "https://maps.googleapis.com/maps/api/geocode/json"
                params = {
                    "address": address,
                    "key": self.google_maps_api_key
                }
                
                response = await client.get(url, params=params, timeout=10.0)
                if response.status_code == 200:
                    data = response.json()
                    results = data.get("results", [])
                    if results:
                        location = results[0]["geometry"]["location"]
                        return {
                            "latitude": location["lat"],
                            "longitude": location["lng"],
                            "formatted_address": results[0]["formatted_address"]
                        }
                return {}
                
        except Exception as e:
            logger.error(f"Geocoding API error: {e}")
            return {}
    
    async def get_who_health_data(self, indicator: str, country: str = "IND") -> Dict:
        """Get health data from WHO Global Health Observatory"""
        try:
            async with httpx.AsyncClient() as client:
                url = f"{self.who_base_url}/GHO/{indicator}.json"
                params = {
                    "filter": f"COUNTRY:{country}",
                    "format": "json"
                }
                
                response = await client.get(url, params=params, timeout=10.0)
                if response.status_code == 200:
                    return response.json()
                else:
                    return {}
                    
        except Exception as e:
            logger.error(f"WHO API error: {e}")
            return {}

# Global instance
external_api_service = ExternalAPIService()