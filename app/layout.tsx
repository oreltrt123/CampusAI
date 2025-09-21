import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Israel News',
  description: 'AI-Powered Knesset News Digest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="max-w-7xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}