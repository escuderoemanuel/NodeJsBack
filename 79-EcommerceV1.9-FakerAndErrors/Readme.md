# Mocking y manejo de errores

✅ Se aplicará un módulo de mocking y un manejador de errores a tu servidor actual


## Se debe entregar

✅ Generar un módulo de Mocking para el servidor, con el fin de que, al inicializarse pueda generar y entregar 100 productos con el mismo formato que entregaría una petición de Mongo. Ésto solo debe ocurrir en un endpoint determinado (‘/mockingproducts’)

✅ Además, generar un customizador de errores y crear un diccionario para tus errores más comunes:
  ✅ Al crear un producto
  ✅ Agregarlo al carrito

## Formato

✅ Link al repositorio de Github con el proyecto (sin node_modules)
Además, archivo .env para poder correr el proyecto.

## Sugerencias

✅ Céntrate solo en los errores más comunes 

✅ Puedes revisar el documento de testing aquí: ? 

# ¡¡ ERRORS !!

- Al Logearme con GUTHUB: MongooseError: Operation `users.findOne()` buffering timed out after 10000ms
    at Timeout.<anonymous> (C:\Users\escud\Desktop\Personal Projects\BackendCourse\Emanuel\NodeJsBack\99-Practice\node_modules\mongoose\lib\drivers\node-mongodb-native\collection.js:185:23)
    at listOnTimeout (node:internal/timers:573:17)
    at process.processTimers (node:internal/timers:514:7)

- Al registrar nuevo usuario: const err = new MongooseError(message);

MongooseError: Operation `users.findOne()` buffering timed out after 10000ms     
    at Timeout.<anonymous> (C:\Users\escud\Desktop\Personal Projects\BackendCourse\Emanuel\NodeJsBack\79-EcommerceV1.9-FakerAndErrors\node_modules\mongoose\lib\drivers\node-mongodb-native\collection.js:185:23)
    at listOnTimeout (node:internal/timers:573:17)
    at process.processTimers (node:internal/timers:514:7)
