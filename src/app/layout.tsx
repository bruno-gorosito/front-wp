import Header from '@/app/components/header'
import './globals.css'
import { Inter } from 'next/font/google'
import SongProvider from './context/songs/songContext'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ministerio de alabanza',
  description: 'Generated by Bruno Gorosito ndea',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
      </head>
        <body className={`${inter.className} mt-14 `}>
          <SongProvider>
            <Header />
            {children}
          </SongProvider>
        </body>
    </html>
  )
}
