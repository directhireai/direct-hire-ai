import { useSession } from "next-auth/react";
import Link from "next/link";

export default function CandidateDashboard() {
  const { data: session } = useSession() || {}; // fallback to avoid build crash

  return (
    <div>
      <h1>Candidate Dashboard</h1>
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
