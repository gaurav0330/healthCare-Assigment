# Patient Document Portal — Design Document

## 1. Tech Stack Choices

### Q1. What frontend framework did you use and why?
**React + Vite**

- Lightning-fast development with Hot Module Replacement (HMR)
- Component-based architecture
- Significantly better build performance and smaller bundles than Create React App
- Excellent ecosystem and seamless integration with Tailwind CSS

### Q2. What backend framework did you choose and why?
**Node.js + Express.js**

- Lightweight and extremely popular for building REST APIs
- Simple and robust file upload handling using Multer middleware
- High performance with non-blocking I/O
- Full JavaScript/TypeScript consistency across frontend and backend

### Q3. What database did you choose and why?
**SQLite**

- Zero-configuration, no separate server required
- File-based → perfect for local development and assignments
- Easy to back up (just copy the .db file)
- More than sufficient for a single-user application

### Q4. If the app needed to support 1,000 concurrent users, what changes would be required?

- Replace SQLite with PostgreSQL (better concurrency & scalability)
- Move file storage to cloud object storage (AWS S3, Google Cloud Storage, etc.)
- Add proper authentication (JWT or OAuth2)
- Implement secure login (email/password or OTP)
- Add rate limiting, CORS policies, input validation, and role-based access control
- Use a reverse proxy/load balancer (NGINX) and horizontal scaling

## 2. Architecture Overview
┌────────────────┐          Upload / Fetch           ┌────────────────┐
│    Frontend     │ ───────────────────────────────▶ │    Backend     │
│  React + Vite   │         JSON / File APIs          │  Express.js    │
└───────┬────────┘                                   └───────┬────────┘
│                                                    │
│ Preview / Download                                 │ Query / Save
▼                                                    ▼
┌────────────────┐                                  ┌────────────────┐
│  Local Uploads  │ ◀──────────────────────────────▶ │   SQLite DB    │
│    Folder       │        File operations           │ documents table│
└────────────────┘                                  └────────────────┘
text## 3. API Specification

| Endpoint               | Method | Description                    |
|------------------------|--------|--------------------------------|
| `/documents/upload`    | POST   | Upload a PDF file              |
| `/documents`           | GET    | List all uploaded documents    |
| `/documents/:id`       | GET    | Download a specific file       |
| `/documents/:id`       | DELETE | Delete a specific file         |

### API Details

#### POST /documents/upload
**Request** (multipart/form-data)
file: <PDF file>
text**Success Response (200)**
```json
{
  "message": "File uploaded successfully",
  "document": {
    "id": 5,
    "filename": "12345-report.pdf",
    "originalName": "report.pdf",
    "size": 29045
  }
}
GET /documents
Response
JSON[
  {
    "id": 1,
    "originalName": "blood_report.pdf",
    "filesize": 204800,
    "created_at": "2025-12-09 15:43:21"
  }
]
GET /documents/:id
Streams the PDF file to the browser for download
DELETE /documents/:id
Response
JSON{
  "message": "Document deleted successfully"
}
4. Data Flow Description
Upload Flow

User selects a PDF file in the React UI
Frontend sends multipart/form-data to POST /documents/upload
Backend validates that the file is a PDF
Multer saves the file to the local uploads/ folder with a unique name
Metadata (original name, stored filename, size, created_at) is saved in SQLite
Success response → UI refreshes the document list (no page reload)
Newly uploaded file appears instantly

Download Flow

User clicks "Download" on a document
Frontend calls GET /documents/:id
Backend retrieves the file path from the database
File is streamed to the browser with Content-Disposition: attachment

5. Assumptions & Constraints

Only one user → no authentication or login system needed
Only PDF files are allowed
Files are stored locally in an uploads/ folder
Files are expected to be reasonably small (no chunked uploads)
Application runs locally (not deployed to the cloud)
No concurrency concerns due to single-user design