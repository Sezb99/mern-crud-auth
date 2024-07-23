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
    res.status(450).send(error);
    console.log(error);
  }
};

export const login = (req, res) => res.send("login");
