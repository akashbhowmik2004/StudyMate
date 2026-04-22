# Study Tracker + Doubt Sharing Platform

A full-stack MERN application where students can track study progress, post doubts, join communities, and discuss with other learners.

## Features

- User Authentication (JWT + Cookies)
- Create and view doubt posts
- Community-based doubt posting
- User-linked posts (author name + profile)
- Like and comment system (in progress)
- Study tracking dashboard (planned)

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

## Folder Structure

```bash
client/
server/
```

## Installation

### Clone repository

```bash
git clone https://github.com/yourusername/study-tracker.git
cd study-tracker
```

### Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

Run backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## API Routes

### Auth
- POST /signup
- POST /login
- POST /logout

### Posts
- GET /api/posts
- POST /api/posts

## Screenshots
(Add screenshots later)

## Future Improvements
- Real-time doubt discussion
- Upvotes/downvotes
- Study streaks
- Notifications
- Community moderation

## Learning Goals
Built to practice:
- Full-stack MERN development
- Authentication & protected routes
- REST API design
- MongoDB relationships using populate()

## Author
Akash Bhowmik
