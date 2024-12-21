# Stage 1: Build the React app using Vite
FROM node:16 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production image with NGINX
FROM nginx:alpine

# Copy the Vite build output to NGINX's default serving directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose ports
EXPOSE 80 443

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
