"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

const EditPage: React.FC = () => {
  const searchParams = useSearchParams();
  const notes = searchParams.get("notes") || "";
  const [editableNotes, setEditableNotes] = useState(notes);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 p-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-xl">
        <div className="bg-indigo-600 dark:bg-indigo-800 text-white p-6 rounded-t-lg">
          <h1 className="text-3xl font-semibold">Edit Notes</h1>
        </div>
        <div className="p-6">
          <textarea
            value={editableNotes}
            onChange={(e) => setEditableNotes(e.target.value)}
            className="w-full h-96 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>
      </div>
    </div>
  );
};

export default EditPage;
