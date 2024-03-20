# Stage 1: Development stage
FROM node:20.11.0-alpine AS dev
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .

# Stage 2: Build the application
FROM dev AS build
RUN npm run build

# Stage 3: Production stage
FROM node:20.11.0-alpine AS production
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/package*.json ./
RUN npm ci --only=production
COPY --from=build /usr/src/app/dist ./dist
EXPOSE 4000
CMD ["npm", "run", "start:prod"]
