"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import { products } from "@/service/data.js";

const filters = ["all", "android", "iphone", "laptop"];

// container animation
const gridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

// item animation
const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

export default function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("default");
  const gridRef = useRef(null);

  // FILTER
  let filteredProducts =
    filter === "all"
      ? [...products]
      : products.filter((p) => p.category === filter);

  // SORT
  if (sort === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }
  if (sort === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  const countByCategory = (cat) =>
    cat === "all"
      ? products.length
      : products.filter((p) => p.category === cat).length;

  const handleFilter = (f) => {
    setFilter(f);
    setTimeout(() => {
      gridRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 60);
  };

  return (
    <section className="min-h-screen px-6 py-24 bg-neutral-950 text-white">
      <h2 className="text-4xl font-bold text-center mb-10">Stock Product</h2>

      {/* FILTER + SORT */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-14">
        <div className="flex gap-3 flex-wrap justify-center">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => handleFilter(f)}
              className={`
                px-6 py-2 rounded-full text-sm font-semibold border transition
                ${
                  filter === f
                    ? "bg-white text-black"
                    : "border-white/20 hover:bg-white hover:text-black"
                }
              `}
            >
              {f.toUpperCase()} ({countByCategory(f)})
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="
            px-4 py-2 rounded-full text-sm
            bg-neutral-900 border border-white/20
            focus:outline-none
          "
        >
          <option value="default">Urutan Normal</option>
          <option value="low">Harga Terendah</option>
          <option value="high">Harga Tertinggi</option>
        </select>
      </div>

      {/* GRID */}
      <motion.div
        ref={gridRef}
        layout
        variants={gridVariants}
        initial="hidden"
        animate="show"
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((item) => (
            <motion.div
              key={item.name}
              layout
              variants={itemVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <ProductCard
                item={item}
                onClick={() =>
                  item.status !== "sold" && setSelectedProduct(item)
                }
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* MODAL */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
