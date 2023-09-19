import '../App.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer, ProductCard } from "../components";
import axios from 'axios';
// import { useForm } from "react-hook-form";

export default function ListProductPage() {
	const [productList, setProductList] = useState([]);
	const [selectedIds, setSelectedIds] = useState([]);
	// const [deleteList, setDeleteList] = useState([]);

	useEffect(() => {
		axios.get(
			"http://localhost:8000/fetch.php"// local hosting
			// "/server-files/fetch.php", // web hosting
		)
			.then(response => {
				setProductList(response.data);
			})
			.catch(err => {
				console.log(err)
			})
	}, [])

	// console.log(1)
	// function addCards(data) {
	// 	data.map((prod, key) => {
	// 		return <ProductCard key={key} sku={prod.sku} name={prod.name} price={prod.price} type={prod.type} measurements={prod.measurements} onChange={addToDelete}/>
	// 	})}
	// }

	function markForDelete(id) {
		// let target = event.target;
		// let skuProp = target.getAttribute('data-sku');
		// let typeProp = target.getAttribute('data-type');

		// let match = deleteList.find(item => item.sku === skuProp);
		// if (match) {
		// 	setDeleteList(deleteList.filter(item => item.sku !== skuProp))
		// }
		// else {
		// 	setDeleteList(prev => [
		// 		...prev, {"sku": skuProp, "type": typeProp}
		// 	])
		// }
		if (selectedIds.includes(id)) {
			setSelectedIds(selectedIds.filter(existingId => {
				return existingId !== id;
			}))
		} else {
			setSelectedIds([...selectedIds, id])
		}
	}

	useEffect(() => {
		console.log(selectedIds)
	}, [selectedIds])

	const massDelete = () => {
		if (selectedIds.length === 0) return;

		const deleteTargets = selectedIds.map(id => {
			const product = productList.find(product => product.sku === id);
			return { "sku": product.sku, "type": product.type }
		})

		axios.post(
			"http://localhost:8000/delete-products.php", // local hosting
			// "/server-files/delete-products.php", // web hosting
			deleteTargets,
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			})
			.then(response => {
				setProductList(response.data);
				setSelectedIds([])
				// console.log(response.data);
			})
			.catch(error => {
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
			{/* <button onClick={() => setSelectedIds(
					productList.map(product => product.sku)
				)}>Select All</button> */}
			<main id="list-main">

				{/* {console.log(productList)} */}
				{productList.map((prod) => {
					const isSelected = selectedIds.includes(prod.sku);

					return <ProductCard key={prod.sku} sku={prod.sku} name={prod.name} price={prod.price} type={prod.type} measurements={prod.measurements}
						selected={isSelected} onChange={() => markForDelete(prod.sku)} />
				})}

				{/* <ProductCard sku="123" name="Table" price={12} type="Furniture" measurements={{length: 2, width: 3, height: 8}}/> */}
			</main>
			<hr />
			<Footer />
		</>
	)
}
