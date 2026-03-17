"use client";

import Header from "@/components/Header";
import Image from "next/image";
import { Smartphone, Zap, Layout, Gift } from "lucide-react";
import Footer from "@/components/Footer";
import { motion } from "motion/react";
import { DrawCircleText } from "@/components/TitleTextEffect";
import TokenomicsStats from "@/components/admin/TokenomicsStat";

export default function Home() {
  const heroPhrases = [
    "THE NEW ERA OF REDEMPTION IS HERE",
    "WILL YOU TAKE ACTION THIS TIME?",
  ];

  return (
    <div className="">
      <Header />
      <main className="">
        <section className="px-8 relative flex flex-col items-center justify-start pt-32 md:pt-64 min-h-screen text-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 -z-10">
            <Image
              src="/images/background-landing.png"
              alt="Background"
              fill
              className="object-cover md:object-fill"
              priority
            />
          </div>

          <div className="relative z-10 flex flex-col items-center max-w-7xl mx-auto">
            {/* <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-yellow-500">
              <div className="h-[2.5em] md:h-[2.2em] overflow-hidden flex items-center">
                <motion.div
                  className="flex flex-col"
                  animate={{ x: 50}}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  {heroPhrases.map((text) => (
                    <span
                      key={text}
                      className="block leading-tight"
                    >
                      {text}
                    </span>
                  ))}
                </motion.div>
              </div>
            </h1> */}
            <DrawCircleText />
            <p className="mt-4 text-md md:text-lg">
              Zuva Network is the place for those burned by regrets and dreams.
              It's time to build a new place.
            </p>

            <button className="mt-6 rounded-full border-b-3 border-neutral-500 bg-neutral-200 px-12 py-3 text-md md:text-lg font-medium text-black hover:bg-neutral-300 transition-colors">
              Download App
            </button>
          </div>
        </section>

        <section className="mx-auto py-24 px-8 flex flex-col md:items-center md:justify-center md:text-center mx-auto max-w-6xl">
          <h1 className="text-yellow-500 text-5xl md:text-6xl font-bold">
            Why Zuva Network
          </h1>
          <p className="mt-4 mb-8 text-md md:text-xl  flex flex-col gap-4">
            <span>In 2010, people ignored Bitcoin.</span>
            <span className="">
              In 2019, millions believed Pi would be the next opportunity.
            </span>
            <span className="text-lg md:text-2xl underline">
              Many missed both.
            </span>

            <span className="font-semibold">
              Zuva was created for the people who won’t miss again.{" "}
            </span>
          </p>

          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col items-center text-center p-6 bg-neutral-900 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-colors">
                <div className="mb-4 text-yellow-400">
                  <Smartphone size={40} />
                </div>
                <h3 className="text-xl font-bold mb-2">Mobile First Design</h3>
                <p className="text-neutral-400">One-tap Social Mining</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-neutral-900 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-colors">
                <div className="mb-4 text-yellow-400">
                  <Zap size={40} />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Computationally Effective
                </h3>
                <p className="text-neutral-400">
                  Battery-efficient mining protocol
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-neutral-900 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-colors">
                <div className="mb-4 text-yellow-400">
                  <Layout size={40} />
                </div>
                <h3 className="text-xl font-bold mb-2">User Friendly </h3>
                <p className="text-neutral-400">No hardware required</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-neutral-900 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-colors">
                <div className="mb-4 text-yellow-400">
                  <Gift size={40} />
                </div>
                <h3 className="text-xl font-bold mb-2">Rewards</h3>
                <p className="text-neutral-400">
                  Earn tokens by growing your network
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-8 md:px-16 bg-white text-black py-32">
          <h1
            className="text-neutral-600 font-bold text-4xl md:text-6xl mb-4 md:mb-8"
          >
            TOKENOMICS
          </h1>
          <div className="border-2 border-neutral-500 p-4 md:px-16 md:py-16 rounded-2xl flex flex-col md:items-center ">
           <TokenomicsStats />
          </div>
        </section>

        {/* <section className="px-8 py-32 md:px-32">
          <h1 className="text-5xl md:text-6xl">Roadmap</h1>
          <p>It will be released soon</p>
        </section> */}

        <section className="grid grid-cols-1 md:grid-cols-2 px-8 md:px-32 py-16 gap-8 items-center">
          <div className="flex-1 text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Experience the New Chance of{" "}
              <span className="text-yellow-400 text-4xl md:text-6xl">
                Social Mining
              </span>
            </h2>
            <p className="text-lg text-neutral-300 mb-8 leading-relaxed">
              Zuva Network isn't just an app; it's a movement. Connect with
              millions of users worldwide, build your mining circle, and secure
              your financial future, all from the palm of your hand. No
              expensive hardware, no battery drain, just pure potential.
            </p>
            <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-colors">
              Get Started Now
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-[4/4] rounded-2xl border-2 border-neutral-700 overflow-hidden">
              <Image
                src="/images/zuva-shotb.png"
                alt="App Interface"
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 400px, (min-width: 768px) 320px, 260px"
                priority
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
