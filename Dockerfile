# Use Nginx with RTMP as the base image
FROM tiangolo/nginx-rtmp

# Copy your Node.js backend files
COPY server /app/server
WORKDIR /app/server

# Install Node.js dependencies
RUN npm install

# Start Nginx and Node.js backend
CMD nginx -g "daemon off;" & node server.js