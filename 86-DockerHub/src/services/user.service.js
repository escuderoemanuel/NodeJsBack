import UserModel from "../models/user.model.js";
import generateUser from "../utils/user.utils.js";

const createUsersMock = async (cant = 50) => {
  const usersArray = [];

  for (let i = 0; i < cant; i++) {
    const user = generateUser();
    usersArray.push(user);
  }
  const users = await UserModel.create(usersArray);
  return users;
};

const getUsers = async () => {
  try {
    const users = await UserModel.find({});
    return users;
  } catch (error) {
    console.log('error:', error)
  }
};

export default { createUsersMock, getUsers };