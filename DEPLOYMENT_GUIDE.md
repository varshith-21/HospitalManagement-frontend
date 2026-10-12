# Hospital Management System — Deployment Guide

This package is prepared for deployment, but has not been published to a live hosting account.

## Project structure
- `frontend/`: React + Vite website
- `backend/`: Spring Boot REST API
- MySQL: use a hosted MySQL service

## 1. Upload source to GitHub
Create a GitHub repository and upload the contents of this folder. Do not commit credentials.

## 2. Create a hosted MySQL database
Create a MySQL service with your provider and note its host, port, database name, username and password.
Configure `DB_URL` as a JDBC URL, for example:
`jdbc:mysql://HOST:PORT/DATABASE?serverTimezone=UTC`
Replace the placeholders with the real database values.

## 3. Deploy the backend
Deploy the `backend` directory as a Java/Maven service. Build command:
`./mvnw clean package -DskipTests`
Start command (if your host requires one):
`java -jar target/backend-0.0.1-SNAPSHOT.jar`
Check `backend/pom.xml` for the actual artifact version/name if it differs.

Set backend environment variables:
- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `FRONTEND_URL` (the exact public HTTPS URL of your deployed frontend)

The app uses `${PORT:8080}` so it can use the port provided by the host.

## 4. Deploy the frontend
Import the same repository in Vercel. Set the root directory to `frontend`.
Build command: `npm run build`
Output directory: `dist`

Set this frontend build environment variable:
- `VITE_API_BASE_URL` = public HTTPS URL of your deployed backend, with no trailing slash

Redeploy the frontend after setting the environment variable. Then set `FRONTEND_URL` on the backend to the frontend's exact HTTPS origin and redeploy the backend.

## 5. Verify
Test registration, login, dashboards, doctor/patient records, and appointments. Review backend logs if requests fail.

## Security note
This is a student-project deployment configuration. API access rules in the existing app are permissive and should be reviewed before any real patient data is used. Do not use real patient information in a public demo.
