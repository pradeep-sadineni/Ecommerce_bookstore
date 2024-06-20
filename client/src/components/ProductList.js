// client/src/components/ProductList.js

import React, { useContext, useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { itemContext } from "../context/ItemContext";

const ProductList = () => {
	const { products } = useContext(itemContext);
	// Keep a local state for sorted products
	const [sortedProducts, setSortedProducts] = useState([...products]);	 
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(3000);
	// 'all' represents no type filter
	const [selectedType, setSelectedType] = useState("all"); 
	
	useEffect(() => {
		setSortedProducts([...products]);
	}, [products]);

	const handleSortByPrice = () => {
		const sorted = [...sortedProducts].sort((a, b) => a.price - b.price);
		setSortedProducts(sorted);
	};

	const handleFilterByPriceRange = () => {
		const filtered = products.filter(
			(product) => product.price >= minPrice && product.price <= maxPrice
		);
		setSortedProducts(filtered);
	};

	const handleFilterByType = () => {
		if (selectedType === "all") {
			// Reset the type filter
			setSortedProducts([...products]);
		} else {
			const filtered = products.filter(
				(product) => product.genre === selectedType
			);
			setSortedProducts(filtered);
		}
	};

	return (
		<div className="prdt-list">
			<h2 style={{ color: "green" }}>Book List</h2>
			<div className="filter-btn">
				<button onClick={handleSortByPrice}>Sort by Price</button>
				<label>
					Min Price:
					<input
						type="number"
						value={minPrice}
						onChange={(e) => setMinPrice(Number(e.target.value))}
					/>
				</label>
				<label>
					Max Price:
					<input
						type="number"
						value={maxPrice}
						onChange={(e) => setMaxPrice(Number(e.target.value))}
					/>
				</label>
				<button onClick={() => handleFilterByPriceRange()}>
					Filter by Price Range
				</button>
				<label>
					Filter by Type:
					<select
						value={selectedType}
						onChange={(e) => setSelectedType(e.target.value)}
					>
						<option value="all">All</option>
						<option value="Fiction">Fiction</option>
						<option value="Dystopian">Dystopian</option>
						{/* Add more options as needed */}
					</select>
				</label>

				<button onClick={handleFilterByType}>Filter by Type</button>
			</div>

			<ul className="item-card">
				{sortedProducts.map((product) => (
					<ProductItem key={product._id} product={product} />
				))}
			</ul>
			<div className="buy-now-btn">Buy Now</div>
		</div>
	);
};

export default ProductList;
