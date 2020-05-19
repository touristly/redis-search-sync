FROM node:lts-slim
# USER node
WORKDIR /redis-sync

COPY . /redis-sync
RUN yarn install --frozen-lockfile --production && yarn cache clean