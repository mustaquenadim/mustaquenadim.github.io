import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
  title: {
    default: 'Mustaque Nadim ✦ Programmer ✦ Content Creator ✦ Aspiring Entrepreneur',
    template: '%s ✦ Mustaque Nadim',
  },
  description:
    'A passionate programmer from Bangladesh with entrepreneurial spirit, experienced in building large scale web application using MERN technologies.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="Mustaque Nadim" />
      </head>
      <body>{children}</body>
    </html>
  );
}
