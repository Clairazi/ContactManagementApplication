# 📇 Contact Management Application

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)

A modern, full-stack contact management application built with **Nest.js**, **Next.js**, **PostgreSQL**, and **TypeScript**.

[Features](#-features) • [Tech Stack](#-tech-stack) • [Setup Instructions](#-setup-instructions) • [API Documentation](#-api-documentation)

</div>

---

## ✨ Features

- 🔐 **JWT-based Authentication** - Secure user authentication and authorization
- 👥 **Role-based Access Control** - User and Admin roles with different permissions
- 📇 **Full CRUD Operations** - Create, Read, Update, and Delete contacts
- 🔍 **Advanced Search & Filter** - Search contacts by name, email, or phone
- 📊 **Pagination & Sorting** - Efficient data handling with customizable sorting
- 📸 **Photo Upload** - Upload and manage contact profile photos
- 🌓 **Dark/Light Mode** - Toggle between themes for better user experience
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- ✅ **Form Validation** - Client and server-side validation
- 🎨 **Modern UI** - Beautiful interface with Tailwind CSS

---

## 🛠️ Tech Stack

### Backend
- **[Nest.js](https://nestjs.com/)** - Progressive Node.js framework
- **[TypeORM](https://typeorm.io/)** - ORM for TypeScript and JavaScript
- **[PostgreSQL](https://www.postgresql.org/)** - Powerful relational database
- **[JWT](https://jwt.io/)** - JSON Web Token authentication
- **[Passport.js](http://www.passportjs.org/)** - Authentication middleware
- **[Multer](https://github.com/expressjs/multer)** - File upload handling
- **[Class Validator](https://github.com/typestack/class-validator)** - Validation decorators

### Frontend
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Axios](https://axios-http.com/)** - HTTP client
- **[React Hot Toast](https://react-hot-toast.com/)** - Notifications

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v14 or higher) - [Download](https://www.postgresql.org/download/)
- **npm** or **yarn** - Package manager
- **Git** - Version control

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Clairazi/ContactManagementApplication.git
cd ContactManagementApplication
```

---

### 2️⃣ Backend Setup

#### Step 1: Install Dependencies

```bash
cd Backend
npm install
```

#### Step 2: Configure Environment Variables

Create a `.env` file in the `Backend` directory:

```bash
touch .env
```

Add the following configuration to `.env`:

```env
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password_here
DATABASE_NAME=contact_management

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRATION=24h

# Application
PORT=3001
NODE_ENV=development

# File Upload
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
```

**⚠️ Important:** Replace `your_password_here` with your actual PostgreSQL password.

#### Step 3: Create PostgreSQL Database

```bash
# Option 1: Using psql command line
psql -U postgres
CREATE DATABASE contact_management;
\q

# Option 2: Using createdb command
createdb -U postgres contact_management
```

#### Step 4: Start the Backend Server

```bash
npm run start:dev
```

✅ Backend will run on **http://localhost:3001**

---

### 3️⃣ Frontend Setup

#### Step 1: Install Dependencies

Open a **new terminal** window and navigate to the Frontend directory:

```bash
cd Frontend
npm install
```

#### Step 2: Configure Environment Variables

Create a `.env.local` file in the `Frontend` directory:

```bash
touch .env.local
```

Add the following configuration:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

#### Step 3: Start the Frontend Server

```bash
npm run dev
```

✅ Frontend will run on **http://localhost:3000**

---

### 4️⃣ Access the Application

1. Open your browser and go to **http://localhost:3000**
2. Register a new account
3. Login and start managing contacts!

---

## 📖 API Documentation

### Base URL

```
http://localhost:3001
```

---

### Authentication Endpoints

#### 1. Register User

Create a new user account.

**Endpoint:**
```http
POST /auth/register
```

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201 Created):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "statusCode": 400,
  "message": "Email already exists"
}
```

---

#### 2. Login

Authenticate and receive a JWT token.

**Endpoint:**
```http
POST /auth/login
```

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "statusCode": 401,
  "message": "Invalid credentials"
}
```

---

### Contact Endpoints (Protected)

> **🔒 Authentication Required:** All contact endpoints require a valid JWT token in the Authorization header.

**Authorization Header Format:**
```
Authorization: Bearer <your_jwt_token>
```

---

#### 3. Create Contact

Add a new contact to your contact list.

**Endpoint:**
```http
POST /contacts
```

**Request Headers:**
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890"
}
```

**Response (201 Created):**
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "photo": null,
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "createdAt": "2024-01-15T11:00:00Z",
  "updatedAt": "2024-01-15T11:00:00Z"
}
```

**Validation Rules:**
- `name`: Required, minimum 2 characters
- `email`: Required, valid email format
- `phone`: Required, valid phone format

---

#### 4. Get All Contacts

Retrieve all contacts with pagination, search, and sorting.

**Endpoint:**
```http
GET /contacts?page=1&limit=10&search=jane&sortBy=name&sortOrder=ASC
```

**Request Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Query Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `page` | number | No | 1 | Page number for pagination |
| `limit` | number | No | 10 | Number of items per page |
| `search` | string | No | - | Search by name or email |
| `sortBy` | string | No | createdAt | Sort field: `name`, `email`, `createdAt` |
| `sortOrder` | string | No | DESC | Sort order: `ASC` or `DESC` |

**Example Request:**
```bash
curl -X GET "http://localhost:3001/contacts?page=1&limit=10&search=jane" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "phone": "+1234567890",
      "photo": "uploads/contact-1234567890.jpg",
      "createdAt": "2024-01-15T11:00:00Z",
      "updatedAt": "2024-01-15T11:00:00Z"
    },
    {
      "id": "660e8400-e29b-41d4-a716-446655440002",
      "name": "Jane Doe",
      "email": "janedoe@example.com",
      "phone": "+0987654321",
      "photo": null,
      "createdAt": "2024-01-14T09:30:00Z",
      "updatedAt": "2024-01-14T09:30:00Z"
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

---

#### 5. Get Single Contact

Retrieve a specific contact by ID.

**Endpoint:**
```http
GET /contacts/:id
```

**Request Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Example Request:**
```bash
curl -X GET "http://localhost:3001/contacts/660e8400-e29b-41d4-a716-446655440001" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (200 OK):**
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "photo": "uploads/contact-1234567890.jpg",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "createdAt": "2024-01-15T11:00:00Z",
  "updatedAt": "2024-01-15T11:00:00Z"
}
```

**Error Response (404 Not Found):**
```json
{
  "statusCode": 404,
  "message": "Contact not found"
}
```

---

#### 6. Update Contact

Update an existing contact's information.

**Endpoint:**
```http
PATCH /contacts/:id
```

**Request Headers:**
```
Authorization: Bearer <your_jwt_token>
Content-Type: application/json
```

**Request Body (Partial Update):**
```json
{
  "name": "Jane Doe",
  "phone": "+1111111111"
}
```

**Response (200 OK):**
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+1111111111",
  "photo": "uploads/contact-1234567890.jpg",
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "createdAt": "2024-01-15T11:00:00Z",
  "updatedAt": "2024-01-15T14:30:00Z"
}
```

---

#### 7. Delete Contact

Delete a contact permanently.

**Endpoint:**
```http
DELETE /contacts/:id
```

**Request Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Example Request:**
```bash
curl -X DELETE "http://localhost:3001/contacts/660e8400-e29b-41d4-a716-446655440001" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Response (200 OK):**
```json
{
  "message": "Contact deleted successfully"
}
```

**Error Response (403 Forbidden):**
```json
{
  "statusCode": 403,
  "message": "You can only delete your own contacts"
}
```

---

#### 8. Upload Contact Photo

Upload a profile photo for a contact.

**Endpoint:**
```http
POST /contacts/:id/photo
```

**Request Headers:**
```
Authorization: Bearer <your_jwt_token>
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
```
photo: <file>
```

**File Requirements:**
- **Supported formats:** JPG, JPEG, PNG, GIF
- **Max file size:** 5MB
- **Field name:** `photo`

**Example Request (using curl):**
```bash
curl -X POST "http://localhost:3001/contacts/660e8400-e29b-41d4-a716-446655440001/photo" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -F "photo=@/path/to/photo.jpg"
```

**Response (200 OK):**
```json
{
  "id": "660e8400-e29b-41d4-a716-446655440001",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "photo": "uploads/contact-1705318800000.jpg",
  "createdAt": "2024-01-15T11:00:00Z",
  "updatedAt": "2024-01-15T15:00:00Z"
}
```

**Error Response (400 Bad Request):**
```json
{
  "statusCode": 400,
  "message": "File size exceeds 5MB limit"
}
```

---

## 📁 Project Structure

```
ContactManagementApplication/
│
├── Backend/
│   ├── src/
│   │   ├── auth/
│   │   │   ├── dto/
│   │   │   │   ├── login.dto.ts
│   │   │   │   └── register.dto.ts
│   │   │   ├── guards/
│   │   │   │   ├── jwt-auth.guard.ts
│   │   │   │   └── roles.guard.ts
│   │   │   ├── strategies/
│   │   │   │   └── jwt.strategy.ts
│   │   │   ├── decorators/
│   │   │   │   └── roles.decorator.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.module.ts
│   │   ├── contacts/
│   │   │   ├── dto/
│   │   │   │   ├── create-contact.dto.ts
│   │   │   │   └── update-contact.dto.ts
│   │   │   ├── entities/
│   │   │   │   └── contact.entity.ts
│   │   │   ├── contacts.controller.ts
│   │   │   ├── contacts.service.ts
│   │   │   └── contacts.module.ts
│   │   ├── users/
│   │   │   ├── entities/
│   │   │   │   └── user.entity.ts
│   │   │   └── users.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── uploads/
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── tsconfig.json
│
├── Frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   ├── contacts/
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   ├── ContactModal.tsx
│   │   │   └── DeleteConfirmModal.tsx
│   │   └── contexts/
│   │       ├── AuthContext.tsx
│   │       └── ThemeContext.tsx
│   ├── public/
│   ├── .env.local
│   ├── .gitignore
│   ├── package.json
│   ├── tailwind.config.ts
│   ├── next.config.js
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

---

## 👤 User Roles & Permissions

### Regular User
- ✅ Create, read, update, and delete **own** contacts
- ✅ Upload contact photos
- ✅ Search and filter contacts
- ✅ View own profile

### Admin
- ✅ All user permissions
- ✅ Access **all users'** contacts
- ✅ Manage all contacts in the system
- ✅ View all users

---

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt encryption for passwords
- **Role-based Access Control** - User and Admin roles
- **Input Validation** - Server-side validation using class-validator
- **File Upload Validation** - File type and size restrictions
- **CORS Protection** - Configured CORS policies
- **SQL Injection Prevention** - TypeORM parameterized queries

---

## 🧪 Testing

### Backend Tests
```bash
cd Backend

# Run unit tests
npm run test

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
```

### Frontend Tests
```bash
cd Frontend

# Run tests
npm run test

# Run tests with coverage
npm run test -- --coverage
```

---

## 🐳 Docker Support (Optional)

Create a `docker-compose.yml` file in the root directory:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: contact_management
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./Backend
    ports:
      - "3001:3001"
    environment:
      DATABASE_HOST: postgres
      DATABASE_PORT: 5432
      DATABASE_USER: postgres
      DATABASE_PASSWORD: postgres
      DATABASE_NAME: contact_management
    depends_on:
      - postgres

  frontend:
    build: ./Frontend
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:3001
    depends_on:
      - backend

volumes:
  postgres_data:
```

**Run with Docker:**
```bash
docker-compose up -d
```

---

## 📸 Screenshots

### Login Page
![Login Page](screenshots/login.png)

### Registration Page
![Registration](screenshots/register.png)

### Contacts Dashboard
![Dashboard](screenshots/dashboard.png)

### Add/Edit Contact
![Contact Modal](screenshots/contact-modal.png)

### Dark Mode
![Dark Mode](screenshots/dark-mode.png)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Clairazi**
- GitHub: [@Clairazi](https://github.com/Clairazi)
- Repository: [ContactManagementApplication](https://github.com/Clairazi/ContactManagementApplication)

---

## 🙏 Acknowledgments

- [Nest.js Documentation](https://docs.nestjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeORM Documentation](https://typeorm.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

<div align="center">

**⭐ Star this repository if you find it helpful!**

Made with ❤️ by [Clairazi](https://github.com/Clairazi)

</div>
