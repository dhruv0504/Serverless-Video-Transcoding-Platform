FROM node:18-alpinf AS base

RUN APK update
RUN APK upgrade

RUN APK add --no-cache ffmpeg

WORKDIR /app

COPY package.json .
RUN npm install 

COPY index.js .

CMD ["npm", "start"]