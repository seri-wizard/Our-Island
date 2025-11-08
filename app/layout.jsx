export const metadata = { title: "OurIsland.ie", description: "Keep the craic alive." };

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
