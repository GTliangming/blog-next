FROM docker.io/node:12.22.2

RUN  mkdir -p /home/next-blog

COPY ./** /home/next-blog

WORKDIR /home/next-blog

RUN  npm install 

ENV HOST 0.0.0.0
ENV PORT 8081
EXPOSE 8081

CMD [ "npm", "start" ]
