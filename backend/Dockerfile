
FROM node:22-alpine

WORKDIR /app

COPY backend/package*.json ./
RUN npm ci
COPY backend/ .

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
