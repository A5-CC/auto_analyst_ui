import { AuthProviderWrapper } from "@/components/AuthProviderWrapper";
import { NavbarWrapper } from "@/components/NavbarWrapper";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "Advanced AI analytics dashboard for document analysis and insights",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>
          <AuthProviderWrapper>
            <NavbarWrapper>{children}</NavbarWrapper>
          </AuthProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
