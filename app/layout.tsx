import Head from 'next/head';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './styles.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: { title: string; description: string } = {
  title: "Custom Map Clone",
  description: "Generated by Mapbox",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
        <Head>
          <title>{metadata.title}</title>
          <meta name='description' content={metadata.description} />
          <link href='https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css' rel='stylesheet' />
        </Head>
        <body className={inter.className}>{children}</body>
      </html>
      </>
  );
}
