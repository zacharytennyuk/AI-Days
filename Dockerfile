# step1: build frontend
FROM node:16-slim as build

WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json ./

RUN npm install --frozen-lockfile

COPY frontend/ ./

RUN npm run build

# step2: build backend
FROM python:3.11.10-slim-bookworm as backend

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app/backend

COPY backend/requirements.txt ./
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY backend/ ./

# step3: setup nginx to serve frontend and proxy backend
FROM nginx:stable-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/

COPY --from=build /app/frontend/build /usr/share/nginx/html

COPY --from=backend /app/backend /app/backend

EXPOSE 80
EXPOSE 8000

RUN apk add --no-cache supervisor

COPY supervisord.conf /etc/supervisord.conf
# Start supervisord
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
