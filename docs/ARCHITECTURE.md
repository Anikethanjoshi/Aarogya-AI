# Aarogya AI - Architecture Documentation

## 🏗️ System Architecture

### Overview
Aarogya AI is built using a modern, scalable architecture that combines React frontend with AI-powered services and secure payment processing.

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   AI Services   │    │   Backend API   │
│   (React)       │◄──►│   (Tavus)       │    │   (FastAPI)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Payments      │    │   Maps API      │    │   Database      │
│   (RevenueCat)  │    │   (Google)      │    │   (MongoDB)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🎯 Core Components

### Frontend Architecture

#### Component Hierarchy
```
App
├── ErrorBoundary
├── LanguageProvider
├── AuthProvider
├── ToastProvider
├── Router
│   ├── Header
│   ├── Main (Routes)
│   │   ├── HomePage
│   │   ├── ConsultationPage
│   │   ├── SubscriptionPage
│   │   ├── DashboardPage
│   │   ├── HospitalToolsPage
│   │   ├── MedicinesPage
│   │   ├── DoctorsPage
│   │   └── LocationsPage
│   └── Footer
└── BoltBadge
```

#### State Management
- **React Context**: Global state management
- **Local State**: Component-specific state
- **LocalStorage**: Persistent user data
- **Session Storage**: Temporary data

### Service Layer

#### API Services
```typescript
// API Service Structure
class APIService {
  // Medicine APIs
  searchMedicines()
  getMedicineDetails()
  getMedicineCategories()
  
  // Hospital Tools APIs
  searchHospitalTools()
  getToolDetails()
  getToolCategories()
  
  // Location APIs
  searchHealthcareLocations()
  getNearbyLocations()
  getLocationDetails()
}
```

#### Tavus AI Service
```typescript
class TavusService {
  createSession()
  endSession()
  getSessionAnalytics()
  getAvailableAgents()
}
```

#### RevenueCat Service
```typescript
class RevenueCatService {
  getSubscriberInfo()
  purchasePackage()
  cancelSubscription()
  getAvailablePackages()
}
```

## 🔐 Security Architecture

### Authentication Flow
```
User Login → Validation → Token Generation → Local Storage → API Requests
```

### Data Protection
- **Input Validation**: All user inputs validated and sanitized
- **XSS Protection**: Content Security Policy implemented
- **HTTPS**: All communications encrypted
- **Token Management**: Secure token storage and rotation

### Error Handling
```typescript
// Error Boundary Pattern
ErrorBoundary → Component Error → Fallback UI → Error Logging
```

## 🎨 UI/UX Architecture

### Design System
- **Tailwind CSS**: Utility-first styling
- **Component Library**: Reusable UI components
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG 2.1 compliance

### Theme System
```typescript
// Color Palette
primary: blue-600
secondary: green-600
accent: purple-600
neutral: gray-600
```

### Component Structure
```
components/
├── UI/              # Base components
│   ├── Button
│   ├── Modal
│   ├── Toast
│   └── LoadingSpinner
├── AI/              # AI-specific components
│   ├── AnimatedAvatar
│   └── TavusVideoAgent
└── Layout/          # Layout components
    ├── Header
    └── Footer
```

## 🔄 Data Flow

### User Authentication
```
Login Form → Validation → API Call → Token Storage → Context Update → UI Update
```

### AI Consultation
```
Start Session → Tavus API → Video Stream → User Interaction → Session End → Analytics
```

### Subscription Management
```
Plan Selection → RevenueCat → Payment Processing → Subscription Update → Access Control
```

## 🚀 Performance Architecture

### Optimization Strategies
- **Code Splitting**: Route-based lazy loading
- **Image Optimization**: WebP format with fallbacks
- **Caching**: Service worker for offline support
- **Bundle Optimization**: Tree shaking and minification

### Loading Strategies
```typescript
// Lazy Loading Pattern
const LazyComponent = lazy(() => import('./Component'));

// Suspense Wrapper
<Suspense fallback={<LoadingSpinner />}>
  <LazyComponent />
</Suspense>
```

## 📱 Mobile Architecture

### Responsive Breakpoints
```css
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
```

### Touch Interactions
- **Gesture Support**: Swipe, pinch, tap
- **Touch Targets**: Minimum 44px touch targets
- **Haptic Feedback**: Native device feedback

## 🔧 Development Architecture

### Build Process
```
Source Code → TypeScript Compilation → Bundling → Optimization → Deployment
```

### Development Tools
- **Vite**: Fast development server
- **TypeScript**: Type safety
- **ESLint**: Code quality
- **Prettier**: Code formatting

### Testing Strategy
```
Unit Tests → Integration Tests → E2E Tests → Performance Tests
```

## 🌐 Deployment Architecture

### Environment Configuration
```
Development → Staging → Production
```

### CI/CD Pipeline
```
Code Push → Tests → Build → Deploy → Monitor
```

### Hosting Strategy
- **Frontend**: Netlify CDN
- **Backend**: Cloud hosting
- **Database**: MongoDB Atlas
- **Assets**: CDN distribution

## 📊 Monitoring Architecture

### Analytics Integration
- **User Analytics**: Google Analytics
- **Performance**: Web Vitals
- **Error Tracking**: Sentry
- **AI Metrics**: Tavus Analytics

### Health Checks
```typescript
// Health Check Endpoints
/health/frontend
/health/api
/health/database
/health/services
```

## 🔮 Scalability Architecture

### Horizontal Scaling
- **Load Balancing**: Multiple server instances
- **CDN**: Global content distribution
- **Database Sharding**: Data partitioning
- **Microservices**: Service decomposition

### Caching Strategy
```
Browser Cache → CDN Cache → Application Cache → Database Cache
```

## 🛡️ Compliance Architecture

### Healthcare Compliance
- **HIPAA**: Health data protection
- **GDPR**: European data protection
- **SOC 2**: Security compliance
- **ISO 27001**: Information security

### Data Governance
```
Data Collection → Processing → Storage → Access → Deletion
```

## 🔄 Integration Architecture

### Third-Party Services
```
Tavus AI ←→ Application ←→ RevenueCat
    ↕                ↕
Google Maps    ←→    Backend API
```

### API Design
- **RESTful**: Standard HTTP methods
- **GraphQL**: Flexible data queries
- **WebSocket**: Real-time communication
- **Webhook**: Event-driven updates

## 📈 Future Architecture

### Planned Enhancements
- **Microservices**: Service decomposition
- **Event Sourcing**: Event-driven architecture
- **CQRS**: Command Query Responsibility Segregation
- **Serverless**: Function-as-a-Service adoption

### Technology Roadmap
```
Current: React + Tavus + RevenueCat
Future: Next.js + Edge Functions + AI/ML Pipeline
```