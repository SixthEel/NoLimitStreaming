# Use a base image with both Node.js and Nginx
FROM node:16 AS node
FROM tiangolo/nginx-rtmp

# Copy Node.js from the node image
COPY --from=node /usr/local/bin/node /usr/local/bin/node
COPY --from=node /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=node /opt/yarn-v1.22.19 /opt/yarn-v1.22.19

# Create symlinks for Node.js and npm
RUN ln -s /usr/local/bin/node /usr/local/bin/nodejs && \
    ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm && \
    ln -s /opt/yarn-v1.22.19/bin/yarn /usr/local/bin/yarn

# Copy Nginx configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY server/package.json .
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose ports
EXPOSE 1935  # RTMP
EXPOSE 80    # HTTP (HLS)

# Start Nginx and Node.js backend
CMD nginx -g "daemon off;" & node server/server.js