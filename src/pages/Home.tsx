import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="hero">
      <div className="hero-text">
        <h1>Oprema za <span>pobjednike</span></h1>
        <p>Sve što ti treba za trening, takmičenje i rekreaciju na jednom mjestu.</p>
        <Link to="/products" className="btn btn-lg">Pogledaj ponudu</Link>
      </div>
    </section>
  )
}