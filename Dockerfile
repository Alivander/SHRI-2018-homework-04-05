
FROM node:slim

WORKDIR /app

ADD . /app

ENV PORT=80
ENV NODE_ENV=development

RUN npm install --quient
RUN npm run build

CMD npm start -- --port $PORT
