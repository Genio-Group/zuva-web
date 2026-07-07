"use client";

import { useState, useRef } from "react";
import Header from "@/components/Header";
import Image from "next/image";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import toast from "react-hot-toast";

export default function Home() {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const handlePlayStoreClick = () => {
    toast.success("Available by 12-07-2026");
  };

  const handleAppStoreClick = () => {
    toast.success("Launch date on iOS will be announced");
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;

    setRotateX(-(y / centerY) * 15);
    setRotateY((x / centerX) * 15);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <div className="">
      <Header />
      <main className="">
        <section className="px-8 relative flex flex-col items-center justify-start pt-32 md:pt-32 min-h-screen text-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 -z-10">
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-full h-full"
            >
              <Image
                src="/images/background-landing.png"
                alt="Background"
                fill
                className="object-cover md:object-fill"
                priority
              />
            </motion.div>
          </div>

          <motion.div
            className="relative z-10 flex flex-col items-center max-w-7xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="max-w-4xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                className="text-4xl md:text-5xl leading-tight mb-8 tracking-tight"
              >
                {/* First line with gradient effect */}
                <motion.span
                  className="block mb-4"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <span className="bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
                    The New Digital
                  </span>
                </motion.span>

                {/* Second line with more dramatic styling */}
                <motion.span
                  className="block mb-4"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                >
                  <span className="text-white">Currency Built On</span>
                </motion.span>

                {/* Highlight line with full effects */}
                <motion.span
                  className="block relative inline-block"
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                  {/* Background glow effect */}
                  <motion.div
                    className="absolute -inset-4 bg-gradient-to-r from-yellow-400/40 via-yellow-500/40 to-yellow-400/40 rounded-2xl blur-2xl -z-10"
                    animate={{
                      opacity: [0.4, 0.8, 0.4],
                      scale: [0.95, 1.1, 0.95],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Main text with gradient */}
                  <span className="relative bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-300 bg-clip-text text-transparent  drop-shadow-lg">
                    The Open Economy
                  </span>

                  {/* Subtle shimmer effect */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      x: [-100, 500],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.span>
              </motion.h1>

      
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="mt-4 text-md md:text-lg pb-4"
            >
              Mine ZUVA to become part of the drivers of the new open digital currency.
            </motion.p>

            <motion.div variants={itemVariants} className="flex items-center justify-between gap-4">
              <motion.button
                onClick={handlePlayStoreClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer transition-transform"
              >
                <Image src="/images/playstore-logo.png" alt="Google Play Store logo" width={500} height={500} className="w-auto h-12" />
              </motion.button>
              <motion.button
                onClick={handleAppStoreClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer transition-transform"
              >
                <Image src="/images/applestore-logo.png" alt="Apple App Store logo" width={500} height={500} className="w-auto h-12" />
              </motion.button>
            </motion.div>

          </motion.div>
        </section>

        <section className="relative bg-gradient-to-br from-black via-neutral-950 to-black overflow-hidden" id="story">
          {/* Subtle animated background */}
          <div className="absolute inset-0">
            {/* Single subtle glow */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-3xl"
              animate={{
                opacity: [0.1, 0.2, 0.1],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                background: "radial-gradient(circle, rgba(250, 204, 21, 0.1) 0%, transparent 70%)",
              }}
            />
          </div>
          <div className="relative z-10 py-24 flex flex-col md:flex-row md:items-center gap-8 md:gap-16 px-8 mx-auto max-w-7xl">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h1 className="text-yellow-500 text-3xl md:text-4xl">
              The Story
            </h1>
            <p className="pt-4">
              The world is becoming increasingly digital, yet access to wealth creation and financial opportunity remains uneven.
              Millions of people across Africa are still underserved by traditional financial systems, face unstable local currencies,
              and have limited access to global digital services. As technology continues to shape the future, there is a growing need
              for solutions that are simple, inclusive, and built for everyday people.
            </p>
          </motion.div>
          <motion.div
            className="flex-1 flex items-center justify-center relative"
          >
            {/* Logo container with 3D and floating effect */}
            <motion.div
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                perspective: 1000,
                transformStyle: "preserve-3d",
              }}
              animate={{
                rotateX,
                rotateY,
                y: [0, -15, 0],
              }}
              transition={{
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotateX: { type: "spring", stiffness: 300, damping: 30 },
                rotateY: { type: "spring", stiffness: 300, damping: 30 },
              }}
              className="relative z-10"
            >
              <Image
                src="/images/logo-animate.png"
                alt="zuva logo animation"
                width={300}
                height={300}
                className="w-64 h-64 object-cover rounded-2xl flex items-center justify-center shadow-2xl"
                style={{ transformStyle: "preserve-3d" }}
              />
            </motion.div>
          </motion.div>
          </div>

        </section>

        <section className="bg-gradient-to-b from-neutral-900 to-transparent ">
          <div className="px-8 md:px-32 py-16 gap-8 flex flex-col items-center mx-auto max-w-7xl">
          <motion.div
            className="border-neutral-700 border-2 rounded-2xl p-8 flex flex-col md:flex-row md:gap-12 md:items-center md:justify-center lg:gap-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(250, 204, 21, 0.1)" }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="mb-4 md:mb-0 md:flex-1">
              <h1 className="text-yellow-500 text-2xl">Mobile Based Mining</h1>
              <p>Mine directly from your smartphone with optimized performance and efficient battery usage. Earn rewards anytime, anywhere.</p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="md:flex-1 flex justify-center"
            >
              <Image src="/images/mine-screen.png" alt="Mine Screen" width={500} height={500} className="w-full md:max-w-sm lg:max-w-md h-auto rounded-2xl" />
            </motion.div>
          </motion.div>

          <motion.div
            className="border-neutral-700 border-2 rounded-2xl p-8 flex flex-col md:flex-row-reverse md:gap-12 md:items-center md:justify-center lg:gap-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(250, 204, 21, 0.1)" }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="mb-4 md:mb-0 md:flex-1">
              <h1 className="text-yellow-500 text-2xl">For the Community</h1>
              <p>Join a community-driven network where transparency and fairness matter. Participate in decentralized mining together.</p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="md:flex-1 flex justify-center"
            >
              <Image src="/images/hub screen.png" alt="Mine Screen" width={500} height={500} className="w-full md:max-w-sm lg:max-w-md h-auto rounded-2xl" />
            </motion.div>
          </motion.div>

          <motion.div
            className="border-neutral-700 border-2 rounded-2xl p-8 flex flex-col md:flex-row-reverse md:gap-12 md:items-center md:justify-center lg:gap-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(250, 204, 21, 0.1)" }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="mb-4 md:mb-0 md:flex-1">
              <h1 className="text-yellow-500 text-2xl">Built on the open economy</h1>
              <p>Open-source and fully transparent with no hidden fees. Complete visibility into how your rewards are calculated.</p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="md:flex-1 flex justify-center"
            >
              <Image src="/images/open-economy.png" alt="Mine Screen" width={500} height={500} className="w-full md:max-w-sm lg:max-w-md h-auto rounded-2xl" />
            </motion.div>
          </motion.div>

          <motion.div
            className="border-neutral-700 border-2 rounded-2xl p-8 flex flex-col md:flex-row md:gap-12 md:items-center md:justify-center lg:gap-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(250, 204, 21, 0.1)" }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="mb-4 md:mb-0 md:flex-1">
              <h1 className="text-yellow-500 text-2xl">Store of Value. Medium of Exchange</h1>
              <p>Earn tokens that work as both a stable store of value and practical medium of exchange across integrated platforms.</p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="md:flex-1 flex justify-center"
            >
              <Image src="/images/medium-of-exchange.png" alt="Mine Screen" width={500} height={500} className="w-full md:max-w-sm lg:max-w-md h-auto rounded-2xl bg-black" />
            </motion.div>
          </motion.div>
          </div>

        </section>


        <section className="border-t border-yellow-400 ">
          <div className="grid grid-cols-1 md:grid-cols-2 px-8 md:px-32 py-16 gap-8 items-center mx-auto max-w-7xl">
          <motion.div
            className="flex-1 text-left"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h1
              className="text-3xl md:text-5xl mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Experience the New Chance of{" "}
              <span className="text-yellow-400 text-4xl md:text-5xl">
                Social Mining
              </span>
            </motion.h1>
            <motion.p
              className="text-lg text-neutral-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Zuva Network isn't just a mining app, it's a movement.
              A fresh opportunity for everyone who missed the early crypto waves. By simply mining ZUVA on your phone (even while it sits idle), you become one of the earliest adopters of a new digital currency built for pan-African wealth and unity.
              Start mining today and secure your piece of tomorrow.
            </motion.p>
            <motion.button
              onClick={handlePlayStoreClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer transition-transform"
            >
              <Image src="/images/playstore-logo.png" alt="Google Play Store logo" width={500} height={500} className="w-auto h-12" />
            </motion.button>
            <motion.button
              onClick={handleAppStoreClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer transition-transform"
            >
              <Image src="/images/applestore-logo.png" alt="Apple App Store logo" width={500} height={500} className="w-auto h-12" />
            </motion.button>
          </motion.div>
          <motion.div
            className="flex-1 flex items-end justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="relative w-full max-w-2xl"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src="/images/mine-screen-mockk.png"
                alt="App Interface"
                width={600}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />
            </motion.div>
          </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
