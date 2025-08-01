# Multi-stage build for Storybook design system
# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production --ignore-scripts

# Copy source code
COPY . .

# Build Storybook static files
RUN npm run build-storybook

# Stage 2: Serve with nginx
FROM nginx:alpine AS production

# Copy built storybook files to nginx html directory
COPY --from=builder /app/storybook-static /usr/share/nginx/html

# Create custom nginx configuration to serve on port 6006
RUN echo 'server {' > /etc/nginx/conf.d/default.conf && \
    echo '    listen 6006;' >> /etc/nginx/conf.d/default.conf && \
    echo '    server_name localhost;' >> /etc/nginx/conf.d/default.conf && \
    echo '    location / {' >> /etc/nginx/conf.d/default.conf && \
    echo '        root /usr/share/nginx/html;' >> /etc/nginx/conf.d/default.conf && \
    echo '        index index.html index.htm;' >> /etc/nginx/conf.d/default.conf && \
    echo '        try_files $uri $uri/ /index.html;' >> /etc/nginx/conf.d/default.conf && \
    echo '    }' >> /etc/nginx/conf.d/default.conf && \
    echo '}' >> /etc/nginx/conf.d/default.conf

# Expose port 6006
EXPOSE 6006

# Start nginx
CMD ["nginx", "-g", "daemon off;"]