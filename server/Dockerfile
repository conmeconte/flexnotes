FROM node:8.1.1-alpine 
LABEL John Hong

RUN mkdir -p /srv/app/server
WORKDIR /srv/app/server

COPY package.json /srv/app/server
COPY package-lock.json /srv/app/server

RUN npm install

COPY . /srv/app/server
EXPOSE 9000
CMD ["npm", "start"]