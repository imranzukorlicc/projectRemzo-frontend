// Login.tsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    try { await login(email, password); nav('/products') }
    catch { setError('Pogrešan email ili lozinka.') }
  }

  return (
    <section className="auth-wrap">
      <form className="panel auth-card" onSubmit={submit}>
        <h1>Prijava</h1>
        <input className="input" type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Lozinka" required value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="error">{error}</p>}
        <button className="btn">Prijavi se</button>
        <p className="muted">Nemaš nalog? <Link to="/register">Registruj se</Link></p>
      </form>
    </section>
  )
}