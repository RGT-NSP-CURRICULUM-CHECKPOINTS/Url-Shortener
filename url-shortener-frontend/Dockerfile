# Use a multi-stage build.
FROM node:25-alpine AS build

# Set the working directory.
WORKDIR /app

# Copy package.json and package-lock.json.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Build the application.
RUN npm run build

# Use a lightweight image for serving the application.
FROM node:25-alpine

# Set the working directory.
WORKDIR /app

# Install serve to serve the build folder.
RUN npm install -g serve

# Copy the build output from the previous stage.
COPY --from=build /app/dist ./dist

# Expose the application port.
EXPOSE 3000

# Start the application.
CMD ["serve", "-s", "dist", "-l", "3000"]
