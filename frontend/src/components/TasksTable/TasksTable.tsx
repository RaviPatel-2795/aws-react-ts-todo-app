import { Trash2 } from 'lucide-react';
import './TasksTable.css';
import axios from 'axios';

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

const TasksTable = ({ isLoading, items }) => {
	async function deleteItem(id) {
		try {
			const response = await axios.delete(
				'https://38kf6z3tgj.execute-api.us-east-1.amazonaws.com/items/' +
					id
			);
			console.log('Item deleted:', response.data);
			// You can add additional logic here, such as displaying a success message
		} catch (error) {
			console.error('Error deleting item:', error);
			// You can add error handling logic here, such as displaying an error message
		}
	}
	const taskRows = items;
	if (isLoading) {
		return (
			<>
				<div>Loading Tasks from DB...</div>
			</>
		);
	} else {
		document.querySelectorAll('.taskDelBtn').forEach((element) => {
			element.addEventListener('click', (e: Event): void => {
				const target = e.currentTarget as HTMLTableCellElement;
				const targetParent = target.parentNode as HTMLTableCellElement;
				deleteItem(target.id);
				targetParent.remove();
			});
		});
		return (
			<>
				<Table id="taskTable" className="w-[100%]">
					<TableCaption>
						A list of all the tasks to be done.
					</TableCaption>
					<TableHeader>
						<TableRow>
							{/* <TableHead className="w-[30px]">ID</TableHead> */}
							<TableHead>Task</TableHead>
							<TableHead className="w-[30px]"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{taskRows.map((row) => {
							return (
								<TableRow key={row.id} id={row.id}>
									{/* <TableCell className="text-left">
										{row.id}
									</TableCell> */}
									<TableCell className="text-left">
										{row.task}
									</TableCell>
									<TableCell
										id={row.id}
										className="text-right cursor-pointer taskDelBtn"
									>
										<Trash2 size={14} />
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</>
		);
	}
};

export default TasksTable;
