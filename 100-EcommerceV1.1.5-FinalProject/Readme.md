# Backend de una aplicación ecommerce

## Objetivos generales

- Completar el proyecto final 

## Objetivos específicos

- Conseguir una experiencia de compra completa.
- Cerrar detalles administrativos con los roles.

# ============= WORK ON =============  #

[x] Vista de Profile para subir archivos
    - Subir img de perfil y que se muestre en el header junto con el btn de logout

# !!!! ERRORS !!!


# TODO:

- Readme con documentación
- Revisar cada archivo para eliminar logs y comentarios innecesarios
- Convertir los err en error
- Convertir los res en response



## Aspectos a incluir

1. Desde el router de /api/users, crear tres rutas:
     * GET  /  deberá obtener todos los usuarios, éste sólo debe devolver los datos principales como nombre, correo, tipo de cuenta (rol)
     * DELETE / deberá limpiar a todos los usuarios que no hayan tenido conexión en los últimos 2 días. (puedes hacer pruebas con los últimos 30 minutos, por ejemplo).
       * Deberá enviarse un correo indicando al usuario que su cuenta ha sido eliminada por inactividad

2. Crear una vista para poder visualizar users
    * Modificar el rol 
    * Eliminar un usuario. 
    * Esta vista únicamente será accesible para el administrador del ecommerce

3. Modificar el endpoint que elimina productos, para que:
   * En caso de que el producto pertenezca a un usuario premium, le envíe un correo indicándole que el producto fue eliminado.

4. Finalizar las vistas pendientes para la realización de flujo completo de compra. 
   * NO ES NECESARIO tener una estructura específica de vistas, sólo las que tú consideres necesarias para poder llevar a cabo el proceso de compra.
   * No es necesario desarrollar vistas para módulos que no influyan en el proceso de compra (Como vistas de usuarios premium para crear productos, o vistas de panel de admin para updates de productos, etc)

5. Realizar el despliegue de tu aplicativo en la plataforma de tu elección (Preferentemente Railway.app, pues es la abarcada en el curso) y corroborar que se puede llevar a cabo un proceso de compra completo.

## Formato

- Link al repositorio de GitHub con el proyecto completo (no incluir node_modules).
- Link del proyecto desplegado.

## Sugerencias

- Presta especial atención a las rúbricas de Proyecto final. ¡Es crucial para alcanzar la nota que esperas!
- Debido a la complejidad de frontend requerida para poder aplicar una pasarela de pago, el PF no evalúa la pasarela de pago.