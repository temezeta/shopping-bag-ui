# React
FROM node:latest as build
RUN mkdir /usr/app
COPY . /usr/app
WORKDIR /usr/app
RUN npm install
ENV PATH /usr/app/node_modules/.bin:$PATH
RUN npm run build
# Nginx
FROM nginx:latest
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /usr/app/build .
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]