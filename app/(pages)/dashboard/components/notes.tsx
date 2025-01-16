"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Trash2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { RotatingSquare } from "react-loader-spinner";

type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export default function Notes() {
  const { data: session } = useSession();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const router = useRouter();

  useEffect(() => {
    const userId = session?.user?.id;
    const fetchNotes = async () => {
      if (!userId) {
        console.error("User ID is missing.");
        return;
      }

      const cachedNotes = localStorage.getItem(`notes_${userId}`);
      if (cachedNotes) {
        setNotes(JSON.parse(cachedNotes));
        setIsFetching(false);
        return;
      }

      try {
        const response = await fetch(`/api/documents/getByUser?userId=${userId}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }

        const data: Note[] = await response.json();
        setNotes(data);
        localStorage.setItem(`notes_${userId}`, JSON.stringify(data));
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchNotes();
  }, [session?.user?.id]);

  const handleRename = async (noteId: string, newTitle: string) => {
    try {
      const response = await fetch(`/api/documents/rename`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noteId, newTitle }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to rename the note");
      }

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === noteId ? { ...note, title: newTitle } : note
        )
      );

      const userId = session?.user?.id;
      if (userId) {
        const updatedNotes = notes.map((note) =>
          note.id === noteId ? { ...note, title: newTitle } : note
        );
        localStorage.setItem(`notes_${userId}`, JSON.stringify(updatedNotes));
      }

      toast.success("Note renamed successfully");
    } catch (error) {
      console.error("Error renaming note:", error);
      toast.error("Failed to rename note");
    }
  };

  const handleDelete = async (noteId: string) => {
    try {
      const response = await fetch(`/api/documents/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noteId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to delete the note");
      }

      setNotes((prevNotes) =>
        prevNotes.filter((note) => note.id !== noteId)
      );

      const userId = session?.user?.id;
      if (userId) {
        const updatedNotes = notes.filter((note) => note.id !== noteId);
        localStorage.setItem(`notes_${userId}`, JSON.stringify(updatedNotes));
      }

      toast.success("Note deleted successfully");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete the note");
    }
  };


  const handleBlur = async () => {
    if (editingNoteId && editedTitle.trim() !== "") {
      await handleRename(editingNoteId, editedTitle.trim());
    }
    setEditingNoteId(null);
    setEditedTitle("");
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      await handleBlur();
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center space-x-4">
        <p className="text-black/60">Loading notes...</p>
        <RotatingSquare
          visible={true}
          height="100"
          width="100"
          color="#4f46e5"
          ariaLabel="rotating-square-loading"
        />
      </div>
    );
  }

  if (notes.length === 0) {
    return <p className="flex align-center justify-center text-black/60">No notes available.</p>;
  }

  const handleNoteClick = (note: Note) => {
    router.push(`/edit?notes=${encodeURIComponent(note.content)}&title=${encodeURIComponent(note.title)}`);
  };

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <motion.div
          key={note.id}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="grid grid-cols-1 md:grid-cols-[1fr,auto,auto,auto,auto] gap-4 py-4 px-6 border-b border-white/10 items-center hover:bg-gray-800/30 rounded-md transition"
        >
          <a
            onClick={() => handleNoteClick(note)}
            className="text-black text-lg font-semibold cursor-pointer hover:underline"
          >
            {note.title}
          </a>
          <div className="text-black text-sm">{new Date(note.createdAt).toLocaleDateString()}</div>
          <Button
            size="icon"
            variant="ghost"
            className="hover:text-yellow-400 transition duration-200"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="hover:text-red-500 transition duration-200"
            onClick={() => handleDelete(note.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" className="hover:text-white/90 transition duration-200">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  setEditingNoteId(note.id);
                  setEditedTitle(note.title);
                }}
              >
                Rename
              </DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {editingNoteId === note.id && (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              autoFocus
              className="text-black text-lg font-semibold border border-gray-300 rounded-md p-2"
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}
