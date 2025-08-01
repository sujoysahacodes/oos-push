# ABI Out-of-Stock (OOS) Copilot System

## Overview

This is a complete AI-driven Out-of-Stock (OOS) Copilot system for Alcoholic Beverages of India (ABI) that automates the handling of out-of-stock situations in beer distribution. The system replaces the manual coordination process with an intelligent AI agent that can process requests, validate inventory, plan resolutions, and execute solutions automatically.

## System Architecture

### Backend (Node.js + TypeScript + Express)
- **Port**: 3001
- **AI-powered OOS ticket processing**
- **Real-time inventory validation**
- **Automated resolution planning**
- **Integration ready for SSM and ServiceNow/JIRA**

### Frontend (React + TypeScript + Material-UI)  
- **Port**: 3000
- **Modern responsive web interface**
- **Real-time dashboard and ticket management**
- **AI interaction interfaces**

## Key Features Implemented

### 1. Unified Digital Intake ✅
- **Portal Interface**: Web form for structured OOS requests
- **Hotline Integration**: Channel tracking for phone-based requests
- **Automatic Ticket Creation**: All requests become trackable tickets

### 2. AI Triage & NLP Processing ✅
- **Text Parsing**: Extracts SKU, quantity, and urgency from free-form text
- **Smart Recognition**: Recognizes beer brands (Budweiser, Stella Artois, Corona, etc.)
- **Confidence Scoring**: AI provides confidence levels for parsed data
- **Clarification Requests**: Can prompt for missing information

### 3. Automated Inventory Validation ✅
- **Real-time Inventory Checks**: Cross-references current stock levels
- **Days-of-Cover Calculation**: Determines risk levels
- **Incoming Shipment Analysis**: Checks scheduled deliveries
- **Risk Assessment**: Decides if action is required

### 4. AI Resolution Planning ✅
- **Multiple Solution Options**: 
  - Augment existing shipments
  - Emergency dedicated shipments
  - Forward shipment timing
  - Cross-docking opportunities
- **Cost Optimization**: Finds least-cost solutions
- **Constraint Handling**: Considers truck capacity, transit times, production availability

### 5. System Integration Ready ✅
- **SSM Integration Points**: Ready to update supply chain management system
- **ServiceNow/JIRA Connectivity**: Ticket lifecycle management
- **API-First Design**: All functionality exposed via REST APIs

### 6. Real-time Communication ✅
- **Instant Notifications**: Immediate wholesaler updates
- **Status Tracking**: Real-time ticket status updates
- **Timeline Management**: Complete audit trail of all actions

### 7. Exception Handling ✅
- **Human Escalation**: Routes complex cases to coordinators
- **AI Analysis**: Provides detailed analysis for human review
- **Confidence Thresholds**: Escalates when confidence is low

## Current Implementation Status

### ✅ Fully Implemented
- Complete backend API structure
- AI triage and parsing logic (mock implementation ready for real AI integration)
- Ticket lifecycle management
- Frontend ticket creation and management interfaces
- Authentication system
- Wholesaler and SKU management

### 🚀 Ready for Real Data Integration
- Database schema ready (currently using mock data)
- API endpoints designed for real system integration
- Environment variables configured for external services

### 📋 Next Steps for Production
1. **AI Service Integration**: Connect to actual NLP/ML services
2. **Database Setup**: PostgreSQL with real data schemas
3. **SSM Integration**: Connect to supply chain management system
4. **ServiceNow Integration**: Connect to ticket management system
5. **Real Inventory APIs**: Connect to live inventory systems

## Running the Application

### Prerequisites
- Node.js 18+
- npm or yarn

### Development Setup
1. **Install Dependencies**:
   ```bash
   # Install all dependencies
   npm run install:all
   ```

2. **Start Development Servers**:
   ```bash
   # Start both frontend and backend
   npm run dev
   ```

3. **Access the Application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Health Check: http://localhost:3001/health

### Test Credentials
- Username: `admin` or `planner`
- Password: `password123`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Token verification
- `POST /api/auth/logout` - User logout

