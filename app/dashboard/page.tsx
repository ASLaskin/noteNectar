"use client"

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Trash2, MoreHorizontal, User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';

const notes = [
  { id: 1, name: 'Example note', date: '12/7/2024' },
  { id: 2, name: 'Meeting minutes', date: '12/8/2024' },
  { id: 3, name: 'Project ideas', date: '12/9/2024' },
];


export default function Dashboard() {
  return (
    <div className="relative min-h-screen bg-[radial-gradient(circle_at_top,rgba(125,86,244,0.8)_10%,rgba(69,23,215,0.9)_40%,#000_90%)] text-white">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <svg
              className="h-8 w-8 text-[#FACC15]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M4 1h16c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2Z" />
              <path d="M4 11h16" />
              <path d="M8 1v22" />
            </svg>
            <span className="ml-2 text-2xl font-bold drop-shadow-lg">YourDrive</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button className="px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition duration-300">
                <User className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <motion.h1
            className="text-3xl font-bold drop-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Dashboard
          </motion.h1>
          <Link href="/create">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Button className="bg-gradient-to-r from-[#FACC15] to-[#FB923C] text-black font-semibold shadow-lg hover:opacity-90">
                Create New
              </Button>
            </motion.div>
          </Link>
        </div>

        {/* Notes Section */}
        <Card className="bg-white/10 backdrop-blur-md border border-white/10 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white text-xl drop-shadow-lg">
              Stored Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-[1fr,auto,auto,auto,auto] gap-4 font-semibold mb-2 text-white/80">
              <div>Name</div>
              <div>Date</div>
              <div className="col-span-3">Actions</div>
            </div>
            {notes.map((note) => (
              <motion.div
                key={note.id}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="grid grid-cols-[1fr,auto,auto,auto,auto] gap-4 py-2 border-t border-white/10 items-center"
              >
                <div className="text-white">{note.name}</div>
                <div className="text-white/60">{note.date}</div>
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
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
