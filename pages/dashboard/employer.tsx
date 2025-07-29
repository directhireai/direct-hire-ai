// pages/dashboard/employer.tsx
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function EmployerDashboard() {
  const [isClient, setIsClient] = useState(false);
  const sessionHook = useSession();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const session = sessionHook?.data;

  return (
    <div>
      <h1>Employer Dashboard</h1>
      {!session ? (
        <p>
          Please <Link href="/auth">log in</Link> to continue.
        </p>
      ) : (
        <p>Welcome, {session.user?.email}!</p>
      )}
    </div>
  );
}
