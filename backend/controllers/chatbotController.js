import asyncHandler from 'express-async-handler';

const chatbotResponses = {
  greetings: [
    "Hello! I'm Shaman's AI assistant. How can I help you today?",
    "Hi there! I'm here to help you learn more about Shaman's work.",
  ],
  about: [
    "Shaman Dhungel is a full-stack MERN developer focused on scalable apps.",
  ],
  skills: [
    "React, Node.js, Express, MongoDB, Tailwind, Git, REST APIs.",
  ],
  projects: [
    "Shaman has built e-commerce, portfolio, and MERN applications.",
  ],
  contact: [
    "Use the contact form or email to reach Shaman.",
  ],
  default: [
    "Ask me about Shaman's skills, projects, or contact details.",
  ],
};

export const handleChatMessage = asyncHandler(async (req, res) => {
  const { message } = req.body;
  if (!message) throw new Error('Message required');

  const text = message.toLowerCase();

  let type = 'default';
  if (text.includes('hi')) type = 'greetings';
  else if (text.includes('about')) type = 'about';
  else if (text.includes('skill')) type = 'skills';
  else if (text.includes('project')) type = 'projects';
  else if (text.includes('contact')) type = 'contact';

  const response =
    chatbotResponses[type][
      Math.floor(Math.random() * chatbotResponses[type].length)
    ];

  res.json({ response, timestamp: new Date().toISOString() });
});
