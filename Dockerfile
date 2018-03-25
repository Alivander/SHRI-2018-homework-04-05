FROM ruby:alpine

WORKDIR /app

ADD . /app

RUN npm install --quient
RUN npm run build

ENV PORT=80
ENV NODE_ENV=development
ENV NAME GitLoc

CMD npm start -- --port $PORT
