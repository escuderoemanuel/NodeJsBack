# Profesionalizando la BD

## Objetivos generales

✅ Contarás con Mongo como sistema de persistencia principal
✅ Tendrás definidos todos los endpoints para poder trabajar con productos y carritos.

## Objetivos específicos

✅ Profesionalizar las consultas de productos con filtros, paginación y ordenamientos
✅ Profesionalizar la gestión de carrito para implementar los últimos conceptos vistos.

## Se debe entregar

✅ Con base en nuestra implementación actual de productos, modificar el método GET / para que cumpla con los siguientes puntos:
  ✅ Deberá poder recibir por query params un limit (opcional), una page (opcional), un sort (opcional) y un query (opcional)
    ✅ 'limit' permitirá devolver sólo el número de elementos solicitados al momento de la petición, en caso de no recibir limit, éste será de 10.
    ✅ 'page' permitirá devolver la página que queremos buscar, en caso de no recibir page, ésta será de 1.
    ✅ 'query' el tipo de elemento que quiero buscar (es decir, qué filtro aplicar), en caso de no recibir query, realizar la búsqueda general.
    ✅ 'sort': asc/desc, para realizar ordenamiento ascendente o descendente por precio, en caso de no recibir sort, no realizar ningún ordenamiento.
  ✅ El método GET deberá devolver un objeto con el siguiente formato:
  ```js
    {
      status: success/error
      payload: Resultado de los productos solicitados
      totalPages: Total de páginas
      prevPage: Página anterior
      nextPage: Página siguiente
      page: Página actual
      hasPrevPage: Indicador para saber si la página previa existe
      hasNextPage: Indicador para saber si la página siguiente existe.
      prevLink: Link directo a la página previa (null si hasPrevPage=false)
      nextLink: Link directo a la página siguiente (null si hasNextPage=false)
      }
  ```
  ✅ Se deberá poder buscar productos por _'CATEGORY'_ o por _'TITLE'_, y se deberá poder realizar un ordenamiento de estos productos de manera ascendente o descendente por precio.
  
  - Además, agregar al router de carts los siguientes endpoints:
    ✅ DELETE: api/carts/:cid/products/:pid deberá eliminar del carrito el producto seleccionado.
    ✅ PUT: api/carts/:cid deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.
    ✅ PUT: api/carts/:cid/products/:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
    ✅ DELETE: api/carts/:cid deberá eliminar todos los productos del carrito 
    ✅ Esta vez, para el modelo de Carts, en su propiedad products, el id de cada producto generado dentro del array tiene que hacer referencia al modelo de Products. Modificar la ruta /:cid para que al traer todos los productos, los traiga completos mediante un “populate”. De esta manera almacenamos sólo el Id, pero al solicitarlo podemos desglosar los productos asociados.
  
  ✅ Crear una vista en el router de views ‘/products’ para visualizar todos los productos con su respectiva paginación. Cada producto mostrado puede resolverse de dos formas:
  ❌ Llevar a una nueva vista con el producto seleccionado con su descripción completa, detalles de precio, categoría, etc. Además de un botón para agregar al carrito.
  ✅ Contar con el botón de “agregar al carrito” directamente, sin necesidad de abrir una página adicional con los detalles del producto.
  - Además, agregar una vista en ‘/carts/:cid (cartId) para visualizar un carrito específico, donde se deberán listar SOLO los productos que pertenezcan a dicho carrito. 
  
## Formato

✅ Link al repositorio de Github, sin la carpeta de node_modules

## Sugerencias

✅ Permitir comentarios en el archivo
✅ La lógica del negocio que ya tienes hecha no debería cambiar, sólo su persistencia. 
✅ Los nuevos endpoints deben seguir la misma estructura y lógica que hemos seguido.

## DUDAS:

- ProductsDbManager.js: Los métodos (get, put, etc...) deben terminar con un 'return' (puedo renderizar si es así) o con un 'send' (solamente obtengo el json, pero no logro renderizar nada)
- Sockets: debo tener un socket para cada view? Como 'products.socket.js' para 'products.handlebars' y 'realTimeProducts.socket.js' para 'realTimeProducts.socket.js' o debería ser un solo socket reutilizable?
- No entiendo bien, cuándo debo retornar (return), cuándo enviar (res.send)
- No entiendo bien, qué información o data debo returnar o enviar, pues en otras partes del código se me hace difícil acceder a los datos directamente sin tener que entrar a sus propiedades (debería usar destructuring? cómo?) 
- El router debe enviar (res.send) o renderizar (res.render) ?

## Orientación tomando en cuenta 'products':

_1_ Todo nace en el _'model'_ 'products.model.js', donde se establece la estructura del product.
  - El modelo tiene métodos propios? como el create(), find(), findOne(), updateOne(), deleteOne(),
  
_2_ Esa estructura pasa al _'manager'_ 'ProductsDBManager.js', donde se crean los métodos del mismo
    - Métodos del manager: addProduct(product), getProducts(req, res), getProductById(id), updateProduct(id, newProduct), deleteProduct(id)
    - Estos métodos utilizan los métodos propios? que mencionamos del modelo

_3_ Ese manager se utiliza en el _'router'_ 'products.router.js' 
      - El router inicializa una instancia del manager (const manager = new ProductsDbManager())
      - Utilizar los métodos del manager (addProduct(product), getProducts(req, res), getProductById(id), updateProduct(id, newProduct), deleteProduct(id))
      - Establece los endpoints (router.get('/'...), router.get('/:pid'...), router.post('/'...), router.put('/:pid'...), router.delete('/:pid'...))
      - Renderiza y envía a las 'views handlebars' la información y el nombre del handlebars donde debe ser renderizado
  
_4_ Las _'views handlebars'_ renderizan la información enviada por el router

_5_ Los _'sockets'_ capturan elementos del DOM e intereactúan con 'app.js' enviando (emit) y recibiendo (on) eventos para detectar cambios, actualizar y re-renderizar