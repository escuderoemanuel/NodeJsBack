import userService from "../services/user.service.js";

const createUser = async (req, res) => {
  const { cant } = req.query;
  try {
    const response = await userService.createUsersMock(cant);
    return res.status(200).json({ users: response });
  } catch (error) {
    console.log('error:', error)
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const response = await userService.getUsers();
    return res.status(200).json({ users: response, pid: process.pid });
  } catch (error) {
    console.log('error:', error)
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

export default { createUser, getUsers };