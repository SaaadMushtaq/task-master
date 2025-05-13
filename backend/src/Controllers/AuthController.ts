import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../Models/User";

const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { first_name, last_name, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const newUser = new UserModel({
      first_name,
      last_name,
      email,
      password,
    });

    newUser.password = await bcrypt.hash(password, 10);

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      success: true,
      user: {
        id: newUser._id,
        email: newUser.email,
        name: `${newUser.first_name} ${newUser.last_name}`,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      res
        .status(403)
        .json({ message: "Auth failed email is incorrect!", success: false });
      return;
    }

    const isPassEqual = await bcrypt.compare(password, user.password);

    if (!isPassEqual) {
      res.status(403).json({
        message: "Auth failed password is incorrect!",
        success: false,
      });

      return;
    }
    const jwtToken = jwt.sign(
      {
        email: user.email,
        _id: user._id,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({
      message: "Signin successfully",
      success: true,
      token: jwtToken,
      email,
      name: `${user.first_name} ${user.last_name}`,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { signup, login };
