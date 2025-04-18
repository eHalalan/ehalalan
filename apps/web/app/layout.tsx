import type { Metadata } from 'next';
import { Montserrat, Geist_Mono } from 'next/font/google';
import './globals.css';
import { cookies } from 'next/headers';
import { ContractsProvider } from '@/context/ContractsProvider';
import { ThemeProvider } from '@/context/ThemeProvider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from 'sonner';
import { AppSidebar } from '@/components/nav/AppSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Footer } from '@/components/footer/Footer';
import { SiteHeader } from '@/components/nav/SiteHeader';
import { AuthProvider } from '@/services/models/Auth';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'eHalalan',
  description: 'eHalalan description',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')
    ? cookieStore.get('sidebar_state')?.value === 'true'
    : true;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ContractsProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <TooltipProvider>
                <Toaster />
                <SidebarProvider
                  defaultOpen={defaultOpen}
                  className="flex flex-col"
                >
                  <div className="flex flex-1">
                    <AppSidebar />
                    <SidebarInset>
                      <SiteHeader />
                      <div className="flex flex-col w-full min-h-screen">
                        <main className="p-4 md:p-8 flex-grow">{children}</main>
                        <Footer />
                      </div>
                    </SidebarInset>
                  </div>
                </SidebarProvider>
              </TooltipProvider>
              <Toaster />
            </ThemeProvider>
          </ContractsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
