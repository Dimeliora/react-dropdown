import { FC, MouseEvent } from "react";
import cn from "classnames";

import Badge from "../Badge/Badge";
import { ReactComponent as ExpandIcon } from "../assets/expand.svg";

import classes from "./Select.module.css";

import { IItem } from "../../../interfaces/item.interface";

interface ISelectProps {
	title: string;
	selectedItems: IItem[];
	isExpanded: boolean;
	onExpand: () => void;
	onRemoveSelectedItem: (id: string) => void;
	isMultiple?: boolean;
}

const Select: FC<ISelectProps> = (props) => {
	const {
		title,
		selectedItems,
		isExpanded,
		isMultiple,
		onExpand,
		onRemoveSelectedItem,
	} = props;

	const expandListHandler = (e: MouseEvent): void => {
		e.stopPropagation();
		onExpand();
	};

	const hasSelectedItems = selectedItems.length > 0;
	const singleItem = hasSelectedItems && !isMultiple;
	const multipleItems = hasSelectedItems && isMultiple;

	return (
		<div className={classes.select} onClick={expandListHandler}>
			{!hasSelectedItems && (
				<div className={classes.placeholder}>
					Выберите <span className={classes.itemName}>{title}</span>{" "}
					из списка
				</div>
			)}
			{singleItem && (
				<div className={classes.singleItem}>
					{selectedItems[0].name}
				</div>
			)}
			{multipleItems && (
				<div className={classes.itemsWrapper}>
					<div className={classes.items}>
						{selectedItems.map((item) => (
							<Badge
								key={item.id}
								id={item.id}
								title={item.name}
								onRemove={onRemoveSelectedItem}
							/>
						))}
					</div>
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
