# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Environment variable for MongoDB connection
ENV MONGODB_URI=mongodb://mongo:27017/instagram-replica

# Start the Next.js app in development mode
CMD ["npm", "run", "dev"]