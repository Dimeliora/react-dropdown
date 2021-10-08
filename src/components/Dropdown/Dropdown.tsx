import { FC, useState, useEffect, useRef } from "react";

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
	const [searchItemTemplate, setSearchItemTemplate] = useState<string>("");

	const dropdownElement = useRef<HTMLDivElement>(null);

	useEffect(() => {
		onSelect(selectedItems);
	}, [selectedItems, onSelect]);

	useEffect(() => {
		const outsideClickHandler = (e: MouseEvent) => {
			const dropdown = dropdownElement.current;

			if (dropdown && !e.composedPath().includes(dropdown)) {
				setIsListVisible(false);
			}
		};

		document.addEventListener("click", outsideClickHandler);

		return () => {
			document.removeEventListener("click", outsideClickHandler);
		};
	}, []);

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

	const searchChangeHandler = (value: string) => {
		setSearchItemTemplate(value);
	};

	const filterItems = () => {
		const filterTemplate = searchItemTemplate.toLowerCase().trim();

		return items.filter((item) =>
			item.name.toLowerCase().includes(filterTemplate)
		);
	};

	return (
		<div ref={dropdownElement} className={classes.dropdown}>
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
					items={filterItems()}
					selectedItems={selectedItems}
					searchItemTemplate={searchItemTemplate}
					noIcon={noIcon}
					onListItemSearch={searchChangeHandler}
					onListItemCheck={selectItemsHandler}
				/>
			)}
		</div>
	);
};

export default Dropdown;
