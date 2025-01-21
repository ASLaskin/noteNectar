"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import RichTextEditor from "./components/editor";

const EditPage: React.FC = () => {
  const searchParams = useSearchParams();
  const initialContent = searchParams.get("notes") || "";
  const title = searchParams.get("title") || "Untitled Document";
  const [editableNotes, setEditableNotes] = useState(initialContent);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8">
            <h1 className="text-4xl font-bold">{title}</h1>
          </div>
          <div className="p-6">
            <RichTextEditor
              initialContent={editableNotes}
              onChange={(content) => setEditableNotes(content)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
