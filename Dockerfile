FROM node:14.15.0

FROM node:10.15.3
RUN mkdir -p /app
WORKDIR /app
COPY . .

ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json
RUN npm install --verbose
RUN npm install serve -g -silent

# start app
RUN npm run build
CMD ["sh", "-c", "serve -l tcp://0.0.0.0:${PORT} -s /app/build"]