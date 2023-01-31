# syntax=docker/dockerfile:1

# Run Node.js app
# ------------------------------------
FROM node:18-alpine
ENV NODE_ENV=production

WORKDIR /app
COPY ./package*.json ./
COPY ./packages/stripe ./packages/stripe
RUN npm ci --omit=dev --workspace=stripe --cache /tmp/empty-cache
EXPOSE 4001
CMD [ "npm", "start", "--workspace=stripe" ]
