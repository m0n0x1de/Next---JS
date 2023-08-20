import "bootstrap/dist/css/bootstrap.min.css"
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Container, SSRProvider } from "@/components/boostrap"
import NavBAr from "./NavBar"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NextJS 13.4 Image Gallery',
  description: 'Tutorial project by Coding in Flow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SSRProvider>
          <NavBAr/>
          <main>
            <Container className="py-4">
              {children}
            </Container>
          </main>
        </SSRProvider>
        </body>
    </html>
  )
}
