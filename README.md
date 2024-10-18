# Financial Analysis Web Application

This project is a full-stack web application for financial analysis. It consists of a Flask backend that implements a financial analysis model and a React frontend that allows users to upload data and view the analysis results.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Project Installation Setup](#project-installation-setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)

## Features

- Upload financial data in JSON format
- Analyze financial data using predefined rules
- Display analysis results in a user-friendly interface

## Tech Stack

- Backend: Flask (Python)
- Frontend: React (JavaScript)
- API: RESTful API
- Cross-Origin Resource Sharing (CORS) enabled

### Prerequisites

- Python 
- npm 

### Project Installation Setup

1. Clone the repository:
   
   git clone https://github.com/nitishite/Karbon_Assignment.git
   cd Karbon_Assessment
   

### Backend Setup

1. Navigate to the backend directory:
   
   cd backend
   

2. Install the required Python packages:
   
   pip install Flask Flask-CORS
   

3. Run this command:
   
   python model.py
   
   The Flask server will start running on http://localhost:8000.

### Frontend Setup

1. Navigate to the frontend directory:
   
   Root directory is the frontend directory.
   

2. Install the required npm packages:
   
   npm install
   

3. Start the React development server:
   
   npm run dev
   
   The React app will be available at http://localhost:5173.



## API Endpoints

- POST /probe: Accepts JSON financial data and returns analysis results