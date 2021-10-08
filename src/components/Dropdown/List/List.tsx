import { FC, useState, useEffect, useRef } from "react";
import cn from "classnames";

import ListItem from "../ListItem/ListItem";

import classes from "./List.module.css";

import { IItem } from "../../../interfaces/item.interface";

interface IListProps {
	items: IItem[];
	selectedItems: IItem[];
	onListItemCheck: (item: IItem) => void;
	noIcon?: boolean;
}

const List: FC<IListProps> = (props) => {
	const { items, selectedItems, onListItemCheck, noIcon } = props;

	const [isScrollable, setIsScrollabe] = useState<boolean>(false);

	const listElement = useRef<HTMLUListElement>(null);

	useEffect(() => {
		if (listElement.current) {
			setIsScrollabe(
				listElement.current.scrollHeight >
					listElement.current.clientHeight
			);
		}
	}, []);

	const isItemSelected = (id: string): boolean =>
		selectedItems.some((item) => item.id === id);

	return (
		<div className={classes.list}>
			<ul
				ref={listElement}
				className={cn(classes.itemsList, {
					[classes.itemListScrollable]: isScrollable,
				})}
			>
				{items.map((item) => (
					<ListItem
						key={item.id}
						item={item}
						isChecked={isItemSelected(item.id)}
						onCheck={onListItemCheck}
						noIcon={noIcon}
					/>
				))}
			</ul>
		</div>
	);
};

export default List;
