FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .

CMD ["sh", "-c","yarn $NODE_ENV"]
