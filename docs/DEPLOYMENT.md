# Aarogya AI - Deployment Guide

## 🚀 Deployment Overview

This guide covers deploying Aarogya AI to various platforms including Netlify, Vercel, and custom servers.

## 📋 Prerequisites

- Node.js 18+ installed
- Git repository access
- API keys for external services
- Domain name (optional)

## 🌐 Netlify Deployment (Recommended)

### Automatic Deployment

1. **Connect Repository**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Configure Build Settings**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **Set Environment Variables**
   ```
   VITE_TAVUS_API_KEY=your_tavus_api_key
   VITE_REVENUECAT_API_KEY=your_revenuecat_api_key
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   VITE_API_BASE_URL=https://api.aarogyaai.com/api
   ```

4. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically build and deploy

### Manual Deployment

```bash
# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

## ▲ Vercel Deployment

### Automatic Deployment

1. **Connect Repository**
   - Go to [Vercel](https://vercel.com)
   - Import your GitHub repository

2. **Configure Project**
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   ```

3. **Set Environment Variables**
   - Add the same environment variables as Netlify

### Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## 🐳 Docker Deployment

### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "80:80"
    environment:
      - VITE_TAVUS_API_KEY=${VITE_TAVUS_API_KEY}
      - VITE_REVENUECAT_API_KEY=${VITE_REVENUECAT_API_KEY}
    restart: unless-stopped

  backend:
    image: aarogya-ai-backend
    ports:
      - "8000:8000"
    environment:
      - MONGO_URL=${MONGO_URL}
      - TAVUS_API_KEY=${TAVUS_API_KEY}
    restart: unless-stopped
```

### Deploy with Docker

```bash
# Build image
docker build -t aarogya-ai .

# Run container
docker run -p 80:80 \
  -e VITE_TAVUS_API_KEY=your_key \
  -e VITE_REVENUECAT_API_KEY=your_key \
  aarogya-ai
```

## ☁️ AWS Deployment

### S3 + CloudFront

1. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://aarogya-ai-frontend
   ```

2. **Configure Bucket for Static Hosting**
   ```bash
   aws s3 website s3://aarogya-ai-frontend \
     --index-document index.html \
     --error-document index.html
   ```

3. **Upload Build Files**
   ```bash
   npm run build
   aws s3 sync dist/ s3://aarogya-ai-frontend
   ```

4. **Create CloudFront Distribution**
   ```json
   {
     "Origins": [{
       "DomainName": "aarogya-ai-frontend.s3.amazonaws.com",
       "Id": "S3-aarogya-ai-frontend"
     }],
     "DefaultCacheBehavior": {
       "TargetOriginId": "S3-aarogya-ai-frontend"
     }
   }
   ```

### Elastic Beanstalk

1. **Create Application**
   ```bash
   eb init aarogya-ai --platform node.js
   ```

2. **Create Environment**
   ```bash
   eb create production
   ```

3. **Deploy**
   ```bash
   eb deploy
   ```

## 🔧 Environment Configuration

### Production Environment Variables

```env
# Required
VITE_TAVUS_API_KEY=prod_tavus_key
VITE_REVENUECAT_API_KEY=prod_revenuecat_key

# Optional
VITE_GOOGLE_MAPS_API_KEY=google_maps_key
VITE_API_BASE_URL=https://api.aarogyaai.com/api
VITE_APP_ENVIRONMENT=production

# Analytics
VITE_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
VITE_SENTRY_DSN=sentry_dsn
```

### Staging Environment

```env
VITE_TAVUS_API_KEY=staging_tavus_key
VITE_REVENUECAT_API_KEY=staging_revenuecat_key
VITE_API_BASE_URL=https://staging-api.aarogyaai.com/api
VITE_APP_ENVIRONMENT=staging
```

## 🔒 Security Configuration

### Content Security Policy

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://api.tavus.io;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' https://api.tavus.io https://api.revenuecat.com;
  font-src 'self';
">
```

### HTTPS Configuration

```nginx
server {
    listen 443 ssl http2;
    server_name aarogyaai.com;

    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;

    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }
}
```

## 📊 Monitoring & Analytics

### Health Checks

```javascript
// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version
  });
});
```

### Error Tracking

```javascript
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  environment: process.env.VITE_APP_ENVIRONMENT
});
```

### Performance Monitoring

```javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## 🔄 CI/CD Pipeline

### GitHub Actions

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build
      env:
        VITE_TAVUS_API_KEY: ${{ secrets.TAVUS_API_KEY }}
        VITE_REVENUECAT_API_KEY: ${{ secrets.REVENUECAT_API_KEY }}
    
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v1.2
      with:
        publish-dir: './dist'
        production-branch: main
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

### GitLab CI

```yaml
stages:
  - test
  - build
  - deploy

test:
  stage: test
  script:
    - npm ci
    - npm test

build:
  stage: build
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/

deploy:
  stage: deploy
  script:
    - netlify deploy --prod --dir=dist
  only:
    - main
```

## 🌍 CDN Configuration

### CloudFlare

1. **Add Site to CloudFlare**
   - Add your domain to CloudFlare
   - Update nameservers

2. **Configure Caching Rules**
   ```
   Cache Level: Standard
   Browser Cache TTL: 4 hours
   Edge Cache TTL: 2 hours
   ```

3. **Enable Optimizations**
   - Auto Minify: CSS, JavaScript, HTML
   - Brotli Compression
   - HTTP/2

### AWS CloudFront

```json
{
  "CacheBehaviors": [
    {
      "PathPattern": "*.js",
      "TTL": 31536000,
      "Compress": true
    },
    {
      "PathPattern": "*.css",
      "TTL": 31536000,
      "Compress": true
    }
  ]
}
```

## 🔧 Performance Optimization

### Build Optimization

```javascript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['lucide-react']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
```

### Image Optimization

```javascript
// Image optimization with WebP
const optimizeImages = () => {
  return {
    name: 'optimize-images',
    generateBundle() {
      // Convert images to WebP format
      // Add responsive image srcsets
    }
  };
};
```

## 📱 Mobile Deployment

### PWA Configuration

```javascript
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      manifest: {
        name: 'Aarogya AI',
        short_name: 'AarogyaAI',
        description: 'AI-powered healthcare companion',
        theme_color: '#3b82f6',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
```

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Environment Variables Not Loading**
   ```bash
   # Check variable names start with VITE_
   # Verify .env file location
   # Restart development server
   ```

3. **API Connection Issues**
   ```bash
   # Check CORS configuration
   # Verify API endpoints
   # Test with curl/Postman
   ```

### Debugging

```javascript
// Enable debug mode
if (process.env.NODE_ENV === 'development') {
  window.DEBUG = true;
  console.log('Debug mode enabled');
}
```

## 📞 Support

For deployment issues:
- Email: akhilajoshi0609@gmail.com
- GitHub Issues: [Create Issue](https://github.com/Anikethanjoshi/aarogya-ai/issues)
- Documentation: [View Docs](./README.md)