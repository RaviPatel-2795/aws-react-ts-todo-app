import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TasksTable from './components/TasksTable/TasksTable';
import Header from './components/Header/Header';
import TaskInput from './components/TaskInput/TaskInput';

function App() {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getItems();
	}, []); // The empty array ensures the effect runs only once after the initial render

	const getItems = async () => {
		return await axios
			.get('https://38kf6z3tgj.execute-api.us-east-1.amazonaws.com/items')
			.then((res) => {
				const cleansedData = res.data.flat(Infinity);
				console.log(cleansedData);
				setItems(cleansedData);
				setIsLoading(false);
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<Header />
			<div id="tableContainer">
				<TaskInput items={items} setItems={setItems} />
				<TasksTable isLoading={isLoading} items={items} />
			</div>
		</>
	);
}

export default App;
