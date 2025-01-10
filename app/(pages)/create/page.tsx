"use client";

import { useState } from "react";
import UploadForm from "@/app/(pages)/create/components/uploadForm";
import { useRouter } from "next/navigation";
import { exampleNotes } from "../../utils/notes";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Header from "@/components/header";

const CreatePage: React.FC = () => {
  const [extractedText, setExtractedText] = useState<string>("");
  const [generatedNotes, setGeneratedNotes] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const router = useRouter();
  const { data: session } = useSession();

  const handleExtractedText = async (text: string) => {
    const userId = session?.user?.id;

    setLoading(true);
    try {
      //WORKING VERSION OF API CALL CURRENTLY HARDCODED TO AVOID API USAGE

      // const response = await fetch("/api/summary", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ text, userId }),
      // });

      // if (response.status === 403) {
      //   toast.error("You have insufficient credits. Please purchase more to generate notes.")
      //   return;
      // }

      // if (!response.body) {
      //   throw new Error("No response body");
      // }

      // const reader = response.body.getReader();
      // const decoder = new TextDecoder();
      // let result = "";

      // while (true) {
      //   const { done, value } = await reader.read();
      //   if (done) break;

      //   result += decoder.decode(value, { stream: true });
      //   setGeneratedNotes((prev) => prev + decoder.decode(value, { stream: true }));
      // }

      // router.push(`/edit?notes=${encodeURIComponent(result)}`);



      //router.push(`/edit?notes=${encodeURIComponent(exampleNotes)}&title=${encodeURIComponent(title)}`);

    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-black ">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <motion.h1
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Create New Document
          </motion.h1>
        </div>

        <div className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden">
          <div className="p-6">
            <UploadForm onExtractedText={handleExtractedText} onTitle={setTitle} />
            {loading && (
              <p className="mt-4 text-lg text-gray-700">Generating summary...</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreatePage;
