import "./globals.css";

export const metadata = {
  title: "Dream Store",
  description: "Jual beli HP & laptop bekas terpercaya",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-neutral-950 text-white">{children}</body>
    </html>
  );
}
