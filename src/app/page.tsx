"use client";

import Header from "@/components/Header";
import Image from "next/image";
import { Smartphone, Zap, Layout, Gift } from "lucide-react";
import Footer from "@/components/Footer";
import { motion } from "motion/react";
import { DrawCircleText } from "@/components/TitleTextEffect";
import TokenomicsStats from "@/components/TokenomicsStat";
import MiningRateCalculator from "@/components/MiningMechanism";

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
              Zuva is a social mining network where your influence determines your earning power.
            </p>

            <button className="mt-6 rounded-full border-b-3 border-neutral-500 bg-neutral-200 px-12 py-3 text-md md:text-lg font-medium text-black hover:bg-neutral-300 transition-colors">
              Start Mining Now
            </button>
          </div>
        </section>

        <section className="mx-auto py-24 flex flex-col md:flex-row px-8 md:px-32 gap-8" id="story">
          <div className="md:w-[50%]">
            <h1 className="text-yellow-500 text-3xl md:text-4xl">
              Why Zuva Network
            </h1>
            <p className="pt-4">
              The world is becoming increasingly digital, yet access to wealth creation and financial opportunity remains uneven.
              Millions of people across Africa are still underserved by traditional financial systems, face unstable local currencies,
              and have limited access to global digital services. As technology continues to shape the future, there is a growing need
              for solutions that are simple, inclusive, and built for everyday people.
            </p>
          </div>
          <Image src="" alt="Zuva Network image" width={100} height={100} className="w-64 h-64" />


        </section>

        <section className="px-4 md:px-32 py-16 gap-16 flex flex-col items-center">
          <div className="border-neutral-700 border-2 rounded-2xl p-5 flex flex-col md:flex-row md:gap-16 md:items-center md:justify-between">
            <div className="mb-4">
              <h2 className="font-bold text-yellow-500 text-2xl">Mobile Based Mining</h2>
              <p>Built for easy access through mobile devices. Efficient battery usages</p>
            </div>
            <Image src="/images/mine screen.png" alt="Mine Screen" width={500} height={500} className="w-86 h-auto" />
          </div>

          <div className="border-neutral-700 border-2 rounded-2xl p-5 flex flex-col md:flex-row-reverse md:gap-16 md:items-center md:justify-between">
            <div className="mb-4">
              <h2 className="font-bold text-yellow-500 text-2xl">For the Community</h2>
              <p>Built for easy access through mobile devices. Efficient battery usages</p>
            </div>
            <Image src="/images/hub-screen-new.png" alt="Mine Screen" width={500} height={500} className="w-86 h-auto" />
          </div>

          <div className="border-neutral-700 border-2 rounded-2xl p-5 flex flex-col md:flex-row-reverse md:gap-16 md:items-center md:justify-between">
            <div className="mb-4">
              <h2 className="font-bold text-yellow-500 text-2xl">Built on the open economy</h2>
              <p>Built for easy access through mobile devices. Efficient battery usages</p>
            </div>
            <Image src="/images/hub-screen-new.png" alt="Mine Screen" width={500} height={500} className="w-86 h-auto" />
          </div>

          <div className="border-neutral-700 border-2 rounded-2xl p-5 flex flex-col md:flex-row-reverse md:gap-16 md:items-center md:justify-between">
            <div className="mb-4">
              <h2 className="font-bold text-yellow-500 text-2xl">Store of Value. Medium of Exchange</h2>
              <p>Built for easy access through mobile devices. Efficient battery usages</p>
            </div>
            <Image src="/images/hub-screen-new.png" alt="Mine Screen" width={500} height={500} className="w-86 h-auto" />
          </div>

        </section>


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
              Start Mining
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
