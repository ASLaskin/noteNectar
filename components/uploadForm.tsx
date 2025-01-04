import { useState, ChangeEvent, FormEvent } from 'react';
import { extractTextFromPDF } from '@/app/utils/pdfParser';

interface UploadFormProps {
  onExtractedText: (text: string) => void;
  onTitle: (text: string) => void;
}

const UploadForm: React.FC<UploadFormProps> = ({ onExtractedText, onTitle }) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async () => {
    if (!file || !title) {
      setError('Please select a file and provide a title.');
      return;
    }
    try {
      setUploading(true);
      setError(null);
      const extractedText = await extractTextFromPDF(file);
      onTitle(title);
      onExtractedText(extractedText);
    } catch (error) {
      console.error('Error extracting text from file:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files) {
      const uploadedFile = e.target.files[0];
      if (uploadedFile.type !== 'application/pdf') {
        setError('Only PDF files are allowed!');
        setFile(null);
        return;
      }
      setFile(uploadedFile);
    }
  };
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    onTitle(newTitle); 
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    uploadFile();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Document Title"
        className="p-2 border rounded"
      />
      <input type="file" accept="application/pdf" className='text-white' onChange={handleFileChange} />

      <button
        type="submit"
        disabled={!file || !title || uploading}
        className={`p-2 bg-blue-500 text-white rounded ${uploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
      >
        {uploading ? 'Uploading...' : 'Upload PDF'}
      </button>
    </form>
  );
};

export default UploadForm;
