"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section className="min-h-screen bg-neutral-950 text-white flex items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold mb-6">Siap Deal?</h2>

        <p className="text-neutral-400 mb-10 max-w-md">
          Tanya stok, nego harga, atau minta video kondisi unit langsung via
          WhatsApp.
        </p>

        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          href="https://wa.me/628123456789"
          target="_blank"
          className="bg-green-500 text-black px-12 py-4 rounded-full font-bold"
        >
          Chat WhatsApp
        </motion.a>
      </motion.div>
    </section>
  );
}
