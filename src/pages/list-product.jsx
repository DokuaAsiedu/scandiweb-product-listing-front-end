import '../App.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer, ProductCard } from "../components";
import axios from 'axios';

export default function ListProductPage() {
	const [productList, setProductList] = useState([]);
	const [selectedIds, setSelectedIds] = useState([]);

	useEffect(() => {
		axios.get(
			"http://localhost:8000/routes/fetch.php"// local hosting
			// "/server-files/fetch.php", // web hosting
		).then(response => {
			// console.log(response.data);
			setProductList(response.data);
		}).catch(err => {
			console.log(err)
		})
	}, [])

	function markForDelete(id) {
		if (selectedIds.includes(id)) {
			setSelectedIds(selectedIds.filter(existingId => {
				return existingId !== id;
			}))
		} else {
			setSelectedIds([...selectedIds, id])
		}
	}

	// useEffect(() => {
	// 	console.log(selectedIds)
	// }, [selectedIds])

	const massDelete = () => {
		if (selectedIds.length === 0) return;

		const deleteTargets = selectedIds.map(id => {
			const product = productList.find(product => product.sku === id);
			return { "sku": product.sku, "type": product.type }
		})
		console.log(deleteTargets);

		axios.post(
			"http://localhost:8000/routes/delete-products.php", // local hosting
			// "/server-files/delete-products.php", // web hosting
			deleteTargets,
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			}).then(response => {
				// console.log(response.data);
				setProductList(response.data);
				setSelectedIds([])
			}).catch(error => {
				console.log(error)
			})
	}

	return (
		<>
			<Header actions={
				<>
					<h1>Product List</h1>
					<Link to="/add-product" className="ml-auto">
						<button type="button">ADD</button>
					</Link>
					<button type="button" id="delete-product-btn" onClick={massDelete}>MASS DELETE</button>
				</>
			} />
			<hr />
			<main id="list-main">
				{productList.map((prod) => {
					const isSelected = selectedIds.includes(prod.sku);

					return <ProductCard 
						key={prod.sku}
						sku={prod.sku}
						name={prod.name}
						price={prod.price}
						type={prod.type}
						measurements={prod.measurements}
						selected={isSelected}
						onChange={() => markForDelete(prod.sku)}
					/>
				})}
			</main>
			<hr />
			<Footer />
		</>
	)
}
