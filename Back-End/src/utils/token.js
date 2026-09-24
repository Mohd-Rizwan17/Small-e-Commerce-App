import jwt from "jsonwebtoken";
import crypto from "crypto";

export const generateAccessToken = (userId) =>
  jwt.sign({ id: userId.toString() }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

export const generateRefreshToken = (userId) =>
  jwt.sign({ id: userId.toString() }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
    jwtid: crypto.randomUUID(),
  });

export const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");
