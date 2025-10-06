# Mind Sink
![Demo of Mind Sink Dashboard](https://raw.githubusercontent.com/infinotiver/mind-sink/refs/heads/main/frontend/public/dashboard.png)

Mind Sink is a simple, ad-free web application designed to help users organize and showcase their creative inspirations without distractions. With no infinite scrolling and algorithims, it ensures a focused and streamlined experience. Users can create boards (sinks), add items (images, links, etc.), and tag them for better organization.


## Features

- **Create Boards (Sinks):** Users can create boards with titles, descriptions, and tags.
- **Add Items:** Upload images or links to boards with metadata like tags and sources.
- **Tagging System:** Add and manage tags for better categorization.
- **Responsive Design:** Optimized for various screen sizes.

## Tech Stack

- **Frontend:** React, TypeScript, TailwindCSS
- **State Management:** React Context, React Query
- **Routing:** React Router
- **Icons:** React Icons
- **API Integration:** Axios

## Folder Structure

### Frontend (`frontend/`)
- `src/components`: Reusable UI components (e.g., `TagsInput`, `GalleryItem`, `SinkCreate`).
- `src/api`: API client functions for interacting with backend services.
- `src/context`: Context providers for authentication and global state.
- `src/app`: Page-level components.

### Backend (`backend/`)
- `auth.py`: Authorization logic, handler and callback
- `crud.py`: Basic CRUD (Create-Read-Update-Delete) functions for endpoints
- `database.py`: MongoDB database initialization
- `main.py`: FastAPI setup
- `models.py`: Pydantic models for `Sinks`, `Users` and `Items`
- `requirements.txt`: Requirements of the python backend API 
---

<a href="https://mind-sink-6llu.onrender.com"><img src="https://raw.githubusercontent.com/infinotiver/mind-sink/refs/heads/main/frontend/public/ms.png" width=100/></a>

[Originally Made for Hack Club's Summer of Making 2025](https://summer.hackclub.com/projects/6206)

