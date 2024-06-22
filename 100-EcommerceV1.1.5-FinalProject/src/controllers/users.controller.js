const { usersService } = require('../repositories');
const UserDTO = require('../dao/DTOs/UserDTO');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }).array('document', 3);

class UsersController {
  static async getAll(req, res) {
    // const uid = req.user.id;
    try {
      // const user = await usersService.getById(uid);
      const users = await usersService.getAll();

      const usersDTO = users.map(u => {
        const userDTO = new UserDTO(u);
        return {
          ...userDTO,
          isUser: u.role === 'user',
          isPremium: u.role === 'premium',
          isAdmin: u.role === 'admin'
        };
      });

      const acceptHeader = req.headers['accept'] || '';
      if (acceptHeader.includes('text/html')) {
        res.render('users', { user, users: usersDTO });
      } else {
        res.send({ status: 'success', payload: usersDTO });
      }

    } catch (error) {
      res.status(500).send({ status: 'error', error: error.message });
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

      user.role = user.role == 'user' ? 'premium' : 'user'

      let updatedUser = await usersService.update(user._id.toString(), { $set: { role: user.role } });
      res.send({ status: 'success', message: `role updated to '${user.role}'` })

    } catch (error) {
      res.status(500).send({ status: 'error', error: error.message })
    }
  }

  static async uploadDocuments(req, res) {
    upload(req, res, async (error) => {
      if (error) {
        return res.status(400).send({ status: 'error', error: error.message });
      }

      const { uid } = req.params;
      const documents = req.files.map(file => ({
        name: file.originalname,
        path: file.path
      }));

      try {
        const result = await usersService.addDocuments(uid, documents);
        res.send({ status: 'success', payload: result });
      } catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
      }
    });
  }

  static async deleteInactive(req, res) {
    try {
      const result = await usersService.deleteInactive();
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

  static async update(req, res) {
    const { uid } = req.params;
    const user = req.body;
    try {
      const result = await usersService.update(uid, user);
      res.send({ status: 'success', payload: result })
    } catch (error) {
      res.status(500).send({ status: 'error', error: error.message })
    }
  }
}

module.exports = UsersController;
