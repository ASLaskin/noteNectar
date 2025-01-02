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

type Note = {
  id: string;
  name: string;
  createdAt: string;
};

export default function Notes() {
  const { data: session } = useSession();
  const [notes, setNotes] = useState<Note[]>([]);
 

  useEffect(() => {
    const userId = session?.user?.id;
    const fetchNotes = async () => {
      console.log("User ID is: ", userId)
  
      if (!userId) {
        console.error("User ID is missing.");
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
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
  
    fetchNotes();
  }, []); 
  

  if (notes.length === 0) {
    return <p className="text-white/60">No notes available.</p>;
  }

  return (
    <div>
      {notes.map((note) => (
        <motion.div
          key={note.id}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="grid grid-cols-[1fr,auto,auto,auto,auto] gap-4 py-2 border-t border-white/10 items-center"
        >
          <div className="text-white">{note.name}</div>
          <div className="text-white/60">{new Date(note.createdAt).toLocaleDateString()}</div>
          <Button size="icon" variant="ghost" className="hover:text-[#FACC15]">
            <Download className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" className="hover:text-red-500">
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
