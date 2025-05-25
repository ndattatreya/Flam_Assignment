import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Layout } from '@/components/layout/Layout';
import { Providers } from '@/components/providers/Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HR Performance Dashboard',
  description: 'Monitor and manage employee performance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}