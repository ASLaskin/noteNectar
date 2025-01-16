"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Header from "@/components/header";
import { useSession } from "next-auth/react";

const Notes = dynamic(() => import("./components/notes"), { ssr: false });

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null; 
  }

  return (
    <div className="relative min-h-screen bg-white text-black">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <motion.h1
            className="text-3xl font-bold"
            initial={false}
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
              <Button className="bg-primary text-white font-semibold shadow-md hover:bg-primary-dark bg-indigo-600 hover:bg-indigo-700 transition">
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
