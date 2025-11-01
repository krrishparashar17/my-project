# Stage 1: Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./

# Use npm install instead of npm ci
RUN npm install

COPY . .

# Build the app
RUN npm run build

# Stage 2: Production stage
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
