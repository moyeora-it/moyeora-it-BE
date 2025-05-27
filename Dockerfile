FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache openssl

RUN npm install -g npm@6 \
    && npm install

COPY . .

RUN npm run prisma:generate

CMD ["npm", "start"]