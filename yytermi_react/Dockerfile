# Build stage for the React app using Vite
FROM node:16 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Use a minimal image for artifact delivery
FROM alpine:3.18

WORKDIR /app
COPY --from=build /app/dist /app
CMD ["ls", "-l", "/app"] # Debugging step to confirm the dist files are included
