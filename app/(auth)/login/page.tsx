"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // 👈 for redirect

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // simulate login request
    setTimeout(() => {
      setLoading(false);
      alert("✅ Logged in (mock)");

      // 👇 Redirect to dashboard or home
      router.push("/onboarding");
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">Welcome Back</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <Input type="email" placeholder="Email" required />
        <Input type="password" placeholder="Password" required />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
      <p className="text-sm text-center text-gray-500 mt-4">
        Don’t have an account?{" "}
        <Link href="/register" className="text-indigo-600 hover:underline">
          Register
        </Link>
      </p>
    </motion.div>
  );
}
