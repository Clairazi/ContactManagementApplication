# 📇 Contact Management Application

A modern, full-stack contact management application built with **Nest.js**, **Next.js**, **PostgreSQL**, and **TypeScript**.

---

## ✨ Features

- 🔐 JWT-based Authentication with role-based access control
- 📇 Full CRUD Operations for contacts
- 🔍 Advanced Search, Filter, Pagination & Sorting
- 📸 Photo Upload for contact profiles
- 🌓 Dark/Light Mode toggle
- 📱 Fully Responsive Design
- ✅ Client & Server-side Validation

---

## 🛠️ Tech Stack

**Backend:** Nest.js, TypeORM, PostgreSQL, JWT, Passport.js, Multer  
**Frontend:** Next.js 14, TypeScript, Tailwind CSS, Axios

---

## 📋 Prerequisites

- Node.js (v18+)
- PostgreSQL (v14+)
- npm or yarn

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Clairazi/ContactManagementApplication.git
cd ContactManagementApplication
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create `.env` file:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=contact_management

JWT_SECRET=your-secret-key
JWT_EXPIRATION=24h

PORT=3001
NODE_ENV=development
```

Create database:

```bash
psql -U postgres
CREATE DATABASE contact_management;
\q
```

Start backend:

```bash
npm run start:dev
```

Backend runs on **http://localhost:3001**

### 3. Frontend Setup

```bash
cd Frontend
npm install
```

Create `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Start frontend:

```bash
npm run dev
```

Frontend runs on **http://localhost:3000**

### 4. Access Application

Open **http://localhost:3000** in your browser, register an account, and start managing contacts!

---

## 📖 API Documentation

### Base URL: `http://localhost:3001`

---

### **Authentication**

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

---

### **Contacts** (Protected - Requires JWT Token)

**Authorization Header:** `Authorization: Bearer <token>`

#### Create Contact
```http
POST /contacts
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "photo": null,
  "createdAt": "2024-01-15T11:00:00Z"
}
```

#### Get All Contacts
```http
GET /contacts?page=1&limit=10&search=jane&sortBy=name&sortOrder=ASC
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `search` (string): Search by name or email
- `sortBy` (string): Sort field - `name`, `email`, `createdAt`
- `sortOrder` (string): `ASC` or `DESC`

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "phone": "+1234567890",
      "photo": "uploads/contact-123.jpg",
      "createdAt": "2024-01-15T11:00:00Z"
    }
  ],
  "meta": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "totalPages": 3
  }
}
```

#### Get Single Contact
```http
GET /contacts/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "id": "uuid",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "photo": "uploads/contact-123.jpg",
  "createdAt": "2024-01-15T11:00:00Z"
}
```

#### Update Contact
```http
PATCH /contacts/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "phone": "+1111111111"
}
```

**Response:**
```json
{
  "id": "uuid",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+1111111111",
  "updatedAt": "2024-01-15T14:30:00Z"
}
```

#### Delete Contact
```http
DELETE /contacts/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Contact deleted successfully"
}
```

#### Upload Contact Photo
```http
POST /contacts/:id/photo
Authorization: Bearer <token>
Content-Type: multipart/form-data

photo: <file>
```

**File Requirements:**
- Formats: JPG, JPEG, PNG, GIF
- Max size: 5MB

**Response:**
```json
{
  "id": "uuid",
  "name": "Jane Smith",
  "photo": "uploads/contact-1705318800000.jpg",
  "updatedAt": "2024-01-15T15:00:00Z"
}
```

---

## 📁 Project Structure

```
ContactManagementApplication/
├── Backend/
│   ├── src/
│   │   ├── auth/          # Authentication module
│   │   ├── contacts/      # Contacts module
│   │   ├── users/         # Users module
│   │   └── main.ts
│   ├── uploads/           # Uploaded files
│   ├── .env
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── app/           # Next.js pages
│   │   ├── components/    # React components
│   │   └── contexts/      # Context providers
│   ├── .env.local
│   └── package.json
│
└── README.md
```

---

## 👤 User Roles

**Regular User:**
- Create, read, update, delete own contacts
- Upload contact photos
- Search and filter contacts

**Admin:**
- All user permissions
- Access all users' contacts
- Manage all contacts

---

## 🔒 Security

- JWT Authentication
- Password Hashing (Bcrypt)
- Role-based Access Control
- Input Validation
- File Upload Validation
- CORS Protection
- SQL Injection Prevention

---

## 📸 Screenshots

### Login Page
![Login](screenshots/login.png)

### Contacts Dashboard
![Dashboard](screenshots/dashboard.png)

### Add/Edit Contact
![Contact Modal](screenshots/contact-modal.png)

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by [Clairazi](https://github.com/Clairazi)

</div>
