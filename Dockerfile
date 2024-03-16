#Build
FROM node:20 as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
#Production
FROM node:20 as production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package*.json ./
RUN npm ci --production
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 4000

CMD [ "npm", "run", "start:prod" ]