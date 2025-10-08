# Use official Playwright base image
FROM mcr.microsoft.com/playwright:v1.43.1-jammy

# Set working directory
WORKDIR /app

# Copy package.json and install deps
COPY package.json package-lock.json* ./
RUN npm install
RUN npm install -g allure-commandline --save-dev

# Copy all project files
COPY . .

# Install required browser binaries
RUN npx playwright install --with-deps

# Install git
RUN apt-get update && apt-get install -y git

# Optional: Run tests directly (or override via CMD)
CMD ["npx", "playwright", "test"]