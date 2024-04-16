## Consigna

✅ Con base en el login de nuestro entregable anterior, refactorizar para incluir los nuevos conceptos.

## Aspectos a incluir

✅ Se deberá contar con un hasheo de contraseña utilizando bcrypt
✅ Se deberá contar con una implementación de passport, tanto para register como para login.
✅ Implementar el método de autenticación de GitHub a la vista de login


### Revisar

- Comprobación de fields en el register
- Comprobación de fields en el login

### Help Tips

- Model -> Define las propiedades que tendrá el modelo, tipo de datos, valores por defecto, campos requeridos u opcionales, etc.
- DAO -> Utiliza el Model. Se encarga únicamente de interactuar con la DB para las operaciones CRUD.
- Service -> Se encarga de manejar la lógica de negocio utilizando el DAO para acceder a la DB.
- Controller -> Se encarga de manejar las solicitudes HTTP relacionadas, utilizando el Service para realizar las operaciones correspondientes.
- Router

## PRODUCTS

- getAll -> No muestra
- getById -> Bien
- create -> Bien
- update -> Bien
- delete -> Bien


## CARTS

- create -> Bien
- getAll -> Bien
- getById -> Bien
- addProductToCart -> Bien
- deleteProductById -> Bien
- updateProductById -> 
- updateProductQuantityById -> Bien
- emptyCartById -> Bien
