"use client";

import { ReactNode, useEffect, useState } from "react";
import { AuthProvider, useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";

function AuthGate({ children }: { children: ReactNode }) {
  const { authenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait until we know if user is authenticated
    setLoading(false);

    if (!authenticated) {
      router.push("/login");
    }
  }, [authenticated, router]);

  // While checking auth state, show nothing
  if (loading) return null;

  // If not authenticated, the redirect is happening
  if (!authenticated) return null;

  // Authenticated → show children
  return <>{children}</>;
}

export function AuthProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AuthGate>{children}</AuthGate>
    </AuthProvider>
  );
}
