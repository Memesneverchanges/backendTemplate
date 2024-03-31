FROM node:20.11
RUN  mkdir app   
COPY . ./app
WORKDIR /app
RUN npm run docker-build
EXPOSE 3000
VOLUME [ "./app/logs", "./app/dist/config" ]
CMD ["node","./dist/index.js"] 