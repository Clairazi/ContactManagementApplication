# Contact Management Application

A full-stack contact management application built with Nest.js, Next.js, PostgreSQL, and TypeScript.

## Features

- 🔐 JWT-based authentication
- 👥 Role-based access control (User/Admin)
- 📇 Full CRUD operations for contacts
- 🔍 Search and filter contacts
- 📊 Pagination and sorting
- 📸 Photo upload for contacts
- 🌓 Dark/Light mode toggle
- 📱 Responsive design
- ✅ Form validation
- 🎨 Tailwind CSS styling

## Tech Stack

**Backend:**
- Nest.js
- TypeORM
- PostgreSQL
- JWT Authentication
- Multer (file uploads)

**Frontend:**
- Next.js 14
- TypeScript
- Tailwind CSS
- Zustand (state management)
- React Hook Form
- Axios

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Setup Instructions

### 1. Clone the repository

### bash
- git clone <repository-url>
- cd contact-management-app

### 2. Backend Setup

### bash
- cd backend
- npm install

# Create .env file
cp .env.example .env

# Update .env with your PostgreSQL credentials
# DB_HOST=localhost
# DB_PORT=5432
# DB_USERNAME=postgres
# DB_PASSWORD=postgres
# DB_DATABASE=contact_management
# JWT_SECRET=your-secret-key

# Create database
createdb contact_management

# Run migrations (if using migrations)
npm run migration:run

# Start the backend
- npm run start:dev

Backend will run on http://localhost:4000

### 3. Frontend Setup
- cd frontend
- npm install

# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:4000/api" > .env.local

# Start the frontend
- npm run dev

Frontend will run on http://localhost:3000

## API Documentation

### Authentication Endpoints

**Register**
\`\`\`
POST /api/auth/register
Body: { email, password }
\`\`\`

**Login**
\`\`\`
POST /api/auth/login
Body: { email, password }
\`\`\`

### Contact Endpoints (Protected)

**Create Contact**
\`\`\`
POST /api/contacts
Headers: Authorization: Bearer <token>
Body: FormData { name, email, phone, photo }
\`\`\`

**Get All Contacts**
\`\`\`
GET /api/contacts?page=1&limit=10&search=&sortBy=createdAt&sortOrder=DESC
Headers: Authorization: Bearer <token>
\`\`\`

**Get Single Contact**
\`\`\`
GET /api/contacts/:id
Headers: Authorization: Bearer <token>
\`\`\`

**Update Contact**
\`\`\`
PUT /api/contacts/:id
Headers: Authorization: Bearer <token>
Body: FormData { name, email, phone, photo }
\`\`\`

**Delete Contact**
\`\`\`
DELETE /api/contacts/:id
Headers: Authorization: Bearer <token>
\`\`\`

## Default Users

Create an admin user:
\`\`\`bash
# Register with role=admin in the request body
POST /api/auth/register
{
  "email": "admin@example.com",
  "password": "admin123",
  "role": "admin"
}
\`\`\`

## Project Structure

\`\`\`
backend/
├── src/
│   ├── auth/          # Authentication module
│   ├── contacts/      # Contacts module
│   ├── users/         # Users module
│   ├── common/        # Shared utilities
│   └── main.ts
├── uploads/           # Uploaded files
└── package.json

frontend/
├── src/
│   ├── app/           # Next.js pages
│   ├── components/    # React components
│   ├── lib/           # Utilities
│   └── store/         # State management
└── package.json
\`\`\`

## Testing

\`\`\`bash
# Backend tests
cd backend
npm run test

# Frontend tests
cd frontend
npm run test
\`\`\`

## Docker Support (Optional)

\`\`\`bash
docker-compose up
\`\`\`

## License

MIT
