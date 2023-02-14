# syntax=docker/dockerfile:1

# Build Node.js app
# ------------------------------------
FROM node:18-alpine as build
WORKDIR /app
COPY ./package*.json ./
COPY ./packages/dice-api ./packages/stripe
RUN npm ci --workspace=stripe --cache /tmp/empty-cache
RUN npm run build:ts --workspace=stripe

# Run Node.js app
# ------------------------------------
FROM node:18-alpine
ENV NODE_ENV=production

WORKDIR /app
COPY ./package*.json ./
COPY ./packages/stripe/package.json ./packages/stripe/
RUN npm ci --omit=dev --workspace=stripe --cache /tmp/empty-cache
COPY --from=build app/packages/stripe/dist packages/stripe/dist
EXPOSE 3000
CMD [ "npm", "start", "--workspace=stripe" ]
