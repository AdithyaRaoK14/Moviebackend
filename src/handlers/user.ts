import prisma from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";
export const createUser = async (req, res, next) => {
  let userData = {
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: await hashPassword(req.body.password),
    genres: "",
  };
  try {
    const user = await prisma.user.create({
      data: userData,
    });
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    err.type = "input";
    next(err);
  }
};

export const signIn = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    const isValid = await comparePassword(req.body.password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = createJWT(user);
    res.cookie("authToken", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      domain: "netlify",
    });
    delete user.password;

    return res.json({ token, user });
  } catch (err) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
};
export const updateUser = async (req, res, next) => {
  const updateData = {};

  if (req.body.email) {
    updateData["email"] = req.body.email;
  }
  if (req.body.firstName) {
    updateData["firstName"] = req.body.firstName;
  }
  if (req.body.lastName) {
    updateData["lastName"] = req.body.lastName;
  }
  if (req.body.password) {
    updateData["password"] = await hashPassword(req.body.password);
  }
  if (req.body.genres) {
    updateData["genres"] = req.body.genres;
  }
  try {
    const user = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: updateData,
    });
    const token = createJWT(user);
    delete user.password;
    res.json({ token, user });
  } catch (err) {
    err.type = "input";
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });
    res.status(200).json(user);
  } catch (err) {
    err.type = "input";
    next(err);
  }
};
export const getAllUsers = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          id: req.user.id,
        },
      },
    });
    res.status(200).json(users);
  } catch (err) {
    err.type = "input";
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await prisma.user.delete({
      where: {
        id: req.body.id,
      },
    });
    res.status(200).json({ data: user });
  } catch (err) {
    err.type = "input";
    next(err);
  }
};
