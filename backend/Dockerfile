# Use Node.js 18 Alpine as the base image
FROM node:18-alpine3.18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy application source code
COPY . .

# Expose application port
EXPOSE 8000

# Start the application
CMD ["npm", "start"]
