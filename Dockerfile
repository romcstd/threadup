# --- Build Client ---
FROM node:20.19.0 AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build

# --- Build Server ---
FROM node:20.19.0 AS server-build
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server/ .

# --- Final Production Image ---
FROM node:20.19.0 AS production
WORKDIR /app
COPY --from=server-build /app/server /app/server
COPY --from=client-build /app/client/dist /app/server/public
WORKDIR /app/server
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "index.js"]