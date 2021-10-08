import { FC, MouseEvent } from "react";

import { ReactComponent as CloseIcon } from "../assets/close.svg";

import classes from "./Badge.module.css";

interface IBadgeProps {
	id: string;
	title: string;
	onRemove: (id: string) => void;
}

const Badge: FC<IBadgeProps> = (props) => {
	const { id, title, onRemove } = props;

	const removeItemHandler = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		onRemove(id);
	};

	return (
		<div className={classes.badge}>
			<div className={classes.itemName}>{title}</div>
			<button
				className={classes.removeButton}
				aria-label={`Remove item ${title}`}
				onClick={removeItemHandler}
			>
				<CloseIcon className={classes.removeIcon} />
			</button>
		</div>
	);
};

export default Badge;
