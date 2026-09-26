import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import connectDB from "../config/db.js";
import User from "../models/user.model.js";
import Product from "../models/product.model.js";

const sampleProducts = [
  {
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with adjustable DPI.",
    price: 799,
    stock: 40,
    image: "https://picsum.photos/seed/wireless-mouse/600/400",
  },
  {
    name: "Mechanical Keyboard",
    description: "RGB backlit mechanical keyboard with blue switches.",
    price: 2999,
    stock: 25,
    image: "https://picsum.photos/seed/mechanical-keyboard/600/400",
  },
  {
    name: "Noise Cancelling Headphones",
    description: "Over-ear headphones with active noise cancellation.",
    price: 4999,
    stock: 15,
    image: "https://picsum.photos/seed/headphones/600/400",
  },
  {
    name: "27-inch Monitor",
    description: "Full HD IPS monitor with slim bezels.",
    price: 12999,
    stock: 10,
    image: "https://picsum.photos/seed/monitor/600/400",
  },
  {
    name: "HD Webcam",
    description: "1080p webcam with built-in noise-cancelling mic.",
    price: 1799,
    stock: 30,
    image: "https://picsum.photos/seed/webcam/600/400",
  },
  {
    name: "Ergonomic Office Chair",
    description: "Adjustable mesh-back chair with lumbar support.",
    price: 7999,
    stock: 8,
    image: "https://picsum.photos/seed/office-chair/600/400",
  },
  {
    name: "LED Desk Lamp",
    description: "Dimmable desk lamp with USB charging port.",
    price: 999,
    stock: 50,
    image: "https://picsum.photos/seed/desk-lamp/600/400",
  },
  {
    name: "Travel Backpack",
    description: "Water-resistant backpack with laptop compartment.",
    price: 1499,
    stock: 35,
    image: "https://picsum.photos/seed/backpack/600/400",
  },
  {
    name: "Insulated Water Bottle",
    description: "Stainless steel bottle, keeps drinks cold for 24 hours.",
    price: 599,
    stock: 60,
    image: "https://picsum.photos/seed/water-bottle/600/400",
  },
  {
    name: "Smartwatch",
    description: "Fitness smartwatch with heart-rate and sleep tracking.",
    price: 3499,
    stock: 20,
    image: "https://picsum.photos/seed/smartwatch/600/400",
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable speaker with 12-hour battery life.",
    price: 1999,
    stock: 28,
    image: "https://picsum.photos/seed/speaker/600/400",
  },
  {
    name: "Laptop Stand",
    description: "Adjustable aluminium stand for laptops up to 16 inches.",
    price: 1299,
    stock: 22,
    image: "https://picsum.photos/seed/laptop-stand/600/400",
  },
];

const seed = async () => {
  await connectDB();

  let demoUser = await User.findOne();

  if (!demoUser) {
    const hashedPassword = await bcrypt.hash("Demo@1234", 10);
    demoUser = await User.create({
      name: "Demo Seller",
      email: "demo@seller.com",
      password: hashedPassword,
    });
    console.log("Created demo user: demo@seller.com / Demo@1234");
  }

  await Product.insertMany(
    sampleProducts.map((product) => ({ ...product, createdBy: demoUser._id })),
  );

  console.log(`Seeded ${sampleProducts.length} products`);
  await mongoose.disconnect();
};

seed().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
