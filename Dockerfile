# Use Node.js LTS version
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port (adjust if your app uses a different port)
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
