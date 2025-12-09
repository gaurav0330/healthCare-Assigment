# Patient Document Portal

A simple, privacy-focused full-stack web app that lets patients upload, view, download, and delete their medical documents (PDF only). Built as a Full Stack Developer Internship assignment.

Live Demo (local only) • Fully working • 100% offline & private

## Features

| Status |
|------------------------------------------------------|--------|
| Upload PDF medical documents (with validation)       | Done   |
| List all uploaded documents with metadata            | Done   |
| Download documents                                   | Done   |
| Delete documents (file + DB record)                  | Done   |
| Dark / Light mode toggle                             | Done   |
| Search & sorting of documents                        | Done   |
| Beautiful PDF icons + formatted dates                | Done   |
| Toast notifications                                  | Done   |

## Tech Stack

### Frontend
- React + Vite (fast HMR & builds)
- Tailwind CSS
- Axios
- React Icons
- React Hot Toast

### Backend
- Node.js + Express.js
- Multer (file uploads)
- SQLite (lightweight local DB)
- Local file storage in `/backend/uploads`

## Project Structure
patient-document-portal/
├── backend/
│   ├── uploads/               # stored PDF files
│   ├── src/
│   │   ├── index.js
│   │   └── db.js
│   └── package.json
├── frontend/
│   ├── src/
│   └── package.json
├── design.md                  # Detailed design document
└── README.md                  # This file
text## How to Run Locally

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd patient-document-portal
2. Start Backend
Bashcd backend
npm install
node src/index.js
Backend runs at → http://localhost:5000
3. Start Frontend
Bashcd ../frontend
npm install
npm run dev
Frontend runs at → http://localhost:5173
Open your browser and go to http://localhost:5173 — you're all set!
API Examples (curl / Postman)
Upload PDF
Bashcurl -X POST http://localhost:5000/documents/upload -F "file=@./sample.pdf"
List all documents
Bashcurl http://localhost:5000/documents
Download document (ID = 1)
Bashcurl -O http://localhost:5000/documents/1
Delete document
Bashcurl -X DELETE http://localhost:5000/documents/1
Testing Checklist

































TestExpected ResultUpload valid PDFAppears instantly in listUpload non-PDFError toast shownDownload fileCorrect PDF downloadsDelete fileRemoved from UI + diskDark/Light mode toggleTheme changes instantlySearch & sortWorks perfectly
Status
Fully completed & tested
All core + extra features implemented
Complete documentation (design.md + README.md)
Author
Gaurav J
Full Stack Developer | React + Node.js
Feel free to reach out for code review or enhancements!
Happy coding