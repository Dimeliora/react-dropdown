import { FC, ChangeEvent } from "react";

import { ReactComponent as SearchIcon } from "../assets/search.svg";

import classes from "./Search.module.css";

interface ISearchProps {
	value: string;
	onSearch: (value: string) => void;
}

const Search: FC<ISearchProps> = (props) => {
	const { value, onSearch } = props;

	const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		onSearch(e.target.value);
	};

	return (
		<div className={classes.search}>
			<input
				type="text"
				value={value}
				className={classes.searchInput}
				placeholder="Поиск"
				aria-label="Поиск"
				onChange={inputChangeHandler}
			/>
			<SearchIcon className={classes.searchIcon} />
		</div>
	);
};

export default Search;
