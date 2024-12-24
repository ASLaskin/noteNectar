"use client";

import { useState } from "react";
import UploadForm from "@/components/uploadForm";
import { useRouter } from "next/navigation";

const CreatePage: React.FC = () => {
  const [extractedText, setExtractedText] = useState<string>("");
  const [generatedNotes, setGeneratedNotes] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleExtractedText = async (text: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        result += decoder.decode(value, { stream: true });
        setGeneratedNotes((prev) => prev + decoder.decode(value, { stream: true }));
      }

      router.push(`/edit?notes=${encodeURIComponent(result)}`);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 p-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-xl">
        <div className="bg-indigo-600 dark:bg-indigo-800 text-white p-6 rounded-t-lg">
          <h1 className="text-3xl font-semibold">Create New Document</h1>
        </div>
        <div className="p-6">
          <UploadForm onExtractedText={handleExtractedText} />
          {loading && (
            <p className="text-sm text-gray-700 dark:text-gray-300">Generating summary...</p>
          )}
          {extractedText && (
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <h2 className="text-lg font-semibold">Extracted Text:</h2>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                {extractedText}
              </p>
            </div>
          )}
          {generatedNotes && !loading && (
            <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <h2 className="text-lg font-semibold">Generated Summary:</h2>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                {generatedNotes}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
