import { FC, useState, useEffect } from "react";

import Select from "./Select/Select";
import List from "./List/List";

import classes from "./Dropdown.module.css";

import { IItem } from "../../interfaces/item.interface";

interface IDropdownProps {
	title: string;
	items: IItem[];
	onSelect: (selectedItems: IItem[]) => void;
	multiple?: boolean;
	noIcon?: boolean;
}

const Dropdown: FC<IDropdownProps> = (props) => {
	const { title, items, onSelect, multiple, noIcon } = props;

	const [selectedItems, setSelectedItems] = useState<IItem[]>([]);
	const [isListVisible, setIsListVisible] = useState<boolean>(false);

	useEffect(() => {
		onSelect(selectedItems);
	}, [selectedItems, onSelect]);

	const showListHandler = () => {
		setIsListVisible((prev) => !prev);
	};

	const removeSelectedItemHandler = (id: string) => {
		setSelectedItems((prev) => prev.filter((item) => item.id !== id));
	};

	const selectItemsHandler = (currentItem: IItem) => {
		if (selectedItems.some((item) => item.id === currentItem.id)) {
			setSelectedItems((prev) =>
				prev.filter((item) => item.id !== currentItem.id)
			);
			return;
		}

		if (multiple) {
			setSelectedItems((prev) => [...prev, currentItem]);
			return;
		}

		setSelectedItems([currentItem]);
	};

	return (
		<div className={classes.dropdown}>
			<div className={classes.title}>{title}</div>
			<Select
				title={title}
				selectedItems={selectedItems}
				isExpanded={isListVisible}
				onExpand={showListHandler}
				onRemoveSelectedItem={removeSelectedItemHandler}
			/>
			{isListVisible && (
				<List
					items={items}
					selectedItems={selectedItems}
					onListItemCheck={selectItemsHandler}
				/>
			)}
		</div>
	);
};

export default Dropdown;
