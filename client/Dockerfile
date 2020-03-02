FROM node:8.1.1-alpine as build-deps
RUN mkdir -p /srv/app/client
WORKDIR /srv/app/client
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . . 
CMD ["npm","run", "bundle"]

FROM nginx:alpine
COPY --from=build-deps /srv/app/client/dist /usr/share/nginx/html
EXPOSE 80
CMD [“nginx”, “-g”, “daemon off;”]
# COPY dist/bundle.js /usr/share/nginx/html
# RUN mkdir -p /srv/app/client
# WORKDIR /srv/app/client

# COPY package.json /srv/app/client
# COPY package-lock.json /srv/app/client

# RUN npm install

# COPY . /srv/app/client
# EXPOSE 3000
# CMD ["npm", "bundle"]