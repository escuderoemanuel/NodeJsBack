const getRole = (role) => (req, res, next) => {
  const user = req.user;
  if (user.role !== role) {
    return res.status(403).send({ status: 'error', error: `User of type ${role} are not authorized` });
  }
  next();
}

// const checkAdmin = (req, res, next) => {
//   const user = req.user;
//   if (user.role != "admin") {
//     return res.status(403).send({ status: 'error', error: `User of type ${role} are not authorized` })
//   }
//   next();
// }

// const checkUser = (req, res, next) => {
//   const user = req.user;
//   if (user.role != "user") {
//     return res.status(403).send({ status: 'error', error: `User of type ${role} are not authorized` })
//   }
//   next();
// }

module.exports = getRole;