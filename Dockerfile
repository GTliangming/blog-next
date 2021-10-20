FROM docker.io/node:12.22.2

COPY . /home/next-blog

WORKDIR /home/next-blog

RUN  yarn

EXPOSE 8081

CMD [ "yarn", "start" ]
