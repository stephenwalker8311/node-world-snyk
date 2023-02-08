# syntax=docker/dockerfile:1
FROM node:16.6.0-alpine
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "index.js"]
EXPOSE 3000
