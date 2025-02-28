import { useState } from "react";

const YouTubeSearch = () => {
    const [query, setQuery] = useState("");
    const apiKey = "AIzaSyA59l-fVpuV7XpeEphCSyj_oEQ8eyEOkIA";

    const findRelevantYouTubeVideo = async () => {
        if (query.trim() === "") {
            alert("Please enter a search term.");
            return;
        }

        try {
            const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${encodeURIComponent(query)}&type=video&key=${apiKey}`;
            const searchResponse = await fetch(searchUrl);
            if (!searchResponse.ok) throw new Error(`HTTP error! Status: ${searchResponse.status}`);

            const searchData = await searchResponse.json();
            if (!searchData.items || searchData.items.length === 0) {
                alert("No results found.");
                return;
            }

            let bestVideo = null;
            let highestViews = 0;

            for (let item of searchData.items) {
                const videoId = item.id.videoId;
                const videoTitle = item.snippet.title.toLowerCase();
                const videoDescription = item.snippet.description.toLowerCase();

                const statsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${apiKey}`;
                const statsResponse = await fetch(statsUrl);
                const statsData = await statsResponse.json();

                if (!statsData.items || statsData.items.length === 0) continue;

                const viewCount = parseInt(statsData.items[0].statistics.viewCount);
                if (videoTitle.includes(query.toLowerCase()) || videoDescription.includes(query.toLowerCase()) || !bestVideo) {
                    if (viewCount > highestViews) {
                        bestVideo = videoId;
                        highestViews = viewCount;
                    }
                }
            }

            if (bestVideo) {
                window.location.href = `https://www.youtube.com/watch?v=${bestVideo}`;
            } else {
                alert("No relevant video found, but try searching again.");
            }
        } catch (error) {
            console.error("Error fetching YouTube data:", error);
            alert("Failed to load video. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white px-4 pt-20">
            <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md shadow-xl rounded-2xl p-6 border border-white/20">
                <h1 className="text-3xl font-bold text-center">🎥 Find Most Relevant YouTube Video</h1>

                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter topic"
                    className="w-full border border-gray-400/50 rounded-lg p-3 mt-4 bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-red-400"
                />

                <button
                    onClick={findRelevantYouTubeVideo}
                    className="w-full p-3 mt-4 bg-red-600 text-white font-semibold rounded-lg transition hover:bg-red-700 focus:ring-2 focus:ring-red-400"
                >
                    🔍 Find & Go
                </button>
            </div>
        </div>
    );
};

export default YouTubeSearch;