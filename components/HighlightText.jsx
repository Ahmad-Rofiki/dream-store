"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const texts = [
  "Barang siap pakai",
  "Harga bersahabat",
  "Fast response",
  "Full Garansi",
  "Amanah",
];

export default function HighlightText() {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let current = 0;
    const fullText = texts[index];

    setDisplayText("");

    const typing = setInterval(() => {
      setDisplayText(fullText.slice(0, current + 1));
      current++;
      if (current === fullText.length) clearInterval(typing);
    }, 60);

    const timeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 2200);

    return () => {
      clearInterval(typing);
      clearTimeout(timeout);
    };
  }, [index]);

  return (
    <div className="h-12 mt-6 flex justify-center items-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.05, y: -10 }}
          transition={{ duration: 0.1 }}
          className="
            px-6 py-2 rounded-full
            bg-white/10 backdrop-blur
            border border-white/20
            text-sm sm:text-base font-semibold
            text-white
            shadow-[0_0_25px_rgba(255,255,255,0.25)]
          "
        >
          <span className="relative">
            {displayText}
            <span className="animate-pulse ml-1">|</span>

            {/* glow layer */}
            <span className="absolute inset-0 blur-xl opacity-40 bg-white -z-10 rounded-full" />
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
