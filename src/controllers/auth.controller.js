import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createAccesToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    const userSave = await newUser.save();

    const token = await createAccesToken({ id: userSave._id });

    res.cookie("token", token);
    res.json({
      msg: "user created succesfully",
    });

    // res.send(userSave);
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (!userFound) return res.status(400).json({ msg: "invalid credentials" });

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) return res.status(400).json({ msg: "invalid credentials" });

    const token = await createAccesToken({ id: userFound._id });

    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });

    // res.send(userSave);
  } catch (error) {
    res.status(500).json({ msg: error.message });
    console.log(error);
  }
};
