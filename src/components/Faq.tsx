"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
      question: "What is Zuva Network?",
      answer:
        "Zuva Network is a mobile-first digital currency and mining platform built for Africa. It enables anyone with a smartphone to mine ZUVA tokens effortlessly with virtually zero battery drain or data usage. Our goal is to create financial inclusion and shared prosperity across the continent through fair, accessible, and sustainable mining.",
    },
    {
      question: "How does mining work?",
      answer:
        "Every day, the network releases a fixed amount of ZUVA tokens that are automatically distributed among all active miners based on their mining power. Simply open the app, start a mining session, and your share is credited to your balance in real-time. The process runs efficiently on the network side, so your phone stays cool and light on resources.",
    },
    {
      question: "Is mining free?",
      answer:
        "Yes, mining ZUVA is completely free. There are no hidden fees, electricity costs, or hardware requirements. All you need is the Zuva app and an active internet connection to start mining sessions.",
    },
    {
      question: "How do referrals boost my mining rate?",
      answer:
        "Each active referral permanently increases your mining rate by 5% (up to a generous maximum). The more friends you invite using your unique referral code, the faster you earn. Your referrals also benefit, creating a win-win community growth system.",
    },
    {
      question: "What is the total supply of ZUVA?",
      answer:
        "ZUVA does not have a hard-capped supply at this stage. The final total supply will be determined before the Token Generation Event (TGE) to ensure smooth migration of all mined balances and sustainable tokenomics.",
    },
    {
      question: "When can I withdraw my tokens?",
      answer:
        "Withdrawals and on-chain transfers will become available at Mainnet launch / TGE. Until then, all your mined ZUVA is securely recorded in your in-app balance and will be fully migrated to the blockchain.",
    },
    {
      question: "Is Zuva Network safe and secure?",
      answer:
        "Yes. We prioritize security with industry-standard practices including encrypted data, secure authentication, and regular audits. Your mined tokens are safely stored on our servers until Mainnet, and we never ask for your private keys or seed phrases.",
    },
    {
      question: "How do I get started with Zuva?",
      answer:
        "Download the Zuva app from the Google Play Store, create an account, and start mining immediately. Use a referral code during signup for an instant mining rate boost. No KYC is required at this early stage.",
    },
  ];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative bg-gradient-to-tr from-black to-neutral-800/80 overflow-hidden" id="faq">
      <div className="relative z-10 py-24 px-8 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl text-yellow-500">
            Frequently Asked Questions
          </h1>
          <p className="pt-4 text-gray-400">
            Everything you need to know about Zuva and mining.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.question}
                variants={itemVariants}
                className="rounded-2xl border border-gray-800 bg-black/60 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer"
                >
                  <span className="font-medium text-white md:text-lg">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-yellow-500 text-2xl leading-none shrink-0"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-5 pb-5 text-gray-400">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
