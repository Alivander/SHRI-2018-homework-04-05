FROM node:slim

WORKDIR ./app

ADD . ./app

RUN npm i
RUN npm run build

ENV PORT=80
ENV NODE_ENV=development
ENV NAME=GitLoc

CMD npm start -- --port $PORT
