"use client";

import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Grid } from "react-loader-spinner";
import RichTextEditor from "./components/editor";

const EditPage: React.FC = () => {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const initialContent = searchParams.get("notes") || "";
  const title = searchParams.get("title") || "Untitled Document";
  const [editableNotes, setEditableNotes] = useState(initialContent);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status]);

  const handleSave = async () => {
    const userId = session?.user?.id;

    if (!userId) {
      console.error("User ID is not available");
      return;
    }

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

      const existingDocuments = JSON.parse(
        localStorage.getItem(`notes_${userId}`) || "[]"
      );
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

  if (loading || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Grid
          visible={true}
          height="80"
          width="80"
          color="#4f46e5"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass="grid-wrapper"
        />
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
              initialContent={editableNotes}
              onChange={(content) => setEditableNotes(content)}
            />
            <button
              onClick={handleSave}
              disabled={saving}
              className={`mt-6 px-8 py-3 rounded-full text-lg font-semibold ${saving
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 transition"
                } text-white`}
            >
              {saving ? "Saving..." : "Save Document"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
