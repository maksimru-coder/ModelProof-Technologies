# ModelProof Technologies - AI Quality Assurance Platform

## Overview

ModelProof Technologies is a comprehensive AI quality assurance and validation platform that provides specialized services for ensuring the reliability, accuracy, and compliance of AI systems. The application is built as a full-stack TypeScript solution with a React frontend and Express backend, featuring a professional corporate website with contact management capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: Radix UI primitives with custom styling
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth transitions
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Connect-pg-simple for PostgreSQL sessions
- **Development**: TSX for TypeScript execution
- **Production**: ESBuild for server bundling

### Design System
- **Primary Color**: Deep Navy (#0B2447)
- **Secondary Color**: Royal Blue (#19376D)
- **Typography**: Montserrat for headings, Inter for body text
- **Theme**: Professional light theme with custom CSS variables
- **Components**: Comprehensive UI component library based on shadcn/ui

## Key Components

### Pages and Routes
- **Home**: Hero section with services overview
- **Services**: Detailed service descriptions (Essential Assessment, Professional Validation, Enterprise Solution, Retainer Services, AI Chat Assistant)
- **Methodology**: ModelProof Framework™ and Quality Score™ explanations
- **About**: Company information and values
- **Contact**: Contact form with backend integration
- **Legal**: Privacy policy and terms of service pages

### Service Offerings
1. **Essential Assessment**: Basic AI system evaluation and baseline establishment
2. **Professional Validation**: Comprehensive testing and analysis
3. **Enterprise Solution**: End-to-end strategic partnership for complex implementations
4. **Retainer Services**: Ongoing monitoring and optimization
5. **AI Chat Assistant Services**: Custom AI assistant development and integration

### Core Features
- **Contact Management**: Form submission with validation and storage
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **SEO Optimization**: Proper meta tags and semantic HTML
- **Performance**: Optimized loading and animations
- **Accessibility**: ARIA compliance and keyboard navigation

## Data Flow

### Contact Submission Flow
1. User fills out contact form on frontend
2. Form validation using Zod schema
3. API request to `/api/contact` endpoint
4. Backend validates data and stores in PostgreSQL
5. Success/error response sent to frontend
6. Toast notification displayed to user

### Database Schema
- **Contact Submissions**: Stores user inquiries with name, email, company, message, and timestamp
- **Schema Location**: `shared/schema.ts` for type safety across frontend and backend

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React with TypeScript
- **State Management**: TanStack Query for API state
- **Form Handling**: React Hook Form with Hookform Resolvers
- **Styling**: Tailwind CSS with PostCSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Fontsource (Inter and Montserrat)

### Backend Dependencies
- **Database**: Neon PostgreSQL with Drizzle ORM
- **Session Storage**: Connect-pg-simple
- **Development Tools**: TSX for TypeScript execution
- **Build Tools**: ESBuild for production bundling

### Development Tools
- **Build System**: Vite for frontend, ESBuild for backend
- **Database Migrations**: Drizzle Kit
- **Type Safety**: Shared TypeScript schemas
- **Code Quality**: TypeScript strict mode

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: ESBuild bundles server code to `dist/index.js`
3. **Database**: Drizzle migrations applied via `db:push` command

### Environment Requirements
- **Node.js**: ESM module support
- **Database**: PostgreSQL (configured via DATABASE_URL)
- **Port**: Configurable via environment variables

### Production Configuration
- **Static Files**: Served from `dist/public`
- **API Routes**: Express server handles `/api/*` endpoints
- **Database**: PostgreSQL with connection pooling
- **Session Management**: Server-side sessions with PostgreSQL storage

### Development Workflow
- **Development**: `npm run dev` - TSX runs server with hot reload
- **Build**: `npm run build` - Creates production-ready bundles
- **Start**: `npm run start` - Runs production server
- **Database**: `npm run db:push` - Applies schema changes

The application follows a modern full-stack architecture with strong type safety, professional design, and scalable data management suitable for a corporate AI consultancy platform.

## Recent Deployment Success (August 2025)

### Contact Form & Email Integration - COMPLETED ✅
- **Issue Resolved**: Fixed ESM module conflicts and Vercel routing configuration
- **Email Service**: Successfully integrated Resend API for contact form submissions
- **Delivery Confirmed**: Emails properly delivered to Zoho mail inbox
- **Configuration**: Vercel deployment with `dist/public` output directory working correctly
- **API Functions**: `/api/contact`, `/api/index`, `/api/test` all functioning properly
- **React Router**: Direct URL access (e.g., `/about`, `/contact`) working correctly

### Technical Fixes Applied:
1. **ESM Module Conversion**: Converted all API functions from CommonJS to ES modules
2. **Vercel Configuration**: Simplified routing with proper build commands
3. **File Conflicts**: Removed duplicate `.ts` files to resolve Vercel build conflicts
4. **Email Setup**: Resend integration with proper sender formatting

### Final Working Configuration:
```json
// vercel.json
{
  "buildCommand": "cd client && npm run build",
  "outputDirectory": "dist/public",
  "rewrites": [
    {"source": "/api/(.*)", "destination": "/api/$1"},
    {"source": "/(.*)", "destination": "/index.html"}
  ]
}
```

The website is now fully operational with professional email delivery and proper React Router functionality.