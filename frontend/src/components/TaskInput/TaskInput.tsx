import './TaskInput.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

let responseData = '';

function clearForm() {
	// console.log('didthistrigger?');
	const taskNameInput = document.getElementById(
		'taskNameInput'
	) as HTMLInputElement;
	taskNameInput.value = '';
}

async function deleteItem(id) {
	try {
		const response = await axios.delete(
			'https://38kf6z3tgj.execute-api.us-east-1.amazonaws.com/items/' + id
		);
		console.log('Item deleted:', response.data);
		// You can add additional logic here, such as displaying a success message
	} catch (error) {
		console.error('Error deleting item:', error);
		// You can add error handling logic here, such as displaying an error message
	}
}

async function putItems(data) {
	try {
		const response = await axios.put(
			'https://38kf6z3tgj.execute-api.us-east-1.amazonaws.com/items',
			data,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		responseData = response.data;

		console.log(
			'Form data submitted successfully from client. Still Check DB for:',
			responseData
		);

		clearForm();

		document.querySelectorAll('.taskDelBtn').forEach((element) => {
			element.addEventListener('click', (e: Event): void => {
				const target = e.currentTarget as HTMLTableCellElement;
				const targetParent = target.parentNode as HTMLTableCellElement;
				deleteItem(target.id);
				targetParent.remove();
			});
		});
		// You can add additional logic here, such as displaying a success message
	} catch (error) {
		console.error('Error submitting form data:', error);
		// You can add error handling logic here, such as displaying an error message
	}
}

const TaskInput = ({ items, setItems }) => {
	const [formData, setFormData] = useState({
		task: '',
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const randomID = uuidv4();
		const newItem = { id: randomID, ...formData };
		putItems(JSON.stringify(newItem));
		setItems([...items, newItem]);
	};

	return (
		<>
			<form
				className="flex w-full max-w-100% items-center gap-2"
				onSubmit={handleSubmit}
			>
				<Input
					id="taskNameInput"
					type="text"
					name="task"
					value={formData.task}
					onChange={handleChange}
					placeholder="Enter new task here"
				/>
				<Button type="submit" variant="outline">
					Add Task
				</Button>
			</form>
		</>
	);
};

export default TaskInput;
