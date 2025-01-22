"use client";

import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { RotatingSquare } from "react-loader-spinner";
import RichTextEditor from "./components/editor";

const EditPage: React.FC = () => {
  const searchParams = useSearchParams();
  const { data: session, status } = useSession(); // Track session status
  const noteId = searchParams.get("id") || ""; // Get note ID from query params
  const title = searchParams.get("title") || "Untitled Document";

  const [editableNotes, setEditableNotes] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
      return;
    }

    if (!noteId || !session?.user?.id) {
      console.error("Missing noteId or userId");
      setLoading(false);
      return;
    }

    const userId = session.user.id;
    const storedNotes = localStorage.getItem(`notes_${userId}`);
    if (storedNotes) {
      const notesArray = JSON.parse(storedNotes);
      const currentNote = notesArray.find((note: any) => note.id === noteId);

      if (currentNote) {
        setEditableNotes(currentNote.content || "");
      } else {
        console.error("Note not found in local storage");
        setEditableNotes("");
      }
    } else {
      console.error("No notes found in local storage");
      setEditableNotes("");
    }

    setLoading(false);
  }, [noteId, session?.user?.id, status]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <RotatingSquare
          visible={true}
          height="80"
          width="80"
          color="#4f46e5"
          ariaLabel="loading-indicator"
        />
        <p className="text-gray-700 ml-4">Loading...</p>
      </div>
    );
  }

  if (editableNotes === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500">Failed to load document. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8">
            <h1 className="text-4xl font-bold">{title}</h1>
          </div>
          <div className="p-6">
            <RichTextEditor
              noteId={noteId}
              initialContent={editableNotes}
              title={title}
              userId={session?.user?.id}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
