# Stage 1: Build the React frontend
FROM node:18-slim AS frontend-build

WORKDIR /app/frontend

# Install dependencies and build the frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install --frozen-lockfile
COPY frontend/ ./
RUN npm run build

# Stage 2: Set up Python backend
FROM python:3.11.10-slim AS backend

# Set environment variables for Python
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app/backend

# Install Python dependencies
COPY backend/requirements.txt ./
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the backend code
COPY backend/ ./

# Install Uvicorn (if not included in requirements.txt)
RUN pip install uvicorn

# Stage 3: Set up Nginx to serve frontend and proxy to backend
FROM nginx:stable-alpine

# Remove default Nginx configuration and replace it with custom config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/

# Copy the frontend build to Nginx HTML directory
COPY --from=frontend-build /app/frontend/dist /usr/share/nginx/html

# Copy the backend application from the previous stage
COPY --from=backend /app/backend /app/backend

# Expose the ports for Nginx and FastAPI
EXPOSE 80 8000

# Install Supervisor to manage both Nginx and FastAPI
RUN apk add --no-cache supervisor

# Copy Supervisor configuration file
COPY supervisord.conf /etc/supervisord.conf

# Start supervisord to manage both services
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
