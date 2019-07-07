FROM node:12.6.0-alpine
COPY . /app
WORKDIR /app
RUN yarn && yarn build-storybook
EXPOSE 5000
CMD yarn start
