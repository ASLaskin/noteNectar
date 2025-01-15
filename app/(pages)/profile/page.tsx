"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Header from "@/components/header";
import { useSession } from "next-auth/react";
import { Grid } from 'react-loader-spinner'

interface UserData {
    credits: number;
    plan: string;
    nextCharge: string;
    status: string;
}

export default function ProfilePage() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "loading" || !session) {
            setLoading(true);
            return;
        }

        const fetchUserData = async () => {
            const userId = session?.user?.id;
            console.log("The User we have: ", userId);

            try {
                setLoading(true);
                const response = await fetch(`/api/user-data?userId=${encodeURIComponent(userId)}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.statusText}`);
                }
                const data = await response.json();
                setUserData(data);
            } catch (err: any) {
                setError(err.message || "An error occurred while fetching user data.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [session, status]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Grid
                    visible={true}
                    height="80"
                    width="80"
                    color="#4f46e5"
                    ariaLabel="grid-loading"
                    radius="12.5"
                    wrapperStyle={{}}
                    wrapperClass="grid-wrapper"
                />

            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-700">No user data found.</p>
            </div>
        );
    }

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
                                <span className="font-semibold">Status:</span> {userData.status}
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
