import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'आवास सहायता कार्यक्रम - जानकारी वीडियो',
  description: 'नागरिकों के लिए आवास सहायता कार्यक्रम की जानकारी',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hi">
      <body style={{ margin: 0, padding: 0, fontFamily: 'system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
