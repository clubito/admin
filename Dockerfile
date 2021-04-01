# Stage 1

FROM node:10-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build-production

# EXPOSE 4200
# CMD ["npm", "run", "start-production"]

# Stage 2

FROM nginx:1.17.1-alpine

COPY --from=build-step /app/dist/admin /usr/share/nginx/html
COPY --from=build-step /app/nginx.conf /etc/nginx/conf.d/default.conf