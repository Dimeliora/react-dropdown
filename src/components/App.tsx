import { FC, useState, useEffect } from "react";

import Dropdown from "./Dropdown/Dropdown";

import classes from "./App.module.css";

import { IItem } from "../interfaces/item.interface";

const App: FC = () => {
	const [items, setItems] = useState<IItem[]>([]);

	useEffect(() => {
		fetch("./mocks.json")
			.then((res) => res.json())
			.then((data: IItem[]) => setItems(data));
	}, []);

	const selectChangeHandler = (items: IItem[]) => {
		console.log(items);
	};

	return (
		<div className={classes.app}>
			<Dropdown
				title="Язык"
				items={items}
				onSelect={selectChangeHandler}
			/>
		</div>
	);
};

export default App;
