"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Header from "@/components/header";

export default function ProfilePage() {

    //Example Data 
    const userData = {
        credits: 120,
        plan: "Pro Plan",
        nextCharge: "2025-02-10",
        subscriptionStatus: "Active",
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-6 py-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="grid gap-6 md:grid-cols-2"
                >
                    <Card className="bg-white shadow-md rounded-lg">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">
                                Subscription Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-gray-700">
                            <p>
                                <span className="font-semibold">Plan:</span> {userData.plan}
                            </p>
                            <p>
                                <span className="font-semibold">Status:</span>{" "}
                                {userData.subscriptionStatus}
                            </p>
                            <p>
                                <span className="font-semibold">Next Charge:</span>{" "}
                                {userData.nextCharge}
                            </p>
                            <div className="mt-10">
                                <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md">
                                    Cancel Subscription
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white shadow-md rounded-lg">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Credits</CardTitle>
                        </CardHeader>
                        <CardContent className="text-gray-700">
                            <p>
                                <span className="font-semibold">Available Credits:</span>{" "}
                                {userData.credits}
                            </p>
                            <Button className="mt-4 bg-primary text-white font-semibold shadow-md hover:bg-primary-dark transition">
                                Buy More Credits
                            </Button>

                        </CardContent>
                    </Card>
                </motion.div>


            </main>
        </div>
    );
}
