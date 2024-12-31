# College Appointment System

This project is a backend API for a college appointment system that allows students to book appointments with professors. It is built using TypeScript and Express, and it utilizes AWS DocumentDB for data storage.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

- Node.js (>=12.0.0)
- npm (>=6.0.0)
- AWS DocumentDB instance
- AWS credentials configured

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/college-appointment-system.git
   ```
2. Navigate to the project directory:
   ```
   cd college-appointment-system
   ```
3. Install the dependencies:
   ```
   npm install
   ```
## Environment Variables
Create a .env file in the root directory and add the following environment variables:
   ```
   PORT=5000
   MONGO_URI=your_documentdb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```
## Usage
   To start the server in development mode, run:
   ```
   npm run dev
   ```
   To start the server in production mode, run:
   ```
   npm start
   ```
The server will run on http://localhost:3000.

## API Endpoints
# User Routes
   POST /api/auth/register: Register a new user (student or professor).
   POST /api/auth/login: Authenticate a user.

# Appointment Routes
   POST /api/appointments: Create a new appointment.
   GET /api/appointments/available-slots: Get available time slots for appointments.
   GET /api/appointments: Retrieve all appointments for a user.
   DELETE /api/appointments/:id: Cancel an appointment.

# Availability Routes
   POST /api/availability: Add availability for a professor.
   PUT /api/availability: Update availability for a professor.
   DELETE /api/availability: Delete availability for a professor.

## Database
   This project uses AWS DocumentDB for data storage. Ensure that your AWS credentials are configured properly to connect to the database.

## API Documentation
   Swagger documentation is available for this project. To access the API documentation, navigate to http://localhost:3000/api-docs in your browser.

# Testing
   To run the tests, use the following command:

## Contributing
   Contributions are welcome! Please open an issue or submit a pull request.

## License
   This project is licensed under the MIT License.