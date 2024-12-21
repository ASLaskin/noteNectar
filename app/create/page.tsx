"use client"

import { useState } from "react";
import UploadForm from "@/components/uploadForm";

const CreatePage: React.FC = () => {
    const [extractedText, setExtractedText] = useState<string>("");
  
    const handleExtractedText = (text: string) => {
      setExtractedText(text);
    };
  
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800 p-4">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-xl">
          <div className="bg-indigo-600 dark:bg-indigo-800 text-white p-6 rounded-t-lg">
            <h1 className="text-3xl font-semibold">Create New Document</h1>
          </div>
          <div className="p-6">
            <UploadForm onExtractedText={handleExtractedText} />
            {extractedText && (
              <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <h2 className="text-lg font-semibold">Extracted Text:</h2>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  {extractedText}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default CreatePage;
  