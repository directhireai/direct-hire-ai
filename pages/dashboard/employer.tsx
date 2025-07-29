import { useSession } from "next-auth/react";
import Link from "next/link";

export default function EmployerDashboard() {
  const { data: session } = useSession() || {};

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
