// src/context/ItemContext.js

import { createContext, useEffect, useState } from "react";

const itemContext = createContext();

// creating custom provider
function CustomItemContext({ children }) {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);
	const [itemsInCart, setItemsInCart] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);

	// useEffect to load all the vegetables
	useEffect(() => {
		// Fetch products from the backend and dispatch 'SET_PRODUCTS' action
		const fetchData = async () => {
			const response = await fetch("http://localhost:5000/api/books");
			const products = await response.json();
			console.log(products);
			setProducts(products);
		};

		fetchData();
	}, []);

	const addToCart = (product) => {
		setTotalPrice(totalPrice + product.price);
		setCart([...cart, product]);
		setItemsInCart(itemsInCart + 1);
	};

	const removeFromCart = (product) => {
		const index = cart.findIndex((prdt) => prdt._id === product._id);
		console.log(index);

		if (index !== -1) {
			// Item found in the cart
			// Now you can remove it from the cart array
			const updatedCart = [...cart];
			updatedCart.splice(index, 1);
			setTotalPrice(totalPrice - cart[index].price);
			setCart(updatedCart);
			setItemsInCart(itemsInCart - 1);
		} else {
			console.log("Item not found in the cart");
		}
	};

	return (
		// default provider
		<itemContext.Provider
			value={{
				products,
				addToCart,
				removeFromCart,
				itemsInCart,
				totalPrice,
			}}
		>
			{children}
		</itemContext.Provider>
	);
}

export { itemContext };
export default CustomItemContext;
