import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { Toaster } from '~/components/ui/toaster';
import { cn } from '~/lib/utils';
import './globals.css';
import { MainNav } from '~/components/main-nav';
import { UserNav } from '~/components/user-dropdown';

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Voxly',
  description:
    'Voxly let you Ask Location-Based Questions Routed To Nearby Users',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <div className='border-b'>
          <div className='flex h-16 items-center px-4'>
            <MainNav className='mx-6' />
            <div className='ml-auto flex items-center space-x-4'>
              <UserNav />
            </div>
          </div>
        </div>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
