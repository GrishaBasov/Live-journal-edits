import React from "react";

import { format } from "date-fns";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import style from "./Article.module.scss";

import {
	favorite,
	unFavorite,
	getArticles,
	getArticle,
} from "../../Services/Services";

function Article({
	data,
	loggedIn,
	state,
	favorite,
	unFavorite,
	getArticles,
}) {
	const formatCreatedTime = () => {
		const date = data.createdAt;
		return format(new Date(date), "MMMM d, yyyy");
	};

	const tags = () => {
		let id = 0;
		return data.tagList.map((item) => {
			if (item.length === 0) {
				return null;
			}
			return (
				<span key={id++} className={style.tag}>
					{item}
				</span>
			);
		});
	};

	let checkBoxStatus = null;
	if (loggedIn === false) {
		checkBoxStatus = true;
	}

	const checked = data.favorited;

	return (
		<div className={style.articleWrapper}>
			<header className={style.articleHeader}>
				<div className={style.leftSide}>
					<div className={style.leftSide__header}>
						<Link
							to={`/articles/${data.slug}`}
							className={style.title}
						>
							{data.title}
						</Link>
						<label className={style.like}>
							<input
								className={style.like__input}
								disabled={checkBoxStatus}
								checked={checked}
								onChange={() => {
									if (checked === false) {
										favorite(data.slug).then(() =>
											getArticles((state.currentPage - 1) * 5)
										);
									}
									if (checked === true) {
										unFavorite(data.slug).then(() =>
											getArticles((state.currentPage - 1) * 5)
										);
									}
								}}
								type='checkbox'
							/>
							<span className={style.like__box} />
							<span className={style.like__number}>{data.favoritesCount}</span>
						</label>
					</div>
					<div className={style.leftSide__tagContainer}>{tags()}</div>

					<p className={style.leftSide__shortDescription}>
						{data.description}
					</p>
				</div>
				<div>
					<button className={style.articleAccountName}>
						{data.author.username}
					</button>
					<img
						className={style.articleAccountImage}
						src={data.author.image}
						alt='аватар пользователя'
					/>
					<div className={style.articleDate}>{formatCreatedTime()}</div>
				</div>
			</header>
		</div>
	);
}

const mapStateProps = (state) => ({
	state,
});

const mapDispatchToProps = (dispatch) => ({
	favorite: (slug) => dispatch(favorite(slug)),
	unFavorite: (slug) => dispatch(unFavorite(slug)),
	getArticles: (offset) => dispatch(getArticles(offset)),
	getArticle: (slug) => dispatch(getArticle(slug)),
});

export default connect(mapStateProps, mapDispatchToProps)(Article);
