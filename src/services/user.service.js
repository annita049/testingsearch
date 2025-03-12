import User from "../models/user.model.js";

export const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

export const getAllUsers = async () => {
  return await User.find();
};



// export const updateUser = async (userId, updateData) => {
//   return await User.findByIdAndUpdate(userId, updateData, { new: true });
// };

// export const deleteUser = async (userId) => {
//   return await User.findByIdAndDelete(userId);
// };
