FROM node:8
WORKDIR /usr/src/dc2018-webAuth-docker
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "run", "serve"]
