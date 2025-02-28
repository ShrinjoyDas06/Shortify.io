# AI-Powered Flashcard & Learning Assistant

## 🚀 Overview
The **AI-Powered Flashcard & Learning Assistant** is an intelligent study tool designed to automate knowledge organization, enhance memory retention, and personalize learning. It leverages **AI-powered OCR, NLP, and contextual search** to extract text from images, generate flashcards, and recommend relevant YouTube videos for better understanding.

## 🌟 Features
- 📸 **AI-Powered Text Extraction:** Uses Hugging Face **TrOCR** to extract text from images.
- 🧠 **Smart Flashcard Generation:** AI converts extracted or input text into Q&A-style flashcards.
- 🎥 **YouTube Learning Assistant:** Fetches relevant educational videos based on flashcard topics.
- 📝 **Editable & Customizable:** Users can edit, save, and manage their flashcards.
- 🗄 **MongoDB Integration:** Securely stores flashcards for easy retrieval. *

## 🏗️ Tech Stack
- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Database:** MongoDB  *
- **AI & OCR:** Hugging Face TrOCR, Google API (for text processing)
- **Authentication:** Clerk (Google OAuth)

## 📌 Installation & Setup

### Prerequisites
Make sure you have the following installed:
- Node.js (v16+)
- MongoDB (Local or Atlas)* 
- Hugging Face API Key *
- Google API Key
- Clerk API Key (for authentication)

### Clone the Repository
```bash
 git clone https://github.com/your-username/ai-flashcard-assistant.git
 cd ai-flashcard-assistant
```

### Install Dependencies
```bash
 npm install
```

### Setup Environment Variables
Create a `.env` file in the root directory and add:
```env

HUGGINGFACE_API_KEY=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
VITE_BACKEND_URL="http://localhost:5000"
GOOGLE_API_KEY=AIzaSyBjS_pYYJpCu1bk0aLebVnaULWKxwdXszA
VITE_CLERK_PUBLISHABLE_KEY=pk_test_Y29udGVudC1taW5ub3ctMzIuY2xlcmsuYWNjb3VudHMuZGV2JA

```

### Run the Application
#### Start the Backend Server
```bash
 cd server
 npm start
```

#### Start the Frontend
```bash
 cd client
 npm run dev
```

### 🔥 Demo Usage
1️⃣ **Upload an image or enter text manually.**
2️⃣ **AI extracts text and suggests flashcards.**
3️⃣ **Edit, save, and view related YouTube resources.**
4️⃣ **Retrieve and review saved flashcards.**

## 🛠 Future Enhancements
- 🔄 **Spaced Repetition Algorithm** for personalized learning.
- 🎙 **Voice-to-Flashcard Conversion** for quick note-taking.
- 📊 **AI-Generated Smart Quizzes** based on flashcard content.
- 📡 **Offline Mode Support** for seamless learning.

## 📜 License
This project is licensed under the **MIT License**.

[*will add soon]
