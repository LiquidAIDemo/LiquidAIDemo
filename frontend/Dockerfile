FROM node:18-alpine
 
WORKDIR /app

COPY . .

RUN npm install -g serve

RUN npm ci

RUN npm run build
 
EXPOSE 5173

CMD serve dist/ -p 5173