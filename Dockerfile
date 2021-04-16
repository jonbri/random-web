FROM ubuntu
WORKDIR /code
RUN apk add --no-cache nodejs
RUN npm install yarn
RUN yarn
EXPOSE 3000
COPY . .
CMD ["yarn", "start"]