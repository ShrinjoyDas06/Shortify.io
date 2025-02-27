import { useState, useEffect } from 'react';
import axios from 'axios';

const FlashcardApp = () => {
  const [title, setTitle] = useState('');
  const [inputText, setInputText] = useState('');
  const [flashcards, setFlashcards] = useState([]);
  const [savedSets, setSavedSets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedSets = JSON.parse(localStorage.getItem('flashcardSets')) || [];
    setSavedSets(storedSets);
  }, []);

  const generateFlashcards = async () => {
    if (!inputText.trim() || !title.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/generate-flashcards', { inputText });
      setFlashcards(response.data.flashcards);
    } catch (error) {
      console.error('Error generating flashcards:', error);
    }
    setLoading(false);
  };

  const saveFlashcards = () => {
    if (!title.trim() || flashcards.length === 0) return;
    const newSet = { title, flashcards };
    const updatedSets = [...savedSets, newSet];
    setSavedSets(updatedSets);
    localStorage.setItem('flashcardSets', JSON.stringify(updatedSets));
    setTitle('');
    setInputText('');
    setFlashcards([]);
  };

  const deleteFlashcardSet = (index) => {
    const updatedSets = savedSets.filter((_, i) => i !== index);
    setSavedSets(updatedSets);
    localStorage.setItem('flashcardSets', JSON.stringify(updatedSets));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white px-4 pt-20">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-white/20">
        <h1 className="text-3xl font-bold text-center">📚 AI Flashcard Generator</h1>

        <input
          className="w-full border border-gray-400/50 rounded-lg p-3 mt-4 bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-400"
          type="text" placeholder="Enter title..." value={title} onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border border-gray-400/50 rounded-lg p-3 mt-4 bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-400"
          rows="4" placeholder="Enter text..." value={inputText} onChange={(e) => setInputText(e.target.value)}
        ></textarea>

        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <button className={`bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition w-full ${loading ? 'animate-pulse' : ''}`}
            onClick={generateFlashcards} disabled={loading}>
            {loading ? 'Generating...' : '🚀 Generate Flashcards'}
          </button>
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition w-full" onClick={() => setFlashcards([])}>🗑️ Clear</button>
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition w-full" onClick={saveFlashcards}>💾 Save</button>
        </div>

        {flashcards.length > 0 && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 place-items-center">
            {flashcards.map((flashcard, index) => (
              <div key={index} className="p-4 rounded-2xl bg-white/20 backdrop-blur-lg shadow-lg border border-white/30 hover:scale-105 flex items-center justify-center text-center">
                <p className="text-lg font-semibold break-words whitespace-pre-wrap leading-relaxed">{flashcard}</p>
              </div>
            ))}
          </div>
        )}

        {savedSets.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-center">📂 Saved Flashcard Sets</h2>
            <div className="mt-4 space-y-4">
              {savedSets.map((set, index) => (
                <div key={index} className="bg-gray-700 p-4 rounded-lg shadow-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">{set.title}</h3>
                    <button className="bg-red-500 text-white px-2 py-1 rounded-lg" onClick={() => deleteFlashcardSet(index)}>🗑️ Delete</button>
                  </div>
                  <ul className="list-disc list-inside text-gray-200 mt-2">
                    {set.flashcards.map((flashcard, i) => <li key={i}>{flashcard}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardApp;
