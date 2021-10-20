FROM docker.io/node:12.22.2

COPY . /home/next-blog

WORKDIR /home/next-blog

RUN npm install 

LABEL Descripttion="This image is build for web"

EXPOSE 8081

CMD [ "npm", "start" ]

# find . -type d ! -name "a" -exec rm -rf {} +