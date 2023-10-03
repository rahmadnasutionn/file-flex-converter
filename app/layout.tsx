import * as React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import SiteHeader from '~/components/site-header';
import { ThemeProvider } from '~/components/theme-provider';
import { siteConfig } from '~/config/site';
import { cn } from '~/lib/utils';
import SiteFooter from '~/components/site-footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `s% - ${siteConfig.title}`
  },
  description: siteConfig.description,
  keywords: [
    'Next js',
    'React js',
    'Server Actions',
    'Server Components'
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={cn(
          'min-h-screen bg-background antialiased',
          inter.className,
        )}
      >
        <ThemeProvider
          enableSystem
          defaultTheme='light'
          attribute='class'
          disableTransitionOnChange
        >
          <div className="relative flex flex-col min-h-screen">
            <React.Suspense>
              <SiteHeader />
            </React.Suspense>
            <div className="flex-1">
              {children}
            </div>
            <React.Suspense>
              <SiteFooter />
            </React.Suspense>
          </div>

          <Toaster position='bottom-left' />
        </ThemeProvider>
      </body>
    </html>
  )
}
