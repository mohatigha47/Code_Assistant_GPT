
import express from "express";

import dotenv from 'dotenv';
dotenv.config();

import bodyParser from "body-parser";
import cors from "cors"

import OpenAI from "openai";
import mongoose from "mongoose";
const openai = new OpenAI();

import User from "./models/user.js";
import History from "./models/history.js";





const app = express();

app.use(cors());
const ObjectId = mongoose.Types.ObjectId;

// Middleware to parse JSON bodies
app.use(bodyParser.json());


mongoose.connect(process.env.DB).then((res) => app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})).catch((err) => console.log(err))

const PORT = 3001;




// Route to respond with a message
app.get('/generate', async (req, res) => {
  const lang = req.query.lang;
  const code = req.query.code;
  console.log(lang)
  const completion = await openai.chat.completions.create({
    messages: [
      { "role": "assistant", "content": "you are a code assistant that can accept only pseudocodes and convert them into a chosen coding language" },
      {
        "role": "user", "content": `this is a pseudo code ${code} i want you to convert it into ${lang} i want only the code with no additional talk`
      },
    ],
    model: "gpt-3.5-turbo",
  });

  res.send(completion.choices[0])
});


app.put('/addUser', async (req, res) => {
  const { id, email, token } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists.' }); // Send HTTP 409 Conflict status if user already exists
    }

    // If user does not exist, create and save the new user
    const newUser = new User({
      _id: id,
      email: email,
      token: token,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser); // Send HTTP 201 Created status and the saved user data as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save user.' }); // Send HTTP 500 Internal Server Error status and error message
  }
});


app.delete('/history/:id', async (req, res) => {
  const historyId = req.params.id;

  try {
    // Find the history record by ID and delete it
    const deletedHistory = await History.findByIdAndDelete(historyId);

    if (!deletedHistory) {
      return res.status(404).json({ message: 'History record not found.' });
    }

    res.status(200).json({ message: 'History record deleted successfully.' });
  } catch (error) {
    console.error('Error deleting history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.put('/addHistory', (req, res) => {
  const { user, pseudoCode, lang, generatedCode } = req.body;
  const history = new History({
    user: user,
    lang: lang,
    pseudoCode: pseudoCode,
    generatedCode: generatedCode,
  });
  history.save().then((result) => { res.send(result) }).catch((err) => { console.log(err) })
})

app.get('/history/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find history records by user ID
    const history = await History.find({ user: userId }).exec();

    if (!history || history.length === 0) {
      return res.status(404).json({ message: 'No history found for the user.' });
    }

    res.status(200).json(history);
  } catch (error) {
    console.error('Error retrieving history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


