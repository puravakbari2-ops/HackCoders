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

## 🔐 Environment Variables

The application reads configuration from `process.env` (or `backend/.env` for local development).

| Variable Name | Required | Default / Example | Purpose |
|:---|:---|:---|:---|
| `PORT` | Optional | `5000` (Local) / assigned by host | HTTP server port |
| `NODE_ENV` | Optional | `development` / `production` | Environment mode |
| `FRONTEND_URL` | Optional | `*` | Allowed CORS origin |
| `GEMINI_API_KEY` | **Required** for AI | (secret) | Google AI Studio key for Gemini 3.6 Flash |
| `LLM_MODEL` | Optional | `gemini-3.6-flash` | Gemini model name for grounded reasoning |
| `EMBEDDING_MODEL` | Optional | `gemini-embedding-001` | Embedding model |
| `USE_LOCAL_EMBEDDINGS` | Optional | `true` | Enable fast 512-dim feature hashing |
| `TOP_K_RETRIEVAL` | Optional | `15` | Initial candidate pool size |
| `TOP_K_CONTEXT` | Optional | `5` | Final grounded context chunk count |
| `SIMILARITY_THRESHOLD` | Optional | `0.35` | Minimum cosine similarity threshold |
| `RAG_DEBUG` | Optional | `false` | Include debug metadata in API response |
| `SUPABASE_URL` | **Required** for Supabase | `https://<ref>.supabase.co` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Optional | (secret) | Supabase client anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | **Required** for Supabase | (secret) | Supabase service-role key (server-side only) |

> **Note:** Never commit `.env` or credentials to git. Set secrets directly in your Render or hosting provider's Environment settings.

---

## 🗄️ Supabase Setup

Supabase provides persistent cloud storage for user feedback ratings, query analytics, and scheme recommendation logs.

### Database Tables (SQL)
Run the following SQL in your **Supabase Dashboard → SQL Editor**:

```sql
-- 1. Feedback Table
CREATE TABLE IF NOT EXISTS feedback (
    id          BIGSERIAL PRIMARY KEY,
    session_id  TEXT,
    message_id  TEXT,
    rating      TEXT NOT NULL CHECK (rating IN ('positive', 'negative')),
    reason      TEXT,
    query       TEXT,
    response    TEXT,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. RAG Analytics Log Table
CREATE TABLE IF NOT EXISTS rag_queries (
    id            BIGSERIAL PRIMARY KEY,
    session_id    TEXT,
    query         TEXT,
    profile       JSONB,
    scheme_count  INTEGER DEFAULT 0,
    response_time INTEGER DEFAULT 0,
    source        TEXT DEFAULT 'web',
    created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Scheme Recommendations History Table
CREATE TABLE IF NOT EXISTS scheme_recommendations (
    id           BIGSERIAL PRIMARY KEY,
    session_id   TEXT,
    scheme_id    TEXT,
    scheme_name  TEXT,
    rank         INTEGER,
    score        NUMERIC,
    profile      JSONB,
    created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS & policies
ALTER TABLE feedback               ENABLE ROW LEVEL SECURITY;
ALTER TABLE rag_queries            ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheme_recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_all_feedback" ON feedback FOR ALL USING (true);
CREATE POLICY "service_role_all_rag" ON rag_queries FOR ALL USING (true);
CREATE POLICY "service_role_all_recs" ON scheme_recommendations FOR ALL USING (true);
```

---

## 🧠 RAG & Vector Index Setup

The knowledge base contains **1,074 verified government schemes** chunked into **4,950 vectorized knowledge segments**.

1. **Precomputed Index**:
   The index files (`vectors.json`, `metadata.json`, `version.json`) are stored in `backend/data/vector_index/` and tracked in the repository so startup is instant (~50ms) with zero external cold-start delays.
2. **Auto-Ingestion Fallback**:
   If the index is ever missing or deleted on any environment, `backend/server.js` automatically runs the ingestion pipeline on boot and generates all 4,950 vectors in <300ms using the built-in feature hashing engine.
3. **Manual Re-indexing**:
   To force re-index the entire knowledge base:
   ```bash
   cd backend
   npm run ingest -- --force
   ```

---

## 🚀 Render Deployment

The backend is deployed as a Web Service on Render:
- **Build Command:** `npm install`
- **Start Command:** `node backend/server.js`
- **Health Check Path:** `/api/health`

### Environment Variables in Render Dashboard
Add the following in your Render service's **Environment** tab:
1. `GEMINI_API_KEY` = your Google AI Studio API key
2. `SUPABASE_URL` = `https://<your-project>.supabase.co`
3. `SUPABASE_ANON_KEY` = your Supabase anon key
4. `SUPABASE_SERVICE_ROLE_KEY` = your Supabase service-role secret key
5. `LLM_MODEL` = `gemini-3.6-flash`
6. `USE_LOCAL_EMBEDDINGS` = `true`

---

## 🔍 Verifying Health (`/api/health`)

Check the health endpoint in your browser or with curl:

```bash
curl https://hackcoders.onrender.com/api/health
```

Expected healthy production response:
```json
{
  "status": "OK",
  "message": "JanSahay AI Backend is running",
  "version": "2.0.0",
  "gemini": {
    "configured": true,
    "model": "gemini-3.6-flash"
  },
  "rag": {
    "status": "ready",
    "indexed": true,
    "vectorCount": 4950,
    "schemeCount": 1074,
    "embeddingModel": "gemini-embedding-001",
    "llmModel": "gemini-3.6-flash"
  },
  "supabase": {
    "connected": true,
    "configured": true,
    "status": "ready",
    "url": "https://hxeifqezuciqhldvsgsu.supabase.co"
  },
  "timestamp": "2026-09-08T05:25:00.000Z"
}
```

---

## ✨ Key Features

- **1074 Verified Government Schemes** — Comprehensive pan-India and state-wise schemes
- **Unified RAG Pipeline** — Semantic retrieval + BM25 keyword + hard rule eligibility gates
- **Evidence-Based Grounded LLM** — Strict anti-hallucination layer powered by Gemini 3.6 Flash
- **Persistent Analytics & Feedback** — Live cloud logging to Supabase
- **Multilingual Support** — Hindi, Gujarati, and English query handling
- **Zero-Latency In-Memory Vector Search** — Sub-millisecond similarity scoring

---

*Built with ❤️ by the HackCoders Team*
