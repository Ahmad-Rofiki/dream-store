"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const texts = [
  { text: "Barang siap pakai", color: "cyan" },
  { text: "Harga bersahabat", color: "green" },
  { text: "Fast response", color: "purple" },
  { text: "Full Garansi", color: "orange" },
  { text: "Amanah", color: "pink" },
];

const glowMap = {
  cyan: "shadow-[0_0_40px_rgba(34,211,238,0.45)] bg-cyan-400/20",
  green: "shadow-[0_0_40px_rgba(34,197,94,0.45)] bg-green-400/20",
  purple: "shadow-[0_0_40px_rgba(168,85,247,0.45)] bg-purple-400/20",
  orange: "shadow-[0_0_40px_rgba(251,146,60,0.45)] bg-orange-400/20",
  pink: "shadow-[0_0_40px_rgba(236,72,153,0.45)] bg-pink-400/20",
};

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");

  /* ===================== */
  /* TYPEWRITER + SOUND    */
  /* ===================== */
  useEffect(() => {
    let i = 0;
    const fullText = texts[index].text;
    setTyped("");


    const typing = setInterval(() => {
      setTyped(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(typing);
    }, 60);

    const timeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 2200);

    return () => {
      clearInterval(typing);
      clearTimeout(timeout);
    };
  }, [index]);

  /* ===================== */
  /* SCROLL REACTIVE       */
  /* ===================== */
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY < 150) setIndex(0);
      if (window.scrollY > 300) setIndex(2);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active = texts[index];

  return (
    <section className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center text-center px-6">
      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl sm:text-6xl font-extrabold mb-4"
      >
        Dream Store
      </motion.h1>

      {/* HIGHLIGHT */}
      <div className="h-14 mt-4 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 1.05 }}
            transition={{ duration: 0.35 }}
            className={`
              px-6 py-2 rounded-full
              border border-white/20
              backdrop-blur
              text-sm sm:text-base font-semibold
              ${glowMap[active.color]}
            `}
          >
            ✨ {typed}
            <span className="animate-pulse ml-1">|</span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* DESC */}
      <p className="text-neutral-400 max-w-xl mt-6 mb-10">
        Tempat jual HP & laptop pilihan. Stok terbatas, kondisi jujur, harga
        realistis.
      </p>

      {/* CTA */}
      <motion.a
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        href="#products"
        className="bg-white text-black px-10 py-4 rounded-full font-bold"
      >
        Lihat Stock
      </motion.a>

      <span className="absolute bottom-10 text-neutral-500 animate-bounce">
        scroll ↓
      </span>
    </section>
  );
}
