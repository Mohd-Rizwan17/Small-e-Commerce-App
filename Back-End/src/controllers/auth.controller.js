import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
  hashToken,
} from "../utils/token.js";

const isProduction = process.env.NODE_ENV === "production";

export const refreshCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const formatUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
});

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(409)
      .json({ success: false, message: "Email already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: formatUser(user),
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  const isPasswordValid =
    user && (await bcrypt.compare(password, user.password));

  if (!isPasswordValid) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = hashToken(refreshToken);
  await user.save();

  res.cookie("refreshToken", refreshToken, refreshCookieOptions);
  res.status(200).json({
    success: true,
    message: "Login successful",
    accessToken,
    user: formatUser(user),
  });
};

export const getMe = async (req, res) => {
  res.status(200).json({ success: true, user: formatUser(req.user) });
};

export const refreshAccessToken = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Refresh token missing" });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch {
    res.clearCookie("refreshToken", refreshCookieOptions);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired refresh token" });
  }

  const newRefreshToken = generateRefreshToken(decoded.id);
  const user = await User.findOneAndUpdate(
    { _id: decoded.id, refreshToken: hashToken(token) },
    { refreshToken: hashToken(newRefreshToken) },
  );

  if (!user) {
    await User.updateOne({ _id: decoded.id }, { $unset: { refreshToken: 1 } });
    res.clearCookie("refreshToken", refreshCookieOptions);
    return res.status(403).json({
      success: false,
      message: "Refresh token reused or revoked, please login again",
    });
  }

  res.cookie("refreshToken", newRefreshToken, refreshCookieOptions);
  res.status(200).json({
    success: true,
    accessToken: generateAccessToken(user._id),
  });
};

export const logout = async (req, res) => {
  await User.updateOne({ _id: req.user._id }, { $unset: { refreshToken: 1 } });

  res.clearCookie("refreshToken", refreshCookieOptions);
  res.status(200).json({ success: true, message: "Logged out successfully" });
};