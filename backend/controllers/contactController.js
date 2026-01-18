import nodemailer from 'nodemailer';
import Contact from '../models/Contact.js';
import asyncHandler from 'express-async-handler';

export const sendContactMessage = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  const contact = await Contact.create({
    name,
    email,
    message,
    status: 'pending',
  });

  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New message from ${name}`,
      html: `<p>${message}</p>`,
    });
  }

  res.status(201).json({ message: 'Message sent', contact });
});

export const getContactMessages = asyncHandler(async (req, res) => {
  const messages = await Contact.find().sort({ createdAt: -1 });
  res.json(messages);
});
