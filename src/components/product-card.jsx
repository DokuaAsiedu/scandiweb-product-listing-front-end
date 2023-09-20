import { measurementsFactory } from "../utils";

export function ProductCard({sku, name, price, type, measurements, selected, onChange}) {
	return (
		<div className="product-card">
			<input 
				type="checkbox" 
				className="delete-checkbox d-block"
				checked={selected}
				onChange={onChange} 
			/>
			<p>{sku}</p>
			<p>{name}</p>
			<p>{price} $</p>
			{measurementsFactory(type, measurements)}
		</div>
	)
}
