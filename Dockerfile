FROM node:14.15.0

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.0 -g --silent

# add app
COPY . ./

# start app
CMD ["npm", "start"]