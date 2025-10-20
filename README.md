# Mind Sink

![Mind Sink Dashboard preview](https://raw.githubusercontent.com/infinotiver/mind-sink/refs/heads/main/frontend/public/dashboard.png)

Mind Sink is an ad-free, distraction-minimizing web app for collecting and showcasing creative inspiration. The app favors focused curation over algorithmic feeds: no infinite scrolling, no recommendations, just your boards (called "sinks") and the items inside them.

Users can create sinks (boards), add items (images, links, embeds), tag and organize content, and share lightweight public pages.

## Highlights

- Lightweight boards called "sinks" with titles, descriptions, visibility and tags
- Add items (images or links) with optional auto-generated tags
- Simple authentication using Discord OAuth (server-side)
- React + TypeScript frontend with React Query for data fetching and caching

## Tech stack

- Frontend: React, TypeScript, TailwindCSS, Vite
- Backend: FastAPI, Motor (async Mongo client), Pydantic models
- State & data: React Context (Auth), @tanstack/react-query
- API: Axios (wrapped in `frontend/src/api/apiClient.ts`)

## Local development

Start the frontend (Vite dev server):

```powershell
cd frontend
npm install
npm run dev
```

Start the backend (FastAPI):

```powershell
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --port 8000
```

When running both locally, point the frontend to the backend using a Vite env:

```
VITE_API_BASE_URL=http://localhost:8000
```

## Environment variables

Backend (`backend/.env` or environment):

- `MONGO-URI` — MongoDB connection string used by `backend/database.py`.
- `DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET`, `DISCORD_REDIRECT_URI` — Discord OAuth credentials used in `backend/auth.py`.
- `JWT_SECRET` — secret used to sign JWT tokens for session handling.
- `FRONTEND_URL` — frontend base URL used to redirect after OAuth (e.g., `http://localhost:5173`).

Frontend (Vite env):

- `VITE_API_BASE_URL` — API base URL (defaults to the deployed API if unset).
- `VITE_APP_TEST_ACCESS_TOKEN` — optional JWT used during frontend-only development to bypass OAuth flow.

There is a template at `backend/.env.example` to help local setup. Be careful not to commit real secrets to public repositories.

## Folder structure (tour)

Top-level

- `frontend/` — the React + TypeScript app (Vite)
- `backend/` — FastAPI server and DB logic

Frontend (important paths)

- `frontend/src/api/apiClient.ts` — axios instance; attaches `Authorization: Bearer <token>` from `localStorage` or `VITE_APP_TEST_ACCESS_TOKEN`.
- `frontend/src/context/AuthProvider.tsx` — client-side auth context and `login(token)` helper used by `AuthCallbackPage`.
- `frontend/src/app/*` — page-level route components (e.g., `DashboardPage`, `BoardViewPage`, `ItemViewPage`).
- `frontend/src/components/ui/*` — shared UI primitives (Spinner, Loading, ErrorAlert, etc.).

Backend (important paths)

- `backend/main.py` — route registration and dependency (e.g., `get_current_user_id`) wiring.
- `backend/auth.py` — Discord OAuth flow, JWT generation/verification and user creation.
- `backend/crud.py` — database helpers for boards (sinks), items and users. Use these helpers when adding API routes.
- `backend/models.py` — Pydantic models and `PyObjectId` validators used by the API.
- `backend/database.py` — motor client and collection handles (`boards`, `items`, `users`).

## Conventions & gotchas (project-specific)

- ObjectId handling: Pydantic uses a `PyObjectId` type with validators in `backend/models.py`. API payloads and responses use stringified ObjectId values. When creating or querying records from the DB, convert to `ObjectId` where needed (see `crud.py`).
- Auth flow: Discord OAuth is server-side in `backend/auth.py`. After a successful OAuth exchange, the backend redirects to `FRONTEND_URL/auth/callback?token=<jwt>`; the frontend reads `token` and calls `login(token)` in `AuthProvider`.
- API client: `frontend/src/api/apiClient.ts` will throw an Error if no token is present — during local development set `VITE_APP_TEST_ACCESS_TOKEN` or perform OAuth in the browser.

## Adding a new API route (quick checklist)

1. Add route handler to `backend/main.py` and choose proper dependencies (use `get_current_user_id` for authenticated routes).
2. Implement DB logic in `backend/crud.py` or reuse/extend existing helpers.
3. Add request/response Pydantic models to `backend/models.py` if necessary.
4. Add a frontend API wrapper in `frontend/src/api/` and a React Query hook or call site in the appropriate page/component.

## CI/CD & DevOps

Mind Sink uses GitHub Actions for automated testing and deployment:

- **Pull Request Checks** - Automated linting, type checking, and builds run on every PR
- **Automatic Deployment** - Merges to `main` trigger deployment to Render
- **Branch Protection** - Main branch requires passing CI checks before merge

**Quick Start:**

1. Read `.github/SETUP_CHECKLIST.md` for initial setup
2. See `.github/QUICK_REFERENCE.md` for daily workflow commands
3. Full documentation in `.github/CICD_GUIDE.md`

**Development Workflow:**

```powershell
# Create feature branch
git checkout -b feature/your-feature

# Make changes, commit
git commit -m "feat: add description"

# Push and open PR
git push origin feature/your-feature
```

CI checks will run automatically. When checks pass and PR is approved, merge to `main` to deploy to production.


