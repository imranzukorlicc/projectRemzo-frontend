import { useEffect, useState } from 'react'
import api from '../api/client'
import ProductCard, { type Product } from '../components/ProductCard'
import { useAuth } from '../context/AuthContext'

export default function Products() {
  const { user } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [form, setForm] = useState({ name: '', description: '', price: '' })

  const load = () =>
    api.get('/products')
      .then((r) => setProducts(r.data.data ?? r.data)) // radi i sa paginacijom i bez
      .catch(() => setError('Greška pri učitavanju proizvoda.'))
      .finally(() => setLoading(false))

  useEffect(() => { load() }, [])

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault()
    await api.post('/products', { ...form, price: Number(form.price) })
    setForm({ name: '', description: '', price: '' })
    load()
  }

  const remove = async (p: Product) => {
    if (!confirm(`Obrisati "${p.name}"?`)) return
    await api.delete(`/products/${p._id}`)
    load()
  }

  const order = async (p: Product) => {
    await api.post('/orders', { product: p._id, quantity: 1 })
    alert('Narudžba poslata!')
  }

  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <section className="container">
      <div className="page-head">
        <h1>Proizvodi</h1>
        <input className="input" placeholder="Pretraži..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {user && (
        <form className="panel form-row" onSubmit={addProduct}>
          <input className="input" placeholder="Naziv" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="input" placeholder="Opis" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <input className="input" type="number" step="0.01" placeholder="Cijena" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <button className="btn">Dodaj</button>
        </form>
      )}

      {loading && <p className="muted">Učitavanje...</p>}
      {error && <p className="error">{error}</p>}

      <div className="grid">
        {filtered.map((p) => (
          <ProductCard key={p._id} product={p} onOrder={user ? order : undefined} onDelete={user ? remove : undefined} />
        ))}
      </div>
    </section>
  )
}