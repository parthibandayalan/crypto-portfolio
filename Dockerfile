FROM node

WORKDIR '/app'

COPY package*.json .
RUN npm install
COPY . .
RUN ls
EXPOSE 3000
CMD ["npm", "start"]