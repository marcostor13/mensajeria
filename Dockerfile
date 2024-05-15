FROM node:20.11.1-alpine AS node
RUN corepack enable
WORKDIR /app
COPY . .
RUN npm install
ARG configuration=production
RUN npm run build --configuration=$configuration
FROM nginx:latest AS nginx
COPY --from=node ./app/dist/mensajeria/browser /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf