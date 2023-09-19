import './App.css';
import { Routes, Route } from 'react-router-dom';
import ProductAddPage from './pages/add-product';
import ProductListPage from './pages/list-product';
// import { Header, Footer, ErrorMessage, DVDField, FurnitureField, BookField } from "./components";
// import { useForm } from "react-hook-form";

function App() {
	return (
		<Routes>
			<Route path='/' element={<ProductListPage/>}/>
			<Route path='/add-product' element={<ProductAddPage/>}/>
		</Routes>
	);
}



export default App
