// client/src/App.js
import React from 'react';

import ProductList from './components/ProductList';
import Header from './components/Header';
import './App.css'// client/src/App.js
import CustomItemContext from './context/ItemContext';

const App = () => {
	return (
		<CustomItemContext>
			<Header />
			<ProductList />
		</CustomItemContext>
	);
};

export default App;
