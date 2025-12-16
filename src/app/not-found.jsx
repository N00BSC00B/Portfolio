"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Zap, Search } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { GlassmorphismCard } from "@/components/ui/GlassmorphismCard";

const NotFound = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Modern Background Effects */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.3, 0.5, 0.3],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.sin(i) * 30, 0],
              opacity: [0.1, 0.6, 0.1],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          >
            <div className="w-1 h-1 bg-primary/40 rounded-full" />
          </motion.div>
        ))}
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="flex flex-col items-center justify-center text-center px-4 py-16 relative z-10 min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Animated 404 */}
          <motion.div
            className="relative"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent relative">
              404
            </h1>

            {/* Glitch Effect Overlay */}
            <motion.div
              animate={{
                x: [0, -2, 2, 0],
                opacity: [0, 0.5, 0.5, 0],
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "linear",
              }}
              className="absolute inset-0 text-8xl md:text-9xl font-bold text-primary/50"
            >
              404
            </motion.div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-4"
          >
            <GlassmorphismCard className="p-8 max-w-2xl">
              <div className="flex items-center justify-center mb-4">
                <Search className="w-12 h-12 text-orange-500 animate-pulse" />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Oops! Page Not Found
              </h2>

              <p className="text-justify text-lg text-muted-foreground mb-6">
                The page you&apos;re looking for seems to have vanished into the
                digital void. Don&apos;t worry though, even the best explorers
                sometimes take a wrong turn!
              </p>

              <div className="text-left text-sm text-muted-foreground">
                <p>• The URL might be misspelled</p>
                <p>• The page might have been moved or deleted</p>
                <p>• You might have clicked on a broken link</p>
              </div>
            </GlassmorphismCard>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* Home Button */}
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/"
                className="group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary to-purple-600 rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/25"
              >
                <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="relative z-10">Return Home</span>

                {/* Animated Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </Link>
            </motion.div>

            {/* Back Button */}
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                onClick={() =>
                  typeof window !== "undefined" && window.history.back()
                }
                className="group inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold border-2 border-primary/50 text-primary rounded-full hover:bg-primary/10 hover:border-primary transition-all duration-300"
              >
                <ArrowLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Go Back
              </button>
            </motion.div>
          </motion.div>

          {/* Fun Fact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-12"
          >
            <GlassmorphismCard className="p-6 max-w-md mx-auto">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-semibold text-primary">
                  Did you know?
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                The HTTP 404 error was named after room &quot;404&quot; at CERN
                where the web was invented. The room didn&apos;t exist, just
                like this page!
              </p>
            </GlassmorphismCard>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${15 + i * 20}%`,
                top: `${20 + i * 15}%`,
              }}
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "linear",
              }}
            >
              <div className="w-16 h-16 border border-primary/20 rounded-lg rotate-45" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
