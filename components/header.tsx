"use client";

import Image from "next/image";
import { User, LogOut, BookOpen } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import Link from "next/link";

const Header: React.FC = () => {
    const handleLogout = () => {
        signOut({
            redirect: true,
            callbackUrl: "/",
        });
    };

    return (
        <header className="border-b border-gray-300">
            <div className="container mx-auto px-4 py-6 flex justify-between items-center">
                <Link href="/" className="flex items-center">
                    <Image src="/logo.svg" alt="logo" width={60} height={60} />
                    <span className="ml-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">NoteNectar</span>
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <button className="px-3 py-2 rounded-full text-black hover:bg-gray-200 transition duration-300">
                            <User className="h-5 w-5" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href="/dashboard">
                        <DropdownMenuItem >
                            <BookOpen className="mr-2 h-4 w-4 cursor-pointer" />
                            <span>Dashboard</span>
                        </DropdownMenuItem>
                        </Link>
                        <Link href="/profile">
                        <DropdownMenuItem >
                            <User className="mr-2 h-4 w-4 cursor-pointer" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4 text-red-500" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};

export default Header;
