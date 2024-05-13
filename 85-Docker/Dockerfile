FROM node
WORKDIR /app
COPY package.json ./
RUN npm instakk
COPY . . 
EXPOSE 8080
# CMD [ "npm", "start" ]
CMD [ "node", "app/js" ]