FROM docker.io/node:12.22.2

COPY . /home/eggProject

WORKDIR /home/eggProject

RUN npm install \
    && npm run build
LABEL Descripttion="This image is build for web"

EXPOSE 8081

CMD [ "npm", "start" ]