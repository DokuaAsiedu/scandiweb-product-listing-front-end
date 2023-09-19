import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
import { Header, Footer, ErrorMessage, DVDField, FurnitureField, BookField } from "../components";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useEffect } from 'react';

export default function AddProductPage() {
	const navigate = useNavigate();

	const initialValues = {
		sku: "",
		name: "",
		price: "",
		// type: "",
		// For DVD type
		dvd_size: "",
		// For Furniture type
		furniture_height: "",
		furniture_width: "",
		furniture_length: "",
		// For Book
		book_weight: ""
	};
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm({
		defaultValues: initialValues
	})

	const productType = watch("productType")

	const renderProductField = () => {
		return {
			"DVD": <DVDField register={register} errors={errors} />,
			"Furniture": <FurnitureField register={register} errors={errors} />,
			"Book": <BookField register={register} errors={errors} />,
		}[productType]
	}


	const handleSave = (data) => {
		// console.log(data);
		// let newObj = Object.assign({}, data)
		// console.log(newObj)

		const { sku, name, price, productType, ...measurements } = data;

		const payload = {
			"sku": sku,
			"name": name,
			"price": price,
			"productType": productType,
			"measurements": measurements,
		}
		// console.log(payload)

		axios.post(
			"http://localhost:8000/add-product.php",// local hosting
			// "/server-files/add-product.php", // web hosting
			payload,
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}
		).then(res => {
			console.log(res.data);
			navigate("/");
		}).catch(err => {
			console.log(err);
		})
	}

	async function checkSKU(sku) {
		const query = { "sku": sku };
		const res = await axios.post(
			"http://localhost:8000/check-sku.php", // local hosting
			// "/server-files/check-sku.php", // web hosting
			query,
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				}
			}
		);
		const data = await res.data;
		console.log(data);
		return !data || "SKU already exists";
	}

	const getErrors = (error) => {
		console.log(error)
	}

	useEffect(() => {
		if (productType) {
			setValue("dvd_size", "");
			setValue("furniture_width", "");
			setValue("furniture_length", "");
			setValue("furniture_height", "");
			setValue("book_weight", "");
		}
	}, [productType, setValue])

	return (
		<>
			<Header actions={
				<>
					<h1>Product List</h1>
					<button type="submit" form="product_form" className="ml-auto">Save</button>
					<Link to="/">
						<button type="button">Cancel</button>
					</Link>
				</>
			} />
			<hr />
			<form id="product_form" method="post" onSubmit={handleSubmit(handleSave, getErrors)} className="flex flex-column justify-start align-start">
				<div className="flex flex-row justify-between align-start">
					<label htmlFor="sku">SKU</label>
					<div className="flex flex-column justify-between align-end input-block">
						<input id="sku" {...register("sku", { required: true, validate: { sku_exists: checkSKU } })} type="text"></input>
						{errors.sku && errors.sku.type === "required" && <ErrorMessage message="This is required" />}
						{errors.sku && <ErrorMessage message={errors.sku.message} />}
					</div>
				</div>

				<div className="flex flex-row justify-between align-start">
					<label htmlFor="name">Name</label>
					<div className="flex flex-column justify-between align-end input-block">
						<input id="name" {...register("name", { required: true })} type="text"></input>
						{errors.name && <ErrorMessage message="This is required" />}
					</div>
				</div>

				<div className="flex flex-row justify-between align-start">
					<label htmlFor="price">Price ($)</label>
					<div className="flex flex-column justify-between align-end input-block">
						<input id="price" type="number" {...register("price", { required: true, min: 0, valueAsNumber: true })}></input>
						{errors.price && errors.price.type === "required" && (<ErrorMessage message="This is required" />)}
						{errors.price && errors.price.type === "min" && (<ErrorMessage message="Please enter a number from 0" />)}
						{errors.price && errors.price.type === "valueAsNumber" && (<ErrorMessage message="Please enter a number" />)}
					</div>
				</div>
				<div className="flex flex-row justify-between align-start">
					<label htmlFor="productType">Type Switcher</label>
					<div className="flex flex-column justify-between align-end input-block">
						<select id="productType" {...register("productType", { value: "", required: true })}>
							<option value="" disabled>Type Switcher</option>
							<option value="DVD">DVD</option>
							<option value="Furniture">Furniture</option>
							<option value="Book">Book</option>
						</select>
						{errors.productType && errors.productType.type === "required" && (<ErrorMessage message="This is required" />)}
						{errors.productType && errors.productType.type === "min" && (<ErrorMessage message="Please enter a number from 0" />)}
					</div>
				</div>

				{renderProductField()}

			</form>
			<hr />
			<Footer />
		</>
	)
}