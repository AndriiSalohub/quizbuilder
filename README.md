# QuizBuilder

## Prerequisites
- Node.js (for npm/yarn) or Bun (recommended package manager)
- Database (PostgreSQL) installed and running
- Git (to clone the repository)

## Setup Instructions

### 1. Start Frontend and Backend
- **Clone repository**:
    ```bash
    git clone https://github.com/AndriiSalohub/quizbuilder
    ```
- **Navigate to Folders**:
  - Change directory to `frontend` and `backend`:
    ```bash
    cd frontend
    cd backend
    ```
- **Install Dependencies**:
  - Use Bun (recommended): `bun install`
  - Alternatively, use npm: `npm install` or yarn: `yarn install`
- **Start Frontend**:
  - Bun: `bun start`
  - npm: `npm start`
  - yarn: `yarn start`
  - Default port is typically 3000; check `package.json` for specifics.
- **Start Backend**:
  - Bun: `bun run start`
  - npm: `npm run start`
  - yarn: `yarn run start`
  - Ensure environment variables are configured (see database setup).

### 2. Set Up Database
- **Navigate to Backend**:
  - `cd backend`
- **Configure Environment**:
  - Create a `.env.development` file based on `.env.example` (if provided) or add:
    ```
    DB_URL=your_postgres_url
    PORT=5000
    ```
  - Adjust values as per your database setup.

### 3. Set Up Database
- **Navigate to Frontend**:
  - `cd frontend`
- **Configure Environment**:
  - Create a `.env.development` file based on `.env.example` (if provided) or add:
    ```
    VITE_API_URL=backend_server_url
    ```
  - Adjust values as per your database setup.

### 4. Create Sample Quiz
- **Verify Services**:
  - Ensure backend, frontend, and database are running without errors.
- **Access the Site**:
  - Open your browser and go to `http://localhost:3000` (or as configured).
- **Create Quiz**:
  - Click on "Create Quiz".
  - Fill out the form with quiz title, questions, and options.
  - Submit to save the quiz.

