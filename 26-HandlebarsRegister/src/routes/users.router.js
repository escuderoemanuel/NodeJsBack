import { Router } from 'express';

const router = Router();

const users = [];

router.post('/', (req, res) => {
  const user = req.body;
  users.push(user);
  res.send({
    status: 'success',
    message: 'User added successfully',
    users: users,
  });
})

router.get('/', (req, res) => {
  res.send({ users: users });
})

export default router;