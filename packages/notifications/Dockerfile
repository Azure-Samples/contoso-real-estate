# syntax=docker/dockerfile:1

# Run Node.js app
# ------------------------------------
FROM node:18-alpine AS deps
COPY /package.json ./
COPY /package-lock.json ./
RUN npm ci

# Production image, copy all the files and run node
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs

COPY --from=deps --chown=nodejs /package.json ./
COPY --from=deps --chown=nodejs /node_modules ./node_modules
COPY --chown=nodejs /server.js ./

EXPOSE 4300
ENV PORT 4300
CMD [ "node", "server.js"]
