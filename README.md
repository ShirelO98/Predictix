# Predictix

Predictix is a predictive maintenance system with a frontend built in React (using Vite) and a backend powered by Django. This guide explains how to set up and run the project locally.

## Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [Python](https://www.python.org/) (Version 3.10+ recommended)
- [pip](https://pip.pypa.io/en/stable/) (Comes with Python)
- [virtualenv](https://virtualenv.pypa.io/en/latest/)

## Setting Up the Backend (Django)

1. Navigate to the backend directory:
   ```sh
   cd Predictix-Server
   ```
2. Create a virtual environment:
   ```sh
   python -m venv venv
   ```
3. Activate the virtual environment:
   - On macOS/Linux:
     ```sh
     source venv/bin/activate
     ```
   - On Windows:
     ```sh
     venv\Scripts\activate
     ```
4. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
5. Apply migrations:
   ```sh
   python manage.py migrate
   ```
6. Run the development server:
   ```sh
   python manage.py runserver
   ```
   The backend should now be running at `http://127.0.0.1:8000/`.

## Setting Up the Frontend (React with Vite)

1. Navigate to the frontend directory:
   ```sh
   cd Predictix-Client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
   The frontend should now be running at `http://localhost:5173/`.

## Running the Full Application

After starting both the backend (`Django`) and frontend (`React`), you should be able to interact with the system locally.

## Troubleshooting

- If you encounter dependency issues, try deleting the `node_modules` folder and `package-lock.json`, then reinstall dependencies:
  ```sh
  rm -rf node_modules package-lock.json
  npm install
  ```
- If Django doesn't start, check if all required dependencies are installed and ensure migrations have been applied.