import { FC, MouseEvent } from "react";
import cn from "classnames";

import { ReactComponent as ExpandIcon } from "../assets/expand.svg";

import classes from "./Select.module.css";

import { IItem } from "../../../interfaces/item.interface";

interface ISelectProps {
	title: string;
	selectedItems: IItem[];
	isExpanded: boolean;
	onExpand: () => void;
}

const Select: FC<ISelectProps> = (props) => {
	const { title, selectedItems, isExpanded, onExpand } = props;

	const expandListHandler = (e: MouseEvent) => {
		e.stopPropagation();
		onExpand();
	};

	const hasSelectedItems = selectedItems.length > 0;

	return (
		<div className={classes.select} onClick={expandListHandler}>
			{!hasSelectedItems && (
				<div className={classes.placeholder}>
					Выберите <span className={classes.itemName}>{title}</span>{" "}
					из списка
				</div>
			)}
			<button
				className={classes.expandButton}
				aria-label="Expand list"
				onClick={expandListHandler}
			>
				<ExpandIcon
					className={cn(classes.expandIcon, {
						[classes.expandIconActive]: isExpanded,
					})}
				/>
			</button>
		</div>
	);
};

export default Select;
