# Mini CRM 

A full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js). 
This tool serves as a Client Lead Management System, allowing admins to track new leads, view details, add notes to timelines, and upgrade a lead's status towards conversion.

## Prerequisites
Since you are setting this up manually, please ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (which includes `npm`)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)

## Quick Start Guide

### 1. Database Setup
Ensure that MongoDB is running locally on port `27017` (default).

### 2. Backend Setup
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd path/to/mini-crm/backend
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Start the Node.js server:
   ```bash
   npm run dev
   ```
   *Note: On first boot, the server will automatically seed a default admin account into the database.*

### 3. Frontend Setup
1. Open a new, separate terminal and navigate to the `frontend` folder:
   ```bash
   cd path/to/mini-crm/frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open the provided localhost URL in your browser (usually `http://localhost:3000`).

## Usage
Log in using the default admin credentials:
- **Username:** `admin`
- **Password:** `password123`

Once in the dashboard:
- Use the **Add Lead** button to create a new client lead.
- Click on any row in the **Leads Table** to view details, add notes, and change the lead's status from New to Contacted or Converted.
- Click **Edit** to modify the lead's core details.

## Tech Stack
- Frontend: React.js (Vite), React Router, Axios, Lucide Icons
- Backend: Node.js, Express.js
- Database: MongoDB via Mongoose
- Authentication: JSON Web Tokens (JWT) + bcryptjs
