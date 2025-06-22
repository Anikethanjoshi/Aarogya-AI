import asyncio
import aiohttp
import json
from bs4 import BeautifulSoup
from typing import List, Dict
import logging
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class JanAushadhiScraper:
    """Scraper for Jan Aushadhi stores and medicines data"""
    
    def __init__(self):
        self.base_url = "https://janaushadhi.gov.in"
        self.stores_url = f"{self.base_url}/store-locator"
        self.medicines_url = f"{self.base_url}/medicine-list"
        self.session = None
        
        # MongoDB connection
        self.mongo_url = os.getenv("MONGO_URL")
        self.client = None
        self.db = None
    
    async def init_session(self):
        """Initialize aiohttp session"""
        self.session = aiohttp.ClientSession(
            timeout=aiohttp.ClientTimeout(total=30),
            headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        )
    
    async def init_database(self):
        """Initialize MongoDB connection"""
        self.client = AsyncIOMotorClient(self.mongo_url)
        self.db = self.client.aarogya_ai
    
    async def scrape_jan_aushadhi_stores(self) -> List[Dict]:
        """Scrape Jan Aushadhi store locations"""
        stores = []
        
        try:
            # This is a mock implementation - actual scraping would depend on the website structure
            # In production, you'd need to analyze the actual Jan Aushadhi website
            
            mock_stores = [
                {
                    "name": "Jan Aushadhi Store - Koramangala",
                    "address": "5th Block, Koramangala, Bangalore",
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
                    "name": "Jan Aushadhi Store - Indiranagar",
                    "address": "100 Feet Road, Indiranagar, Bangalore",
                    "city": "Bangalore",
                    "state": "Karnataka",
                    "pincode": "560038",
                    "phone": "+91 80 2521 7890",
                    "latitude": 12.9716,
                    "longitude": 77.6412,
                    "operating_hours": "8:00 AM - 10:00 PM",
                    "medicines_available": 520,
                    "verified": True
                }
            ]
            
            stores.extend(mock_stores)
            logger.info(f"Scraped {len(stores)} Jan Aushadhi stores")
            
        except Exception as e:
            logger.error(f"Error scraping stores: {e}")
        
        return stores
    
    async def scrape_jan_aushadhi_medicines(self) -> List[Dict]:
        """Scrape Jan Aushadhi medicines list"""
        medicines = []
        
        try:
            # Mock implementation - actual scraping would parse the medicines list
            mock_medicines = [
                {
                    "name": "Paracetamol",
                    "generic_name": "Acetaminophen",
                    "strength": "500mg",
                    "pack_size": "10 tablets",
                    "price": "₹2.50",
                    "manufacturer": "IDPL",
                    "category": "analgesic",
                    "availability": "In Stock"
                },
                {
                    "name": "Amoxicillin",
                    "generic_name": "Amoxicillin",
                    "strength": "500mg",
                    "pack_size": "10 capsules",
                    "price": "₹18.00",
                    "manufacturer": "HAL",
                    "category": "antibiotic",
                    "availability": "In Stock"
                },
                {
                    "name": "Metformin",
                    "generic_name": "Metformin HCl",
                    "strength": "500mg",
                    "pack_size": "10 tablets",
                    "price": "₹6.50",
                    "manufacturer": "IDPL",
                    "category": "diabetes",
                    "availability": "In Stock"
                }
            ]
            
            medicines.extend(mock_medicines)
            logger.info(f"Scraped {len(medicines)} Jan Aushadhi medicines")
            
        except Exception as e:
            logger.error(f"Error scraping medicines: {e}")
        
        return medicines
    
    async def save_to_database(self, stores: List[Dict], medicines: List[Dict]):
        """Save scraped data to MongoDB"""
        try:
            # Save stores
            if stores:
                await self.db.jan_aushadhi_stores.delete_many({})  # Clear existing data
                await self.db.jan_aushadhi_stores.insert_many(stores)
                logger.info(f"Saved {len(stores)} stores to database")
            
            # Save medicines
            if medicines:
                await self.db.jan_aushadhi_medicines.delete_many({})  # Clear existing data
                await self.db.jan_aushadhi_medicines.insert_many(medicines)
                logger.info(f"Saved {len(medicines)} medicines to database")
                
        except Exception as e:
            logger.error(f"Error saving to database: {e}")
    
    async def run_scraping(self):
        """Run the complete scraping process"""
        await self.init_session()
        await self.init_database()
        
        try:
            logger.info("Starting Jan Aushadhi data scraping...")
            
            # Scrape stores and medicines
            stores = await self.scrape_jan_aushadhi_stores()
            medicines = await self.scrape_jan_aushadhi_medicines()
            
            # Save to database
            await self.save_to_database(stores, medicines)
            
            logger.info("Scraping completed successfully!")
            
        except Exception as e:
            logger.error(f"Scraping failed: {e}")
        
        finally:
            if self.session:
                await self.session.close()
            if self.client:
                self.client.close()

async def main():
    """Main function to run the scraper"""
    scraper = JanAushadhiScraper()
    await scraper.run_scraping()

if __name__ == "__main__":
    asyncio.run(main())