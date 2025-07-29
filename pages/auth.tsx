// pages/auth.tsx

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'candidate' | 'employer'>('candidate');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        data: { role }, // store role in Supabase user metadata
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Check your email for the login link!');
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 400, margin: '0 auto' }}>
      <h2>Login or Sign Up</h2>

      <label>Email Address</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      />

      <label>Select Role</label>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as any)}
        style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
      >
        <option value="candidate">Candidate</option>
        <option value="employer">Employer</option>
      </select>

      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Sending magic link...' : 'Send Magic Link'}
      </button>

      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
}
