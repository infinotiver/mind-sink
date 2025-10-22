### Quick context for AI code contributors

This repository (Mind Sink) is a two-part web app: a FastAPI backend (Python) and a Vite + React + TypeScript frontend. The backend exposes REST endpoints (sinks, items, users) and uses MongoDB (motor). The frontend consumes the API via `src/api/apiClient.ts` and uses React Router + React Query for data loading and state.

Do not invent new high-level architecture — the project is intentionally small and opinionated: single FastAPI service + a single-page frontend. Keep changes local to one side (backend/frontend) unless cross-cutting updates are required.

Key files to read before editing:

- Backend: `backend/main.py` (routes and dependency wiring), `backend/auth.py` (Discord OAuth and JWT handling), `backend/crud.py` (DB operations), `backend/models.py` (Pydantic models), `backend/database.py` (Mongo connection).
- Frontend: `frontend/src/api/apiClient.ts` (axios instance & token handling), `frontend/src/context/AuthProvider.tsx` (auth context used across the app), `frontend/src/app/*` (page components), `frontend/src/App.tsx` (routes).

Environment & secrets

- Backend expects environment variables (export or .env):
  - `MONGO-URI` — MongoDB connection string used by `backend/database.py`.
  - `DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET`, `DISCORD_REDIRECT_URI` — OAuth values used in `backend/auth.py`.
  - `JWT_SECRET` — used to sign/verify tokens in `backend/auth.py`.
  - `FRONTEND_URL` — used to redirect back to frontend after OAuth.
- Frontend vars (Vite):
  - `VITE_API_BASE_URL` — overrides default API base URL (`https://mind-sink.onrender.com`).
  - `VITE_APP_TEST_ACCESS_TOKEN` — optional override token during development (see `frontend/src/api/apiClient.ts`).

Dev start / build commands (what humans use)

- Frontend (dev): `cd frontend; npm install; npm run dev` (Vite dev server). Build with `npm run build`.
- Backend (dev): typical: `pip install -r backend/requirements.txt` then run `uvicorn backend.main:app --reload --port 8000` (or use gunicorn in production). The repository doesn't include a Procfile; the deployed URL(s) are referenced in code.

Patterns & conventions specific to this project

- Auth: Discord OAuth flow is implemented server-side in `backend/auth.py`. After successful OAuth the backend redirects to `FRONTEND_URL/auth/callback?token=<jwt>`. The frontend `AuthCallbackPage` reads `token` from URL and calls `login(token)` from `AuthProvider`.
- Token handling: The frontend stores a token in `localStorage` (via `AuthProvider`) and the axios instance in `apiClient.ts` adds `Authorization: Bearer <token>` to requests. In dev you can set `VITE_APP_TEST_ACCESS_TOKEN` for a static token.
- Mongo ObjectIds: Pydantic models use custom `PyObjectId` validators (`backend/models.py`) and expect stringified ObjectIds in API payloads/responses. When writing code that interacts with ObjectIds, follow existing helpers: validate ObjectId before casting.
- Error handling: backend endpoints wrap exceptions and raise FastAPI HTTPExceptions for client responses. Keep exception-to-HTTP mapping consistent with current patterns in `backend/main.py` and `crud.py`.

Integration points to be careful with

- OAuth redirect URIs and tokens — changing parameter names or redirect flow requires edits on both `backend/auth.py` and `frontend/src/app/AuthCallbackPage.tsx`.
- Database collection names are defined in `backend/database.py` (`boards`, `items`, `users`). Changing them must be reflected across `crud.py`.
- API base URL is read from environment in `apiClient.ts`. When running frontend and backend locally, use `VITE_API_BASE_URL=http://localhost:8000`.

Examples of common edits and where to implement them

- Add a new API route (typical flow):

  1. Add the route handler in `backend/main.py` and wire in security/deps (see `get_current_user_id` example).
  2. Implement DB logic in `backend/crud.py` (prefer reusing helpers like `create_item`, `get_boards`).
  3. Add or update Pydantic models in `backend/models.py` (use `PyObjectId` validators where IDs are expected).
  4. Update frontend API wrapper under `frontend/src/api/` and add React Query hooks and a consuming page under `frontend/src/app/`.

- Change frontend data fetching:
  - Update/create a file in `frontend/src/api/` (e.g., `items.ts`) and use `apiClient` to make requests.
  - Use React Query hooks for caching and invalidation and update components in `frontend/src/app/*` to consume the hooks.

Common edits checklist (quick)

- Add backend route:

  - [ ] `backend/main.py` — add route and response model
  - [ ] `backend/crud.py` — add DB helper
  - [ ] `backend/models.py` — add request/response schema if needed
  - [ ] Run `uvicorn backend.main:app --reload` and sanity-check the new endpoint with curl/postman

- Add frontend consumption:
  - [ ] `frontend/src/api/<name>.ts` — add api call using `apiClient`
  - [ ] Add React Query hook or use `useQuery`/`useMutation` where appropriate
  - [ ] Update or add page/component in `frontend/src/app/*` and wire route in `frontend/src/App.tsx` if a new page
  - [ ] Run `npm run dev` and test in browser; check console for 401s (token) and CORS

Tests & CI

- There are no automated tests in the repository. Keep changes small and runnable locally. If adding tests, prefer lightweight unit tests that don't require external services or mock Mongo via `mongomock`.

Quick code snippets (real examples from repo):

- Fetching user sinks (backend): see `backend/crud.py:get_boards(user_id)` — async cursor `.find()` -> collect and return `SinkModel`.
- Frontend API client token usage (real): `frontend/src/api/apiClient.ts` intercepts requests and uses `localStorage.getItem('token')` or `VITE_APP_TEST_ACCESS_TOKEN`.

What to avoid

- Don't change the OAuth parameter names or JWT shape without updating both backend and frontend.
- Don't assume ObjectId values are raw BSON; handlers expect strings and use `PyObjectId` validators.

If unclear or incomplete

- Ask for the missing secrets or which environment you want to run (local vs deployed). Provide the expected env names and an example `.env` snippet; do not request actual secret values in the repo.

Thank you — ask for clarification if any redirect, env, or collection behavior is ambiguous.
