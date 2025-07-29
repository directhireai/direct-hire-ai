// pages/dashboard/employer.tsx
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function EmployerDashboard() {
  const [isClient, setIsClient] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Prevent SSR crash
  }

  return (
    <div>
      <h1>Employer Dashboard</h1>
      {!session ? (
        <p>
          Please <Link href="/auth">log in</Link> to view your dashboard.
        </p>
      ) : (
        <p>Welcome, {session.user?.email}!</p>
      )}
    </div>
  );
}
