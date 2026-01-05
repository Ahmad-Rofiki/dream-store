"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  // ✅ AMAN: pakai images[] → fallback ke thumbnail
  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : product.thumbnail
      ? [product.thumbnail]
      : [];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0); // reset slider tiap buka modal
  }, [product]);

  const next = () => {
    setIndex((i) => (i + 1) % images.length);
  };

  const prev = () => {
    setIndex((i) => (i - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* BACKDROP */}
        <div
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* MODAL */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="relative z-10 bg-neutral-900 text-white rounded-3xl overflow-hidden max-w-lg w-full"
        >
          {/* IMAGE / SLIDER */}
          <div className="relative w-full h-60 bg-neutral-800">
            {images.length > 0 && (
              <img
                src={`${images[index]}?auto=format&fit=crop&w=900&q=80`}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            )}

            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black px-3 py-1 rounded-full"
                >
                  ‹
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black px-3 py-1 rounded-full"
                >
                  ›
                </button>
              </>
            )}
          </div>

          {/* CONTENT */}
          <div className="p-6">
            <h3 className="text-2xl font-bold mb-1">{product.name}</h3>
            <p className="text-neutral-400 mb-3">{product.spec}</p>

            <p className="text-sm text-neutral-300 leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="flex gap-3">
              <a
                href={`https://wa.me/628123456789?text=Saya tertarik dengan ${product.name}`}
                target="_blank"
                className="flex-1 bg-green-500 hover:bg-green-400 text-black py-3 rounded-full text-center font-bold"
              >
                Chat WhatsApp
              </a>

              <button
                onClick={onClose}
                className="px-6 py-3 rounded-full border border-white/20 hover:bg-white/10"
              >
                Tutup
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
