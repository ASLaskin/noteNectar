"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { extractTextFromPDF } from "@/app/utils/pdfParser";
import toast from "react-hot-toast";

interface UploadFormProps {
  onExtractedText: (text: string) => void;
  onTitle: (text: string) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onExtractedText, onTitle }) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);

  const uploadFile = async () => {
    if (!title) {
      toast.error("Please provide a title.");
      return;
    }
    if (!file) {
      toast.error("Please select a file.");
      return;
    }

    try {
      setUploading(true);
      const extractedText = await extractTextFromPDF(file);
      onTitle(title);
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

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    onTitle(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    uploadFile();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center space-y-6 bg-white p-8 rounded-lg shadow-md border border-gray-200"
    >
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Document Title"
        className="p-3 border border-gray-300 rounded-lg w-full text-black bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="file"
        accept="application/pdf"
        className="text-black border border-gray-300 rounded-lg p-2 w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
        onChange={handleFileChange}
      />
      <button
        type="button"
        onClick={uploadFile}
        className={`p-3 text-white rounded-lg w-full ${
          uploading ? "opacity-50 cursor-not-allowed" : "bg-primary hover:bg-primary-dark"
        }`}
      >
        {uploading ? "Uploading..." : "Upload PDF"}
      </button>
    </form>
  );
};

export default UploadForm;
