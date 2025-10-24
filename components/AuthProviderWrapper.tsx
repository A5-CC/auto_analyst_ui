'use client';

import { ReactNode, useEffect } from "react";
import { AuthProvider, useAuth } from "./AuthContext";
import { usePathname, useRouter } from "next/navigation";

function AuthGate({ children }: { children: ReactNode }) {
  const { authenticated, initialized } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Only attempt redirect after we know the auth state (initialized === true)
  useEffect(() => {
    if (!initialized) return;               // wait for initial check
    if (!authenticated && pathname !== "/login") {
      router.push("/login");
    }
    // If authenticated and on /login you might want to redirect away — optional:
    // if (initialized && authenticated && pathname === "/login") router.push("/");
  }, [initialized, authenticated, pathname, router]);

  // Always render the login page so user can sign in immediately
  if (pathname === "/login") return <>{children}</>;

  // If still initializing, render nothing (avoid flicker)
  if (!initialized) return null;

  // If initialized and not authenticated, we've triggered redirect; don't render protected content
  if (!authenticated) return null;

  // Authenticated -> render children
  return <>{children}</>;
}

export function AuthProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AuthGate>{children}</AuthGate>
    </AuthProvider>
  );
}
