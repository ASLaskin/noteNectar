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

  const handleDelete = async (noteId: string) => {
    console.log("Sending noteId:", noteId);
  
    try {
      const body = JSON.stringify({ noteId });
  
      const response = await fetch(`/api/documents/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body,
      });
  
      if (!response.ok) {
        const error = await response.json();
        console.error("Delete API error:", error.message);
        throw new Error(error.message || "Failed to delete the note");
      }
  
      console.log(`Note with ID: ${noteId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };
  

  if (isFetching) {
    return <p className="text-white/60">Loading notes...</p>;
  }

  if (notes.length === 0) {
    return <p className="text-white/60">No notes available.</p>;
  }

  const handleNoteClick = (note: Note) => {
    router.push(`/edit?notes=${encodeURIComponent(note.content)}&title=${encodeURIComponent(note.title)}`);
  };

  return (
    <div>
      {notes.map((note) => (
        <motion.div
          key={note.id}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="grid grid-cols-[1fr,auto,auto,auto,auto] gap-4 py-2 border-t border-white/10 items-center"
        >
          <a
            onClick={() => handleNoteClick(note)}
            className="text-white cursor-pointer"
          >
            {note.title}
          </a>
          <div className="text-white/60">{new Date(note.createdAt).toLocaleDateString()}</div>
          <Button size="icon" variant="ghost" className="hover:text-[#FACC15]">
            <Download className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="hover:text-red-500"
            onClick={() => handleDelete(note.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" className="hover:text-white/90">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Rename</DropdownMenuItem>
              <DropdownMenuItem>Move</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>
      ))}
    </div>
  );
}
