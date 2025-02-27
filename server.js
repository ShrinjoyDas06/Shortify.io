import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.post('/generate-flashcards', async (req, res) => {
  const { inputText } = req.body;

  if (!inputText) {
    return res.status(400).json({ error: 'Input text is required' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' }); // Update model name
    const result = await model.generateContent(inputText);
    const response = await result.response;
    const text = response.text();

    res.json({ flashcards: text.split('\n').filter(line => line.trim()) }); // Splitting into flashcards
  } catch (error) {
    console.error('Error generating flashcards:', error);
    res.status(500).json({ error: 'Failed to generate flashcards' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
