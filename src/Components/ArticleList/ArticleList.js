import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getArticles, changeCurrentPage } from "../../Services/Services";

import "antd/dist/antd.min.css";

import Article from "../Article";
import Spinner from "../Spinner";

import style from "./ArticleList.module.scss";
import { Pagination } from "antd";

function ArticleList({ getArticles, changeCurrentPage, state }) {
	useEffect(() => {
		getArticles((state.currentPage - 1) * 5);
	}, [state.currentPage]);

	const elements = (state) =>
		state.articles.map((item) => (
			<Article key={item.slug} loggedIn={state.loggedIn} data={item} />
		));

	const pageChange = (current) => {
		changeCurrentPage(current);
		getArticles((current - 1) * 5);
	};

	function ServerPagination() {
		return (
			<Pagination
				defaultCurrent={state.currentPage}
				total={(state.articlesCount * 10) / 5}
				onChange={pageChange}
			/>
		);
	}

	if (state.loading === true) {
		return (
			<div>
				<div className={style.articleList}>{elements(state)}</div>
				<div className={style.pagination}>
					<ServerPagination />
					<Spinner />
				</div>
			</div>
		);
	}

	return (
		<div>
			<div className={style.articleList}>{elements(state)}</div>
			<div className={style.pagination}>
				<ServerPagination />
			</div>
		</div>
	);
}

const mapStateProps = (state) => ({
	state,
});

const mapDispatchToProps = (dispatch) => ({
	getArticles: (offset) => dispatch(getArticles(offset)),
	changeCurrentPage: (current) => dispatch(changeCurrentPage(current)),
});

export default connect(mapStateProps, mapDispatchToProps)(ArticleList);
