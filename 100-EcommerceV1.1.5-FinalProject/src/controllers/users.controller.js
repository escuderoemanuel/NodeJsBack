const { usersService } = require('../repositories');
const UserDTO = require('../dao/DTOs/UserDTO');


class UsersController {
  static async getAll(req, res) {
    try {
      const user = await usersService.getById(req.user.id);

      const users = await usersService.getAll();
      const usersDTO = users.map(user => ({
        user: new UserDTO(user)
      }))

      // Verificar el encabezado 'Accept'para que si la consulta es desde el FRONT, haga un res.render pero sino, haga un res.json
      const acceptHeader = req.headers['accept'] || '';
      if (acceptHeader.includes('text/html')) {
        res.render('users', { user, users: usersDTO });
      } else {
        res.send({ status: 'success', payload: usersDTO })
      }

    } catch (error) {
      res.status(500).send({ status: 'error', error: error.message })
    }
  }

  static async changeRole(req, res) {
    const uid = req.params.uid;
    try {
      const user = await usersService.getById(uid);
      if (!['user', 'premium'].includes(user.role)) {
        throw new Error(`The user's role is not valid`)
      }

      const requiredDocuments = [
        'Identification',
        'Proof of Address',
        'Proof of Account Status'
      ];

      if (user.role == 'user') {
        if (!user.documents.some(d => d.name.includes('Identification'))) {
          throw new Error('The user has not finished uploading the required documentation')
        }
        if (!user.documents.some(d => d.name.includes('Proof of Address'))) {
          throw new Error('The user has not finished uploading the required documentation')
        }
        if (!user.documents.some(d => d.name.includes('Proof of Account Status'))) {
          throw new Error('The user has not finished uploading the required documentation')
        }
      }

      if (!['user', 'premium'].includes(user.role)) {
        throw new Error('User has invalid role')
      }

      user.role = user.role == 'user' ? 'premium' : 'user'

      let updatedUser = await usersService.update(user._id.toString(), { $set: { role: user.role } });
      res.send({ status: 'success', message: `role updated to '${user.role}'` })

    } catch (error) {
      res.status(500).send({ status: 'error', error: error.message })
    }
  }

  static async uploadDocuments(req, res) {
    try {
      const { uid } = req.params;
      const result = await usersService.addDocuments(uid, req.files)
      res.send({ status: 'success', payload: result })
    } catch (error) {
      res.status(500).send({ status: 'error', error: error.message })
    }
  }

  static async deleteInactiveUsers(req, res) {
    try {
      const result = await usersService.deleteInactiveUsers();
      res.send({ status: 'success', payload: result })
    } catch (error) {
      res.status(500).send({ status: 'error', error: error.message })
    }
  }

  static async delete(req, res) {
    try {
      const { uid } = req.params;
      const result = await usersService.delete(uid);
      res.send({ status: 'success', payload: result })
    } catch (error) {
      res.status(500).send({ status: 'error', error: error.message })
    }
  }
}

module.exports = UsersController; 