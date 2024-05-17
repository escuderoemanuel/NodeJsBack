# Paquete (imagen en la que nos vamos a basar)
FROM node
# Directorio (carpeta donde queremos crear nuestra imagen)
WORKDIR /app
# Que copie del directorio actual al directorio actual el resto del contenido
COPY . .
# Comando a correr para que instale las dependencias del package.json
RUN npm install
# Puerto a exponer
EXPOSE 8080
# Comando a correr
# CMD ["node", "./src/app.js"] => Si tuviésemos configurado esto en el package.json
CMD ["npm", "start"] 