import { useSession } from "next-auth/react";

export default function CandidateDashboard() {
  const { data: session } = useSession();

  if (!session) return <p>Please log in to view your dashboard.</p>;

  return (
    <div>
      <h1>Candidate Dashboard</h1>
      <p>Welcome, {session.user?.email}</p>
      <ul>
        <li><a href="/profile">📝 Edit Profile</a></li>
        <li><a href="/inbox">📬 Check Messages</a></li>
      </ul>
    </div>
  );
}
