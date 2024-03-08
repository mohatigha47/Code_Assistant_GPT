
import express from "express";

import dotenv from 'dotenv';
dotenv.config();




import OpenAI from "openai";
import mongoose from "mongoose";
const openai = new OpenAI();

import User from "./models/user.js";






const app = express();


mongoose.connect(process.env.DB).then((res) => app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})).catch((err) => console.log(err))

const PORT = 3001;




// Route to respond with a message
app.get('/hello', async (req, res) => {
  const completion = await openai.chat.completions.create({
    messages: [
      { "role": "assistant", "content": "you are a code assistant" },
      { "role": "user", "content": "who are you ?" },
    ],
    model: "gpt-3.5-turbo",
  });

  res.send(completion.choices[0])
});


app.get('/addUser', (req, res) => {
  const user = new User({
    email: 'mohamedtigha999@gmail.com',
    token: 'adalfhzjkbgejhbvgebgeurbvgeyrvgbuyerbgvueryvgubyerguyveryvgbeuirbvgeur',
  });

  user.save().then((result) => { res.send(result) }).catch((err) => { console.log(err) })

})


