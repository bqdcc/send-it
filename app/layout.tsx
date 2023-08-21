import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/header';
import QueryWrapper from '@/components/query-wrapper';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'send it',
    description: 'send it app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <div className="container">
                        <Header />
                        <QueryWrapper>{children}</QueryWrapper>
                    </div>
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
