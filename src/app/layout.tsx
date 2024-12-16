export const metadata = {
  title: 'Mustaque Nadim | Build Solutions with JavaScript',
  description:
    'A passionate programmer from Bangladesh passionate programmer from Bangladesh with entrepreneurial spirit, experienced in building large scale web application using MERN technologies.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
