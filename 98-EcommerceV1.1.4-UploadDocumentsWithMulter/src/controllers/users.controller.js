const { usersService } = require('../repositories');

class UsersController {
  static async getAll(req, res) {
    try {
      const users = await usersService.getAll();
      res.send({ status: 'success', payload: users })
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

      if (user.role === 'user') {
        user.role = 'premium';
      } else {
        user.role = 'user';
      }

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

  static async uploadProfilePicture(req, res) {
    try {
      const { uid } = req.params;
      const result = await usersService.addProfilePicture(uid, req.file)

      res.send({ status: 'success', payload: result })
    } catch (error) {
      res.status(500).send({ status: 'error', error: error.message })
    }
  }

}



module.exports = UsersController; 