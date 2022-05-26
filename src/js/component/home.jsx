import React, { useState, useEffect } from "react";

const Home = () => {
	const [newItem, setNewItem] = useState("");
	const [items, setItems] = useState([]);

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/alonsogomezo", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => resp.json())
			.then((resp) => setItems(resp))
			.catch((error) => console.log(true));
	}, []);

	function addItem() {
		if (!newItem) {
			alert("ingrese una tarea");
			return;
		}
		const item = {
			label: newItem,
			done: false, //we get this from the input
		};

		setItems((oldList) => [...oldList, item]);
		setNewItem("");
		console.log(items);
	}
	console.log(items);
	function deleteItem(id) {
		const newArray = items.filter((item) => item.id !== id);
		setItems(newArray);
	}

	return (
		<center>
			<h1>Todo</h1>
			<input
				type="text"
				placeholder="Añadir tarea..."
				value={newItem}
				onChange={(e) => setNewItem(e.target.value)}
			/>
			<button onClick={() => addItem()}>añadir</button>
			<ul>
				{items.map((item, index) => {
					return (
						<li key={index}>
							{item.label}{" "}
							<button onClick={() => deleteItem(item.id)}>
								{" "}
								X{" "}
							</button>
						</li>
					);
				})}
			</ul>
		</center>
	);
};

export default Home;
