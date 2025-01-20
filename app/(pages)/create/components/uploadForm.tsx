"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { extractTextFromPDF } from "@/app/utils/pdfParser";
import toast from "react-hot-toast";

interface UploadFormProps {
  title: string;
  onExtractedText: (text: string) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onExtractedText, title}) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const uploadFile = async () => {
    if (!title){
      toast.error("Please provide a title.");
      return
    }

    if (!file) {
      toast.error("Please select a file.");
      return;
    }

    try {
      setUploading(true);
      const extractedText = await extractTextFromPDF(file);
      onExtractedText(extractedText);
      toast.success("File uploaded and processed successfully!");
    } catch (error) {
      console.error("Error extracting text from file:", error);
      toast.error("Failed to extract text from the file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedFile = e.target.files[0];
      if (uploadedFile.type !== "application/pdf") {
        toast.error("Only PDF files are allowed!");
        setFile(null);
        return;
      }
      setFile(uploadedFile);
    }
  };

  return (
    <form
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        uploadFile();
      }}
      className="flex flex-col items-center space-y-6 bg-white p-8 rounded-lg shadow-md border border-gray-200"
    >
      <h1 className="text-2xl font-bold mb-4">File Upload</h1>
      <input
        type="file"
        accept="application/pdf"
        className="text-black border border-gray-300 rounded-lg p-2 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
        onChange={handleFileChange}
      />
      <button
        type="submit"
        className={`p-3 text-white rounded-lg w-full ${
          uploading ? "opacity-50 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
        }`}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload PDF"}
      </button>
    </form>
  );
};

export default UploadForm;
