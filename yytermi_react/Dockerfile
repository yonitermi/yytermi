# Stage 1: Build the React app
FROM node:16 as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production image with NGINX
FROM nginx:alpine

# Copy the build files to the NGINX directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose ports
EXPOSE 80 443

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
