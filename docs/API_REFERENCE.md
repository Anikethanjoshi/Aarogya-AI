# Aarogya AI - API Reference

## 🔗 Base URLs

- **Development**: `http://localhost:8000/api`
- **Production**: `https://api.aarogyaai.com/api`

## 🔐 Authentication

All API requests require authentication using Bearer tokens:

```http
Authorization: Bearer <your_token_here>
```

## 📊 Response Format

All API responses follow this standard format:

```json
{
  "success": boolean,
  "data": any,
  "message": string,
  "error": string,
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## 🏥 Medicine APIs

### Search Medicines

Search for medicines by name, generic name, or description.

```http
GET /medicines/search?query={query}&category={category}&limit={limit}
```

**Parameters:**
- `query` (string, required): Search term
- `category` (string, optional): Medicine category filter
- `prescription_required` (boolean, optional): Filter by prescription requirement
- `jan_aushadhi_only` (boolean, optional): Show only Jan Aushadhi medicines
- `limit` (integer, optional): Maximum results (default: 20)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "med_001",
      "name": "Paracetamol",
      "generic_name": "Acetaminophen",
      "category": "analgesic",
      "description": "Common pain reliever and fever reducer",
      "composition": "Paracetamol 500mg",
      "dosage": "500mg-1000mg every 4-6 hours",
      "side_effects": ["Nausea", "Stomach upset"],
      "benefits": ["Pain relief", "Fever reduction"],
      "jan_aushadhi_price": "₹2-5 per tablet",
      "brand_price": "₹8-15 per tablet",
      "who_approved": true,
      "fda_approved": true,
      "jan_aushadhi_available": true,
      "prescription_required": false
    }
  ]
}
```

### Get Medicine Details

Get detailed information about a specific medicine.

```http
GET /medicines/{medicine_id}
```

### Get Medicine Categories

Get all available medicine categories.

```http
GET /medicines/categories
```

### Compare Jan Aushadhi Prices

Compare Jan Aushadhi prices with brand prices.

```http
GET /medicines/jan-aushadhi/compare/{medicine_name}
```

### Check Drug Interactions

Check for potential drug interactions.

```http
POST /medicines/interaction-check
```

**Request Body:**
```json
{
  "medicine_ids": ["med_001", "med_002"]
}
```

## 🏥 Hospital Tools APIs

### Search Hospital Tools

Search for hospital tools and equipment.

```http
GET /hospital/tools/search?query={query}&category={category}&department={department}
```

**Parameters:**
- `query` (string, optional): Search term
- `category` (string, optional): Tool category
- `department` (string, optional): Hospital department
- `complexity` (string, optional): Complexity level
- `who_approved` (boolean, optional): WHO approved only
- `limit` (integer, optional): Maximum results

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "tool_001",
      "name": "Digital Stethoscope",
      "category": "diagnostic",
      "description": "Advanced digital stethoscope with noise cancellation",
      "uses": ["Heart sound examination", "Lung sound analysis"],
      "specifications": ["Frequency: 20Hz-20kHz", "Battery: 40+ hours"],
      "price_range": "₹15,000 - ₹50,000",
      "manufacturer": ["3M Littmann", "Eko"],
      "who_approved": true,
      "fda_approved": true,
      "departments": ["Cardiology", "Pulmonology"],
      "complexity": "Basic",
      "training_required": "2-4 hours"
    }
  ]
}
```

### Get Tool Details

Get detailed information about a specific tool.

```http
GET /hospital/tools/{tool_id}
```

### Get Tool Categories

Get all available tool categories.

```http
GET /hospital/categories
```

### Get Hospital Departments

Get all hospital departments.

```http
GET /hospital/departments
```

### Get Tool Safety Guidelines

Get safety guidelines for a specific tool.

```http
GET /hospital/tools/{tool_id}/safety-guidelines
```

### Get WHO Compliance Info

Get WHO compliance information.

```http
GET /hospital/compliance/who-standards
```

## 🏪 Jan Aushadhi APIs

### Search Jan Aushadhi Stores

Search for Jan Aushadhi stores by location.

```http
GET /jan-aushadhi/stores/search?city={city}&state={state}&latitude={lat}&longitude={lng}
```

**Parameters:**
- `city` (string, optional): City name
- `state` (string, optional): State name
- `pincode` (string, optional): Pincode
- `latitude` (float, optional): User latitude
- `longitude` (float, optional): User longitude
- `radius_km` (float, optional): Search radius in kilometers
- `limit` (integer, optional): Maximum results

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "ja_001",
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
      "verified": true,
      "distance_km": 1.8
    }
  ]
}
```

