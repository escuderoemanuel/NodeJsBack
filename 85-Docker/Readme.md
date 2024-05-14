# Comandos Docker

- docker build -t my-app: construye una imagen con el nombre my-app
- docker images: lista las imagenes creadas
- docker ps: lista los contenedores corriendo
- docker ps -a: lista los contenedores corriendo y también los detenidos
- docker run my-app: para correr la app (No va a funcionar!)
- docker run -p 8080:8080 my-app: para correr la app correctamente y poder realizar las consultas
- docker stop 18b9439291be => el número corresponde al CONTAINER ID