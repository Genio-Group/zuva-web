"use client";

import Header from "@/components/Header";
import Image from "next/image";
import Footer from "@/components/Footer";
import { DrawCircleText } from "@/components/TitleTextEffect";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

export default function Home() {
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
        <section className="px-8 relative flex flex-col items-center justify-start pt-32 md:pt-64 min-h-screen text-center overflow-hidden">
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
            <motion.div variants={itemVariants}>
              <DrawCircleText />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="mt-4 text-md md:text-lg"
            >
              Zuva is a social mining network where your influence determines your earning power.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Link
                href=""
                className="mt-6 font-bold rounded-full border-b-3 border-neutral-500 bg-neutral-200 px-12 py-3 text-md md:text-lg text-black hover:bg-neutral-300 transition-colors inline-block"
              >
                Download App
              </Link>
            </motion.div>
          </motion.div>
        </section>

        <section className="mx-auto py-24 flex flex-col md:flex-row px-8 md:px-32 gap-8" id="story">
          <motion.div
            className="md:w-[50%]"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h1 className="text-yellow-500 text-3xl md:text-4xl">
              Why Zuva Network
            </h1>
            <p className="pt-4">
              The world is becoming increasingly digital, yet access to wealth creation and financial opportunity remains uneven.
              Millions of people across Africa are still underserved by traditional financial systems, face unstable local currencies,
              and have limited access to global digital services. As technology continues to shape the future, there is a growing need
              for solutions that are simple, inclusive, and built for everyday people.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Image src="" alt="Zuva Network image" width={100} height={100} className="w-64 h-64" />
          </motion.div>
        </section>

        <section className="bg-gradient-to-b from-neutral-900 to-transparent px-4 md:px-32 py-16 gap-8 flex flex-col items-center">
          <motion.div
            className="border-neutral-700 border-2 rounded-2xl p-5 flex flex-col md:flex-row md:gap-16 md:items-center md:justify-between"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(250, 204, 21, 0.1)" }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="mb-4">
              <h1 className="text-yellow-500 text-2xl">Mobile Based Mining</h1>
              <p>Mine directly from your smartphone with optimized performance and efficient battery usage. Earn rewards anytime, anywhere.</p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Image src="/images/mine-screen.png" alt="Mine Screen" width={500} height={500} className="w-86 h-auto rounded-2xl" />
            </motion.div>
          </motion.div>

          <motion.div
            className="border-neutral-700 border-2 rounded-2xl p-5 flex flex-col md:flex-row-reverse md:gap-16 md:items-center md:justify-between"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(250, 204, 21, 0.1)" }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="mb-4">
              <h1 className="text-yellow-500 text-2xl">For the Community</h1>
              <p>Join a community-driven network where transparency and fairness matter. Participate in decentralized mining together.</p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Image src="/images/hub screen.png" alt="Mine Screen" width={500} height={500} className="w-86 h-auto rounded-2xl" />
            </motion.div>
          </motion.div>

          <motion.div
            className="border-neutral-700 border-2 rounded-2xl p-5 flex flex-col md:flex-row-reverse md:gap-16 md:items-center md:justify-between"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(250, 204, 21, 0.1)" }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="mb-4">
              <h1 className="text-yellow-500 text-2xl">Built on the open economy</h1>
              <p>Open-source and fully transparent with no hidden fees. Complete visibility into how your rewards are calculated.</p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Image src="/images/open-economy.png" alt="Mine Screen" width={500} height={500} className="w-86 h-auto" />
            </motion.div>
          </motion.div>

          <motion.div
            className="border-neutral-700 border-2 rounded-2xl p-5 flex flex-col md:flex-row-reverse md:gap-16 md:items-center md:justify-between"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(250, 204, 21, 0.1)" }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="mb-4">
              <h1 className="text-yellow-500 text-2xl">Store of Value. Medium of Exchange</h1>
              <p>Earn tokens that work as both a stable store of value and practical medium of exchange across integrated platforms.</p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Image src="/images/medium-of-exchange.png" alt="Mine Screen" width={500} height={500} className="bg-black w-86 h-auto" />
            </motion.div>
          </motion.div>

        </section>


        <section className="border-t border-yellow-400 grid grid-cols-1 md:grid-cols-2 px-8 md:px-32 py-16 gap-8 items-center">
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
              <span className="text-yellow-400 text-4xl md:text-6xl">
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
              Zuva Network isn't just an app; it's a movement. Connect with
              millions of users worldwide, build your mining circle, and secure
              your financial future, all from the palm of your hand. No
              expensive hardware, no battery drain, just pure potential.
            </motion.p>
            <motion.button
              className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              Start Mining
            </motion.button>
          </motion.div>
          <motion.div
            className="flex-1 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              className="relative w-full max-w-md aspect-[4/4] h-96"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src="/images/mine-screen-mock.png"
                alt="App Interface"
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 400px, (min-width: 768px) 320px, 260px"
                priority
              />
            </motion.div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
