





export const measurementsFactory = (type, {size, length, width, height, weight}) => {
	switch (type) {
		case "DVD":
			return <p>{size} MB</p>;
		case "Furniture":
			return <p>Dimension: {`${length}x${width}x${height}`}</p>;
		case "Book":
			return <p>{weight} KG</p>;
	}
}
