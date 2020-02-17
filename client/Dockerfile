FROM nginx:1.17
CMD ["npm", "bundle"]
COPY dist/bundle.js /usr/share/nginx/html
# RUN mkdir -p /srv/app/client
# WORKDIR /srv/app/client

# COPY package.json /srv/app/client
# COPY package-lock.json /srv/app/client

# RUN npm install

# COPY . /srv/app/client
# EXPOSE 3000
# CMD ["npm", "bundle"]