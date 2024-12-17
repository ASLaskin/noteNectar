export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body className="bg-black">
          {children}
        </body>
      </html>
    );
  }