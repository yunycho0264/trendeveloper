FROM node:lts-alpine3.17 as nodework
WORKDIR /JOB-DEMAND
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.23.4-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=nodework /JOB-DEMAND/build .
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]