# =============================================================================
# Dockerfile - React + Vite + TypeScript Portfolio
# =============================================================================

# -----------------------------------------------
# STAGE 1: Build
# -----------------------------------------------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first for better layer caching
COPY package.json package-lock.json* ./

# Install dependencies (using ci for reproducible builds)
RUN npm ci --only=production=false --ignore-scripts

# Copy source code
COPY . .

# Build the application
RUN npm run build

# -----------------------------------------------
# STAGE 2: Production
# -----------------------------------------------
FROM nginx:1.27-alpine-slim AS production

LABEL maintainer="Sumit Kumar Das <krsumit449@gmail.com>"
LABEL description="DevOps Portfolio - Production Build"
LABEL version="1.0"

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Create non-root user for security
RUN addgroup -S appgroup -g 1001 && \
    adduser -S appuser -u 1001 -G appgroup && \
    chown -R appuser:appgroup /usr/share/nginx/html && \
    chown -R appuser:appgroup /var/cache/nginx && \
    chown -R appuser:appgroup /var/log/nginx && \
    chown -R appuser:appgroup /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R appuser:appgroup /var/run/nginx.pid

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:8080/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
