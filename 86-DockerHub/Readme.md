# Comandos Docker

- docker build -t my-app: construye una imagen con el nombre my-app
- docker images: lista las imagenes creadas
- docker ps: lista los contenedores corriendo
- docker ps -a: lista los contenedores corriendo y también los detenidos
- docker run my-app: para correr la app (No va a funcionar!)
- docker run -p 8080:8080 my-app: para correr la app correctamente y poder realizar las consultas
- docker stop 18b9439291be => el número corresponde al CONTAINER ID
- docker run -p 8080:8080 -e MONGO_URL="http://lkalsd.cacas/aska" my-app: el -e sirve para pasarle variables de entorno en caso de no pasarle el archivo .env
- docker login: sirve para logearse
- docker tag my-app escuderoemanuel/my-app:1.0.0: para ponerle un TAG para subir la imagen. Va el nombre de la imagen, el nombre de usuario seguido de barra, seguido del TAG que queremos ponerle seguido de dos puntos y el número de versión
- docker push escuderoemanuel/users-creator:1.0.0 : para subir la imagen