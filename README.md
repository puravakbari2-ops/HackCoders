# JanSahay AI 🤖🇮🇳

**JanSahay AI** is a full-stack AI-powered government scheme recommendation platform that helps citizens discover and apply for government schemes they are eligible for.

---

## 📁 Project Structure

```
HackCoders/
│
├── frontend/                       # Client-side application
│   ├── index.html                  # Main application HTML
│   └── assets/
│       ├── css/
│       │   └── style.css           # Complete design system & styles
│       └── js/
│           ├── data.js             # Static data (categories, FAQs, form steps)
│           ├── form.js             # Multi-step form & results rendering
│           ├── chat.js             # AI Chat widget
│           └── main.js             # App orchestrator (theme, navbar, search...)
│
├── backend/                        # Node.js + Express REST API
│   ├── server.js                   # Express entry point
│   ├── package.json
│   ├── .env.example                # Environment variable template
│   ├── data/
│   │   └── schemes.json            # 25 real Government schemes dataset
│   ├── routes/
│   │   ├── schemes.js              # /api/schemes/*
│   │   ├── chat.js                 # /api/chat
│   │   └── search.js               # /api/search
│   ├── controllers/
│   │   ├── schemesController.js    # Scheme listing + AI recommendation engine
│   │   ├── chatController.js       # Knowledge-base chatbot
│   │   └── searchController.js     # Full-text search
│   └── middleware/
│       ├── cors.js                 # CORS configuration
│       └── errorHandler.js         # Global error handler
│
└── README.md
```

---

## 🛠️ Technology Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Frontend  | HTML5, CSS3, Vanilla JS |
| Backend   | Node.js, Express.js     |
| Data      | JSON (mock dataset)     |
| Icons     | FontAwesome 6           |
| Fonts     | Google Fonts (Outfit, Inter) |

---

## 🚀 How to Run

### Option 1: Full Stack (Recommended)

```bash
# 1. Install backend dependencies
cd backend
npm install

# 2. Copy env file
cp .env.example .env

# 3. Start the backend server
npm start
# OR for development with hot reload:
npm run dev
```

Then open **http://localhost:5000** — the backend serves the frontend too!

### Option 2: Frontend Only (No Backend)

Simply open `frontend/index.html` directly in a browser. The app gracefully falls back to sample data when the backend is unavailable.

---

## 🌐 API Endpoints

| Method | Endpoint                    | Description                        |
|--------|-----------------------------|------------------------------------|
| GET    | `/api/health`               | Server health check                |
| GET    | `/api/schemes`              | List all schemes (paginated)       |
| GET    | `/api/schemes/:id`          | Get scheme by ID                   |
| GET    | `/api/schemes/categories`   | Get all categories with counts     |
| POST   | `/api/schemes/recommend`    | AI-match user profile to schemes   |
| GET    | `/api/search?q=query`       | Full-text search                   |
| POST   | `/api/chat`                 | Chatbot response                   |

### Example: Recommend Schemes

```bash
curl -X POST http://localhost:5000/api/schemes/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "gender": "female",
    "age": 25,
    "state": "maharashtra",
    "area": "rural",
    "category": "sc",
    "income": "below-1l",
    "occupation": "farmer"
  }'
```

---

## ✨ Key Features

- **AI Profile Matching** — Scores 25+ schemes against 8 profile parameters
- **Multi-Step Form** — Beautiful 5-step wizard for profile collection
- **AI Chatbot** — Knowledge-base driven assistant with API backend
- **Full-Text Search** — Search across scheme titles, ministries, tags, and benefits
- **Dark Mode** — Full dark/light theme toggle with persistence
- **Responsive Design** — Mobile-first, works on all screen sizes
- **Graceful Fallback** — Frontend works offline with sample data

---

*Built with ❤️ for the HackCoders Hackathon*
