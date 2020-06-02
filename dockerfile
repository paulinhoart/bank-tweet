FROM node:latest

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3100

CMD ["npm","start"]