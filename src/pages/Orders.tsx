import { useEffect, useState } from 'react'
import api from '../api/client'

type Order = { _id: number; status?: string; total?: number; created_at?: string }

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([])

  const load = () => api.get('/orders').then((r) => setOrders(r.data.data ?? r.data))
  useEffect(() => { load() }, [])

  const cancel = async (id: number) => {
    await api.delete(`/orders/${id}`)
    load()
  }

  return (
    <section className="container">
      <div className="page-head"><h1>Moje narudžbe</h1></div>
      <div className="panel">
        <table className="table">
          <thead>
            <tr><th>#</th><th>Datum</th><th>Status</th><th>Ukupno</th><th></th></tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>{o._id}</td>
                <td>{o.created_at ? new Date(o.created_at).toLocaleDateString('sr-Latn') : '-'}</td>
                <td><span className="badge">{o.status ?? 'na čekanju'}</span></td>
                <td>{o.total != null ? `${Number(o.total).toFixed(2)} KM` : '-'}</td>
                <td><button className="btn btn-danger" onClick={() => cancel(o._id)}>Otkaži</button></td>
              </tr>
            ))}
            {orders.length === 0 && <tr><td colSpan={5} className="muted">Nema narudžbi.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  )
}