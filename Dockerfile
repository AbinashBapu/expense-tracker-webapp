# # Step 1: Build Next.js app
# FROM node:18-alpine AS builder

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .
# RUN npm run build

# # Step 2: Serve with Nginx
# FROM nginx:alpine

# # Remove default site
# RUN rm -rf /usr/share/nginx/html/*

# # Copy static site from builder
# COPY --from=builder /app/out /usr/share/nginx/html

# # Copy your custom nginx config
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# # Expose port
# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]




FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
COPY .env.production .env.production
RUN npm install

FROM node:18-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY .env.production .env.production
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

# Copy only required files
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./

EXPOSE 3000
CMD ["npm", "start"]