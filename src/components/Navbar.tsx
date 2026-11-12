import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  return (
    <header className="navbar">
      <Link to="/" className="logo">SPORT<span>OPREMA</span></Link>
      <nav>
        <NavLink to="/products">Proizvodi</NavLink>
        {user && <NavLink to="/orders">Narudžbe</NavLink>}
      </nav>
      <div className="nav-auth">
        {user ? (
          <>
            <span className="hello">Zdravo, {user.name}</span>
            <button className="btn btn-outline" onClick={logout}>Odjava</button>
          </>
        ) : (
          <>
            <Link className="btn btn-outline" to="/login">Prijava</Link>
            <Link className="btn" to="/register">Registracija</Link>
          </>
        )}
      </div>
    </header>
  )
}