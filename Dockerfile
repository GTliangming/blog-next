FROM node:alpine AS deps

RUN  mkdir -p /home/next-blog

COPY . /home/next-blog

WORKDIR /home/next-blog

COPY package.json /home/next-blog/

COPY yarn.lock /home/next-blog/

FROM node:alpine AS builder

RUN npm install -g cnpm --registry=https://registry.npm.taobao.org \
    &&  cnpm install \
    &&  cnpm install @babel/plugin-proposal-decorators

FROM node:alpine AS runner
ENV HOST 0.0.0.0 &&  PORT 8081
EXPOSE 8081

CMD [ "cnpm", "start" ]
