"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import MenuBar from "./menubar";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type RichTextEditorProps = {
  noteId: string;
  initialContent: string;
  title: string;
  userId: string | undefined;
};

export default function RichTextEditor({
  noteId,
  initialContent,
  title,
  userId,
}: RichTextEditorProps) {
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState(initialContent);

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: initialContent,
    onUpdate: ({ editor }) => {
      const newContent = editor.getHTML();
      setContent(newContent);
    },
    editorProps: {
      attributes: {
        class:
          "prose max-w-full min-h-[200px] cursor-text border p-4 rounded-lg shadow-sm ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500",
      },
    },
    autofocus: "start",
  });

  const handleSave = async () => {
    if (!userId || !noteId) {
      console.error("User ID or Note ID is not available");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch("/api/documents/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          noteId,
          title,
          content,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update the document");
      }

      const updatedDocument = await response.json();

      const existingDocuments = JSON.parse(
        localStorage.getItem(`notes_${userId}`) || "[]"
      );
      const updatedDocuments = existingDocuments.map((note: any) =>
        note.id === updatedDocument.id ? updatedDocument : note
      );
      localStorage.setItem(`notes_${userId}`, JSON.stringify(updatedDocuments));

      toast.success("Document updated successfully");
    } catch (error) {
      console.error("Error updating document:", error);
      toast.error("Failed to update document");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const autoSave = setTimeout(() => {
      if (content !== initialContent) {
        handleSave();
      }
    }, 2500);

    return () => clearTimeout(autoSave);
  }, [content, initialContent]);

  return (
    <div className="w-full">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
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
  );
}
