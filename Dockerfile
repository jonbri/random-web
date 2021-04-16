FROM node
WORKDIR /code
RUN npm install
EXPOSE 3000
COPY . .
CMD ["npm", "start"]