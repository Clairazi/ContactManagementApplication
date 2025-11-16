import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import {ThemeProvider} from '../components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Contact Management App',
  description: 'Full-stack contact management mini project',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}