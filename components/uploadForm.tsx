"use client"
import { useState, ChangeEvent } from "react";

interface UploadFormProps {
  onUploadSuccess: (data: { file: File; title: string }) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedFile = e.target.files[0];
      if (uploadedFile.type !== "application/pdf") {
        alert("Only PDF files are allowed!");
        setFile(null);
        return;
      }

      setFile(uploadedFile);

      // Immediately create the file URL and pass it to the parent
      const url = URL.createObjectURL(uploadedFile);
      onUploadSuccess({ file: uploadedFile, title });
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col items-center justify-center w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
    >
      {/* Title Input */}
      <div className="mb-4 w-full">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
          placeholder="Enter a title for your document"
        />
      </div>

      {/* File Upload Input */}
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="file-input"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PDF only</p>
          </div>
          <input
            id="file-input"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-4 bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 dark:bg-green-700 dark:hover:bg-blue-800 dark:focus:ring-blue-900"
        disabled={!file || !title}
      >
        Upload PDF
      </button>

      {/* Render the iframe here as soon as the file is selected */}
      {file && (
        <div className="mt-4 w-full h-64 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <iframe
            src={URL.createObjectURL(file)}
            width="100%"
            height="100%"
            className="rounded-lg"
            title="PDF Preview"
          ></iframe>
        </div>
      )}
    </form>
  );
};

export default UploadForm;
