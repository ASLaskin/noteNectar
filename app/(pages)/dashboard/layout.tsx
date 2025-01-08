export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <body className="bg-white">
          {children}
        </body>
      </html>
    );
  }