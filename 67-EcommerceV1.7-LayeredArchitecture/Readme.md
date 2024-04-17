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
- DAO -> Utiliza el Model. Es responsable de interactuar con la capa de almacenamiento de datos, como la DB. Debería tener métodos para realizar operaciones CRUD (crear, leer, actualizar, eliminar) en los datos.
Evita que la lógica de acceso a datos se propague a otras partes de la aplicación que no sean el DAO.
- Service -> La capa de servicio debe contener la lógica empresarial, como la manipulación de datos y la comunicación con la capa de acceso a datos (DAO).
- Controller -> Se encarga de manejar las solicitudes HTTP relacionadas, utilizando el Service para realizar las operaciones correspondientes.Debe delegar la lógica empresarial a la capa de servicio. Interpreta y valida los parámetros de solicitud HTTP, como los filtros, el límite y la página, y luego los pasa a la capa de servicio para que realice la lógica empresarial correspondiente.
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
- updateProductQuantityById -> Bien
- emptyCartById -> Bien
