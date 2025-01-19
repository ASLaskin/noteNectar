"use client";

import { useState, ChangeEvent } from "react";
import toast from "react-hot-toast";

interface LinkUploadProps {
  title: string;
  onExtractedText: (text: string) => void; 
}

const LinkUpload: React.FC<LinkUploadProps> = ({ onExtractedText,title }) => {
  const [videoLink, setVideoLink] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCaptions = async () => {
    if (!title){
      toast.error("Please provide a title.");
      return
    }

    if (!videoLink) {
      toast.error("Please provide a YouTube video link .");
      return;
    }

    try {
      const url = new URL(videoLink);
      const videoId = url.searchParams.get("v");

      if (!videoId) {
        toast.error("Invalid YouTube link. Please provide a valid URL.");
        return;
      }

      setLoading(true);

      const response = await fetch("/api/getTrans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoId }), 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch captions.");
      }

      const data = await response.json();

      onExtractedText(data.transcript);

    } catch (error) {
      console.error("Error fetching captions:", error);
      toast.error("An error occurred while fetching captions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">YouTube Link Captions Fetcher</h1>
      <input
        type="text"
        placeholder="Enter YouTube Video Link"
        value={videoLink}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setVideoLink(e.target.value)}
        className="border border-gray-300 p-2 rounded-lg w-full mb-4"
      />
      <button
        onClick={fetchCaptions}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        disabled={loading}
      >
        {loading ? "Fetching Captions..." : "Fetch Captions"}
      </button>

    </div>
  );
};

export default LinkUpload;
