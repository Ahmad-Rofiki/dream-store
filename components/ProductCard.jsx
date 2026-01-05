"use client";

export default function ProductCard({ item, onClick }) {
  const isSold = item.status === "sold";

  return (
    <div
      onClick={!isSold ? onClick : undefined}
      className={`
        bg-neutral-900 rounded-3xl overflow-hidden
        ${isSold ? "cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      <img
        src={`${item.thumbnail}?auto=format&fit=crop&w=600&q=70`}
        className={`h-64 w-full object-cover ${
          isSold ? "blur-sm grayscale opacity-60" : ""
        }`}
      />

      <div className="p-5">
        <h3 className="font-bold text-lg">{item.name}</h3>
        <p className="text-sm text-neutral-400">{item.spec}</p>
        <p className="mt-3 font-semibold">
          Rp {item.price.toLocaleString("id-ID")}
        </p>

        <span
          className={`inline-block mt-3 px-3 py-1 text-xs rounded-full
          ${isSold ? "bg-red-600" : "bg-green-500 text-black"}`}
        >
          {item.status.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
