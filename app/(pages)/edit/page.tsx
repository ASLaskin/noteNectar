"use client";

import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const EditPage: React.FC = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const notes = searchParams.get("notes") || "";
  const title = searchParams.get("title") || "Untitled Document";
  const [editableNotes, setEditableNotes] = useState(notes);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    const userId = session?.user?.id;
    
    try {
      setSaving(true);
      const response = await fetch("/api/documents/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          title,
          content: editableNotes,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save the document");
      }
  
      const savedDocument = await response.json();
      
      //use the actual _id
      const existingDocuments = JSON.parse(localStorage.getItem(`notes_${userId}`) || "[]");
      const newDocument = {
        id: savedDocument.id, 
        title: savedDocument.title,
        content: savedDocument.content,
        createdAt: savedDocument.createdAt,
      };
  
      localStorage.setItem(
        `notes_${userId}`,
        JSON.stringify([newDocument, ...existingDocuments])
      );
  
      console.log("Document saved and synced with localStorage");
  
    } catch (error) {
      console.error("Error saving document:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 p-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-xl">
        <div className="bg-indigo-600 dark:bg-indigo-800 text-white p-6 rounded-t-lg">
          <h1 className="text-3xl font-semibold">Edit Notes</h1>
        </div>
        <div className="bg-indigo-600 dark:bg-indigo-800 text-white p-6 rounded-t-lg">
          <h1 className="text-3xl font-semibold">{title}</h1>
        </div>
        <div className="p-6">
          <textarea
            value={editableNotes}
            onChange={(e) => setEditableNotes(e.target.value)}
            className="w-full h-96 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
          <button
            onClick={handleSave}
            disabled={saving}
            className={`mt-4 px-6 py-2 rounded-lg ${saving ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
              } text-white`}
          >
            {saving ? "Saving..." : "Save Document"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
