import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'OmniMED v3 - Suporte Clínico',
  description: 'Calculadora de medicamentos para IOT e sedação/analgesia'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
        {children}
      </body>
    </html>
  )
}
