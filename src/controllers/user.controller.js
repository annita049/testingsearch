import * as userService from "../services/user.service.js";

export const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    const filteredUsers = users.map(({ name, email, jobExperience }) => ({
      name,
      email,
      jobExperience: jobExperience.map(({ post, company }) => ({
        post,
        company
      }))
    }));

    res.json(filteredUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

