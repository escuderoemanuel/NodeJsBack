
const TypesOfErrors = {
  UNKNOWN: 0,
  ROUTING_ERROR: 1,
  INVALID_TYPE_ERROR: 2,
  DATABASE_ERROR: 3,
  // generar un customizador de errores y crear un diccionario para tus errores más comunes al crear un producto, agregarlo al carrito, etc.
  INVALID_PRODUCT_DATA: 4,
  VALIDATION_ERROR: 5,
  AUTHENTICATION_ERROR: 6,
  AUTHORIZATION_ERROR: 7,
  REGISTRATION_ERROR: 8,
  PASSWORD_ERROR: 9,
  TOKEN_ERROR: 10,
}

module.exports = { TypesOfErrors };