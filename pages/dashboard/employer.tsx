import { useSession } from "next-auth/react";
import Link from "next/link";

export default function EmployerDashboard() {
  const { data: session } = useSession();

  if (!session) return <p>Please log in to view the employer dashboard.</p>;

  return (
    <div>
      <h1>Employer Dashboard</h1>
      <p>Welcome, {session.user?.email}</p>
      <ul>
        <li><Link href="/search">🔍 Search Candidates</Link></li>
        <li><Link href="/outreach">✉️ Send Outreach</Link></li>
        <li><Link href="/settings">⚙️ Company Settings</Link></li>
      </ul>
    </div>
  );
}