### Get Jan Aushadhi Store Details

Get detailed information about a specific store.

```http
GET /jan-aushadhi/stores/{store_id}
```

### Get Jan Aushadhi Medicines

Get medicines available at Jan Aushadhi stores.

```http
GET /jan-aushadhi/medicines/available?store_id={store_id}&category={category}
```

### Calculate Jan Aushadhi Savings

Calculate potential savings with Jan Aushadhi medicines.

```http
GET /jan-aushadhi/savings-calculator?medicine_name={name}&quantity={qty}
```

### Get Jan Aushadhi Statistics

Get Jan Aushadhi program statistics.

```http
GET /jan-aushadhi/statistics
```

## 📍 Location APIs

### Search Healthcare Locations

Search for healthcare locations near coordinates.

```http
POST /locations/search
```

**Request Body:**
```json
{
  "latitude": 12.9716,
  "longitude": 77.5946,
  "radius_km": 10,
  "location_type": "hospital",
  "services": ["Emergency", "ICU"],
  "emergency_only": false
}
```

### Get Nearby Locations

Get nearby healthcare locations.

```http
GET /locations/nearby?latitude={lat}&longitude={lng}&radius_km={radius}
```

### Get Location Details

Get detailed information about a specific location.

```http
GET /locations/{location_id}
```

### Get Location Types

Get all available location types.

```http
GET /locations/types/available
```

### Get Available Services

Get all available healthcare services.

```http
GET /locations/services/available
```

### Get Directions

Get directions to a healthcare location.

```http
GET /locations/{location_id}/directions?from_latitude={lat}&from_longitude={lng}
```

## 🔐 Authentication APIs

### Login

Authenticate user with email and password.

```http
POST /auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "name": "John Doe",
      "subscription": "premium"
    },
    "token": "jwt_token_here"
  }
}
```

### Register

Register a new user account.

```http
POST /auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "phone": "+91 9876543210"
}
```

## 🏥 Health APIs

### Health Check

Check API health status.

```http
GET /health/ping
```

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2024-01-01T00:00:00Z",
    "version": "1.0.0"
  }
}
```

## 📊 Error Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 429 | Rate Limited |
| 500 | Internal Server Error |

## 🔄 Rate Limiting

API requests are rate limited:
- **Free Tier**: 100 requests per hour
- **Basic Plan**: 1,000 requests per hour
- **Premium Plan**: 10,000 requests per hour
- **Enterprise**: Unlimited

## 📝 SDK Examples

### JavaScript/TypeScript

```typescript
import { APIService } from '@aarogya-ai/sdk';

const api = new APIService({
  baseURL: 'https://api.aarogyaai.com/api',
  apiKey: 'your_api_key'
});

// Search medicines
const medicines = await api.medicines.search('paracetamol');

// Get nearby hospitals
const hospitals = await api.locations.nearby({
  latitude: 12.9716,
  longitude: 77.5946,
  radius: 5
});
```

### Python

```python
from aarogya_ai import APIClient

client = APIClient(
    base_url='https://api.aarogyaai.com/api',
    api_key='your_api_key'
)

# Search medicines
medicines = client.medicines.search('paracetamol')

# Get nearby hospitals
hospitals = client.locations.nearby(
    latitude=12.9716,
    longitude=77.5946,
    radius=5
)
```

## 🔗 Webhooks

### Subscription Events

Receive notifications for subscription events:

```http
POST /webhooks/subscription
```

**Event Types:**
- `subscription.created`
- `subscription.updated`
- `subscription.cancelled`
- `subscription.expired`

### Consultation Events

Receive notifications for consultation events:

```http
POST /webhooks/consultation
```

**Event Types:**
- `consultation.started`
- `consultation.completed`
- `consultation.cancelled`

## 📚 Additional Resources

- [API Changelog](./CHANGELOG.md)
- [SDK Documentation](./SDK.md)
- [Webhook Guide](./WEBHOOKS.md)
- [Rate Limiting](./RATE_LIMITING.md)