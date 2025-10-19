# # ------------------- Stage 1: Build Stage ------------------------------
# FROM node:21 AS frontend-builder

# # Set the working directory to /app
# WORKDIR /app

# # Copy the package.json and package-lock.json for dependency installation
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# RUN chmod +x node_modules/.bin/vite


# # Copy the rest of the application code
# COPY . .

# # ------------------- Stage 2: Final Stage ------------------------------
# FROM node:21-slim

# # Set the working directory to /app
# WORKDIR /app

# # Copy built assets and dependencies from frontend-builder stage
# COPY --from=frontend-builder /app .

# # Copy the .env.sample file to .env.local
# COPY .env.docker .env.local

# # Expose port 5173 for the Node.js application
# EXPOSE 5173

# # Define the default command to run the application in development mode
# CMD ["npx", "vite", "--host"]



# ------------------- Frontend Stage (Option A) ------------------------------
FROM node:21-slim

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies inside this image
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the .env.docker file to .env.local
COPY .env.docker .env.local

# Expose port for Vite dev server
EXPOSE 5173

# Run Vite dev server
CMD ["npx", "vite", "--host", "0.0.0.0"]
