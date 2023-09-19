export function Header({actions}) {
	return (
		<header className="flex flex-row justify-start align-center">
			{/* <h1>Product Add</h1> */}
			{actions}
			{/* <button type="submit" form="product_form" className="ml-auto">Save</button>
			<button>Cancel</button> */}
		</header>
	)
}