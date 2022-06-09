import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "store.henry.shoes@gmail.com",
      pass: "bctgrvsmdyqhacge",
    }
  });

  transporter.verify().then(() => console.log("Server is ready to take our messages"));