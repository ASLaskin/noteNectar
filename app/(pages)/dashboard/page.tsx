"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import Notes from "./components/notes";
import Header from "@/components/header";

export default function Dashboard() {
  return (
    <div className="relative min-h-screen bg-white text-black">
      <Header />

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
