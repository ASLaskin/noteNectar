"use client";

import { useState } from "react";
import UploadForm from "@/components/uploadForm";
import { useRouter } from "next/navigation";
import { exampleNotes } from "../utils/notes";
import { useSession } from "next-auth/react";

const CreatePage: React.FC = () => {
  const [extractedText, setExtractedText] = useState<string>("");
  const [generatedNotes, setGeneratedNotes] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] =  useState<string>("");
  const router = useRouter();
  const { data: session } = useSession();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleExtractedText = async (text: string) => {
    const userId = session?.user?.id;

    setLoading(true);
    setErrorMessage("");
    try {
      //WORKING VERSION OF API CALL CURRENTLY HARDCODED TO AVOID API USAGE

      const response = await fetch("/api/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, userId }),
      });

      if (response.status === 403) {
        setErrorMessage("You have insufficient credits. Please purchase more to generate notes.");
        return;
      }

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

      // router.push(`/edit?notes=${encodeURIComponent(exampleNotes)}&title=${encodeURIComponent(title)}`);

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
        <UploadForm onExtractedText={handleExtractedText} onTitle={setTitle} />
          {loading && (
            <p className="text-sm text-gray-700 dark:text-gray-300">Generating summary...</p>
          )}
        </div>
        {errorMessage && (
            <p className="text-sm text-red-500 mt-4">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default CreatePage;
