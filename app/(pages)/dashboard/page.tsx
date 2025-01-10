"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import Notes from "./components/notes";
import { signOut } from 'next-auth/react';
import Image from 'next/image';

export default function Dashboard() {
  const handleLogout = () => {
    signOut({
      redirect: true,
      callbackUrl: '/', 
    });
  };

  return (
    <div className="relative min-h-screen bg-white text-black">
      <header className="border-b border-gray-300">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center">
            <Image src="./logo.svg" alt='logo' width={60} height={60} />
            <span className="ml-2 text-2xl font-bold">NoteNectar</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button className="px-3 py-2 rounded-full text-black hover:bg-gray-200 transition duration-300">
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
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <motion.h1
            className="text-3xl font-bold"
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
              <Button className="bg-primary text-white font-semibold shadow-md hover:bg-primary-dark transition">
                Create New
              </Button>
            </motion.div>
          </Link>
        </div>

        <Card className="bg-white shadow-md border border-gray-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Stored Notes
            </CardTitle>
          </CardHeader>
          <Notes />
        </Card>
      </main>
    </div>
  );
}
