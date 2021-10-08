import { FC, useState } from "react";

import Select from "./Select/Select";

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

	const showListHandler = () => {
		setIsListVisible((prev) => !prev);
	};

	return (
		<div className={classes.dropdown}>
			<div className={classes.title}>{title}</div>
			<Select
				title={title}
				selectedItems={selectedItems}
				isExpanded={isListVisible}
				onExpand={showListHandler}
			/>
		</div>
	);
};

export default Dropdown;
