# Testing with Mocha & Chai Library

- Test de más elementos aislados del proyecto

- Con base en el proyecto que tenemos de Adoptme, se nos solicita realizar un proceso de testing para las utilidades de bcrypt y la funcionalidad del DTO  Los elementos que nos solicitan validar son:

1. El servicio debe realizar un hasheo efectivo de la contraseña (debe corroborarse que el resultado sea diferente a la contraseña original)
2. El hasheo realizado debe poder compararse de manera efectiva con la contraseña original (la comparación debe resultar en true)
3. Si la contraseña hasheada se altera, debe fallar en la comparación de la contraseña original.
4. Por parte del DTO de usuario: Corroborar que el DTO unifique el nombre y apellido en una única propiedad. (Recuerda que puedes evaluar múltiples expects)
5. Por parte del DTO de usuario: El DTO debe eliminar las propiedades innecesarias como password, first_name, last_name.


