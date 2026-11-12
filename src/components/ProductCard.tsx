export type Product = {
  _id: string
  name: string
  description?: string
  price: number
  stock?: number
  image?: string
}

type Props = {
  product: Product
  onOrder?: (p: Product) => void
  onDelete?: (p: Product) => void
}

export default function ProductCard({ product, onOrder, onDelete }: Props) {
  return (
    <article className="card">
      <div className="card-img">
        {product.image ? <img src={product.image} alt={product.name} /> : <span>🏀</span>}
      </div>
      <div className="card-body">
        <h3>{product.name}</h3>
        <p className="muted">{product.description}</p>
        <div className="card-footer">
          <strong className="price">{Number(product.price).toFixed(2)} KM</strong>
          <div className="actions">
            {onOrder && <button className="btn" onClick={() => onOrder(product)}>Naruči</button>}
            {onDelete && <button className="btn btn-danger" onClick={() => onDelete(product)}>Obriši</button>}
          </div>
        </div>
      </div>
    </article>
  )
}