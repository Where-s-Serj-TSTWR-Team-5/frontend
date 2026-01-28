# Food Forest – Frontend

This repository contains the frontend of the Food Forest application, built using SvelteKit.

The software is released to end users through this repository and can be installed and run locally by following the instructions below.

### IMPORTANT:
This frontend depends on the Food Forest backend API. The backend must be installed and running in order for the frontend to work correctly.

## Requirements

- Node.js v18 or higher
- npm
- Git
- Food Forest backend (API Gateway + services)

## Backend Requirement

Before running the frontend, make sure the backend is running.

The backend provides:

- User authentication
- Plants API
- Events API
- Ownership and user data

By default, the frontend expects the backend API Gateway to be available at:

http://localhost:3011

Refer to the backend repository for setup and startup instructions.

## Installation

1. Clone the repository

`git clone https://github.com/Where-s-Serj-TSTWR-Team-5/repository-name.git`

2. Navigate to the frontend directory

`cd frontend`

3. Install dependencies

`npm install`

## Environment Configuration

Create a file named `.env` in the `frontend` directory.

Add the following line to the file:

PUBLIC_API_URL=http://localhost:3011

## Running the Application (Development)

Start the development server:

`npm run dev`

The frontend will be available at:

http://localhost:5173

## Smoke Test

After starting both the backend and frontend:

- The frontend starts without errors
- The login page loads correctly
- The Plants and Events pages load data from the backend


## Release Information

This frontend is released through this GitHub repository and can be downloaded and run locally by end users using the instructions above.
Copyright lololol

