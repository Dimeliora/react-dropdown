import { FC } from "react";

import ListItem from "../ListItem/ListItem";

import classes from "./List.module.css";

import { IItem } from "../../../interfaces/item.interface";

interface IListProps {
	items: IItem[];
	selectedItems: IItem[];
	onListItemCheck: (item: IItem) => void;
}

const List: FC<IListProps> = (props) => {
	const { items, selectedItems, onListItemCheck } = props;

	const isItemSelected = (id: string): boolean =>
		selectedItems.some((item) => item.id === id);

	return (
		<div className={classes.list}>
			<ul className={classes.itemsList}>
				{items.map((item) => (
					<ListItem
						key={item.id}
						item={item}
						isChecked={isItemSelected(item.id)}
						onCheck={onListItemCheck}
					/>
				))}
			</ul>
		</div>
	);
};

export default List;
