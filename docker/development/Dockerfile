FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY ../../package*.json ./
RUN npm install

# Copy source code
COPY ../../ .

# Expose development port
EXPOSE 3000

# Start development server with hot reload
CMD ["npm", "run", "dev"] 