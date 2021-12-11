# Stage 0, based on Node.js, to build and compile Angular
FROM node:lts-alpine as node
WORKDIR /app
COPY ./ /app/
RUN npm install ci
ARG configuration=production
RUN npm run build -- --c=$configuration

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine as angular-admin
COPY --from=node /app/dist/admin /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

#docker build -t docker-angular:latest --build-arg configuration="staging" .
#docker run -d -p 80:80 docker-angular:latest
