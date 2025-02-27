import { useState } from "react";

const GoogleImageSearch = () => {
    const [query, setQuery] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    const apiKey = "AIzaSyByr7T0uLOZkJgpMgL-o0NyfIFqt5Mbbvc"; // Replace with your Google API Key
    const cx = "f262e7b49bb114867"; // Replace with your Custom Search Engine ID

    const searchImages = async () => {
        if (query.trim() === "") return;
        setLoading(true);
        setImages([]);

        const url = `https://www.googleapis.com/customsearch/v1?q=${query}&searchType=image&key=${apiKey}&cx=${cx}&num=10`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            if (data.items) {
                setImages(data.items.map(item => item.link));
            } else {
                throw new Error("Invalid response from API");
            }
        } catch (error) {
            console.error("Error fetching images:", error);
            alert("Failed to fetch images. Check API key and CSE ID.");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-6">
            <h1 className="text-3xl font-bold text-center mt-15 ">🔍 Google Image Search</h1>
            <div className="flex flex-col sm:flex-row gap-2 mt-4 w-full max-w-lg">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for images..."
                    className="border border-gray-400/50 rounded-lg p-3 w-full sm:w-72 bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-400"
                />
                <button
                    onClick={searchImages}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
                    disabled={loading}
                >{loading ? "Searching..." : "🔍 Search"}</button>
            </div>
            {images.length > 0 && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-5xl px-4">
                    {images.map((image, index) => (
                        <img key={index} src={image} alt="Search result" className="w-full h-40 object-cover rounded-lg shadow-lg" />
                    ))}
                </div>
            )}
        </div>
    );
};

export default GoogleImageSearch;
