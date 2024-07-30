import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './styles/globals.css';
import Header from '@/app/components/Header';
import { ToastContextProvider } from './context/ToastContext';
import { ToastList } from './components/Toast';

const roboto = Roboto({ subsets: ['latin'], weight: ['400'] });

export const metadata: Metadata = {
  title: 'Ecommerce App',
  description: 'Created by Michal Ciberej',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${roboto.className} max-w-[1520px] w-full mx-auto bg-neutral-300 text-neutral-700 fill-neutral-700`}>
        <ToastContextProvider>
          <Header />
          {children}
          <ToastList />
        </ToastContextProvider>
      </body>
    </html>
  );
}