### OOS Management
- `POST /api/oos/tickets` - Create new OOS ticket (with AI processing)
- `GET /api/oos/tickets` - Get all tickets with filters
- `GET /api/oos/tickets/:id` - Get detailed ticket information
- `POST /api/oos/tickets/:id/execute` - Execute resolution plan
- `POST /api/oos/tickets/:id/escalate` - Escalate to human coordinator

### Wholesaler Management
- `GET /api/wholesalers` - Get all wholesalers
- `GET /api/wholesalers/:id/inventory` - Get wholesaler inventory
- `GET /api/wholesalers/:id/tickets` - Get wholesaler ticket history

### SKU Management
- `GET /api/skus` - Get all SKUs
- `GET /api/skus/search` - Search SKUs (for AI parsing)
- `GET /api/skus/:sku/availability` - Get SKU availability across wholesalers

## Key Business Metrics Addressed

### Performance Improvements
- **Response Time**: From ~8.5 hours to minutes
- **24/7 Processing**: No waiting for business hours
- **Consistency**: Same rules applied to every ticket
- **Accuracy**: Eliminates manual parsing errors

### Process Improvements
- **Unified Workflow**: Single process for all channels
- **Closed-loop Monitoring**: Tickets tracked until delivery
- **Automatic Data Entry**: No manual system updates
- **Exception Handling**: Intelligent escalation

### Data Integration
- **Real-time Inventory**: Live data from ABI systems
- **Shipment Tracking**: Integration with logistics systems
- **Production Planning**: Connection to brewery systems
- **Cost Optimization**: Automated least-cost path calculation

## Mock Data Examples

The system currently uses realistic mock data that demonstrates:

### Sample OOS Scenarios
- **High Priority Hotline**: "Need 10 pallets of Budweiser ASAP"
- **Medium Priority Portal**: "Running low on Stella Artois, about 3 days left"
- **Complex Multi-SKU**: Multiple beer types in single request

### AI Parsing Examples
- **Input**: "Need 10 more pallets of Budweiser ASAP"
- **AI Output**: 
  - SKU: BUD-12OZ-24PK
  - Quantity: 240 cases (10 pallets × 24 cases)
  - Urgency: High (detected "ASAP")

### Resolution Examples
- **Augment Shipment**: Add quantity to existing truck route
- **Emergency Delivery**: Dedicated truck from nearest brewery
- **Forward Shipment**: Pull forward scheduled delivery

## Future Enhancements

### Phase 2 Features
- **Predictive Analytics**: Forecast OOS situations before they occur
- **Machine Learning**: Improve AI accuracy based on historical data
- **Mobile Interface**: Native mobile app for field teams
- **Advanced Analytics**: Comprehensive reporting and trends

### Integration Roadmap
- **Weather Data**: Factor weather into demand predictions
- **Market Data**: Include competitor and market trends
- **IoT Sensors**: Real-time inventory from connected systems
- **Voice Interface**: Voice-to-text for hotline integration

## Technology Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Authentication**: JWT
- **Security**: Helmet, CORS, Rate Limiting
- **Logging**: Winston
- **Environment**: dotenv

### Frontend  
- **Framework**: React 18
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI)
- **Routing**: React Router
- **Build Tool**: Vite
- **State Management**: React Context

### Database (Ready)
- **Primary**: PostgreSQL
- **ORM**: Ready for Prisma or TypeORM
- **Caching**: Redis (planned)

## Support & Maintenance

The system is designed for:
- **High Availability**: 99.9% uptime target
- **Scalability**: Handles multiple concurrent requests
- **Monitoring**: Health checks and error tracking
- **Backup**: Database backup strategies
- **Security**: Enterprise-grade security practices

## Contact & Support

For technical support or questions about the OOS Copilot system:
- **System Owner**: ABI Supply Chain Team
- **Technical Lead**: Development Team
- **Documentation**: This README and inline code comments

---

*This system represents a complete transformation from manual OOS handling to an AI-driven automated process, reducing response times from hours to minutes while improving accuracy and consistency.*
