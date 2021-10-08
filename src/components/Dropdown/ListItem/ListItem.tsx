import { FC } from "react";

import classes from "./ListItem.module.css";

import { IItem } from "../../../interfaces/item.interface";

interface IListItemProps {
	item: IItem;
	isChecked: boolean;
	onCheck: (item: IItem) => void;
	noIcon?: boolean;
}

const ListItem: FC<IListItemProps> = (props) => {
	const { item, isChecked, onCheck, noIcon } = props;
	const { id, icon, name } = item;

	const itemCheckHandler = () => {
		onCheck(item);
	};

	return (
		<li className={classes.listItem}>
			{!noIcon && (
				<div className={classes.listItemIcon}>
					<img
						src={icon}
						alt={name}
						className={classes.listItemImage}
					/>
				</div>
			)}
			<label htmlFor={id} className={classes.listItemName}>
				{name}
			</label>
			<input
				type="checkbox"
				id={id}
				checked={isChecked}
				className={classes.listItemCheckbox}
				onChange={itemCheckHandler}
			/>
		</li>
	);
};

export default ListItem;
