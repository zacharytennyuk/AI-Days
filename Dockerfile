# Step 1: Build frontend with Vite
FROM node:18-slim AS build

# Set working directory for frontend
WORKDIR /app/frontend

# Copy package.json and package-lock.json to install dependencies
COPY frontend/package.json frontend/package-lock.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the frontend files and build the Vite app
COPY frontend/ ./
RUN npm run build

# Step 2: Set up backend with Python
FROM python:3.11.10-slim-bookworm AS backend

# Set Python environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory for backend
WORKDIR /app/backend

# Copy requirements.txt and install dependencies
COPY backend/requirements.txt ./
RUN pip install --upgrade pip && pip install -r requirements.txt

# Install uvicorn explicitly if it’s not in requirements.txt
RUN pip install uvicorn

# Copy the rest of the backend files
COPY backend/ ./

# Step 3: Set up Nginx to serve frontend and proxy backend
FROM nginx:stable-alpine

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/

# Copy frontend build from the build stage to Nginx HTML directory
COPY --from=build /app/frontend/dist /usr/share/nginx/html

# Copy backend application from the backend stage
COPY --from=backend /app/backend /app/backend

# Expose frontend (80) and backend (8000) ports
EXPOSE 80
EXPOSE 8000

# Install Supervisor to manage Nginx and backend services
RUN apk add --no-cache supervisor

# Create log directories for backend and supervisor
RUN mkdir -p /var/log/backend /var/log/supervisor

# Copy Supervisor configuration file
COPY supervisord.conf /etc/supervisord.conf

# Start supervisord to manage both Nginx and backend processes
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
