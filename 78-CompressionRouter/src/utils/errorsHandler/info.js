const getUserErrorInfo = (user) => {
  return `
  One or more properties were incomplete or not valid.
  List of required properties:
    * firstName: expected String, received ${user.firstName}
    * lastName: expected String, received ${user.lastName}
    * email: expected String, received ${user.email}
  `
}

module.exports = getUserErrorInfo