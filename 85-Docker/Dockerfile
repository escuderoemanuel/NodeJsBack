# Paquete
FROM node
# Directorio
WORKDIR /src
# Paquete a copiar
COPY package*.json ./
# Comando a correr para que instale las dependencias del package.json
RUN npm install
# Que copie del directorio actual al directorio actual
COPY . .
# Puerto a exponer
EXPOSE 8080
# Comando a correr
# CMD ["npm", "./app.js"] => Si tuviésemos configurado esto en el package.json
CMD ["node", "./src/app.js"]