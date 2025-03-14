# Use Node.js as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY server/package.json .
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose ports
EXPOSE 3000

# Start the server
CMD ["node", "server/server.js"]