# Testing with Mocha, Chai Library

### Test de elementos aislados del proyecto

- Con base en el proyecto que tenemos de Adoptme, se nos solicita realizar un proceso de testing para las utilidades de bcrypt y la funcionalidad del DTO  Los elementos que nos solicitan validar son:

1. El servicio debe realizar un hasheo efectivo de la contraseña (debe corroborarse que el resultado sea diferente a la contraseña original)
2. El hasheo realizado debe poder compararse de manera efectiva con la contraseña original (la comparación debe resultar en true)
3. Si la contraseña hasheada se altera, debe fallar en la comparación de la contraseña original.
4. Por parte del DTO de usuario: Corroborar que el DTO unifique el nombre y apellido en una única propiedad. (Recuerda que puedes evaluar múltiples expects)
5. Por parte del DTO de usuario: El DTO debe eliminar las propiedades innecesarias como password, first_name, last_name.

# Testing with Supertest

### Pruebas del módulo Pets

- Continuar con el flujo del módulo de mascotas (Pets) para poder realizar las siguientes pruebas.

1. Al crear una mascota sólo con los datos elementales. Se debe corroborar que la mascota creada cuente con una propiedad adopted : false
2. Si se desea crear una mascota sin el campo  nombre, el módulo debe responder con un status 400.
3. Al obtener a las mascotas con el método GET, la respuesta debe tener los campos status y payload. Además, payload debe ser de tipo arreglo.
4. El método PUT debe poder actualizar correctamente a una mascota determinada (esto se puede testear comparando el valor previo con el nuevo valor de la base de datos).
5. El método DELETE debe poder borrar la última mascota agregada, ésto se puede alcanzar agregando a la mascota con un POST, tomando el id, borrando la mascota  con el DELETE, y luego corroborar si la mascota existe con un GET


### Pruebas del módulo Sessions

-

1.
2.
3.
4.