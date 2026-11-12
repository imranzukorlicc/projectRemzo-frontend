// Register.tsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const nav = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    try { await register(name, email, password); nav('/products') }
    catch { setError('Registracija nije uspjela. Provjeri podatke.') }
  }

  return (
    <section className="auth-wrap">
      <form className="panel auth-card" onSubmit={submit}>
        <h1>Registracija</h1>
        <input className="input" placeholder="Ime" required value={name} onChange={(e) => setName(e.target.value)} />
        <input className="input" type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Lozinka (min. 8 znakova)" minLength={8} required value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="error">{error}</p>}
        <button className="btn">Kreiraj nalog</button>
        <p className="muted">Već imaš nalog? <Link to="/login">Prijavi se</Link></p>
      </form>
    </section>
  )
}