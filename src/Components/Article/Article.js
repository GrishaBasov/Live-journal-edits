import React from "react";

import { format } from "date-fns";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import s from "./Article.module.scss";

import {
	favorite,
	unFavorite,
	getArticles,
	getArticle,
} from "../Services/Services";

function Article({
	data,
	loggedIn,
	state,
	favorite,
	unFavorite,
	getArticles,
	getArticle,
}) {
	const formatCreatedTime = () => {
		const date = data.createdAt;
		return format(new Date(date), "MMMM d, yyyy");
	};

	const tags = () => {
		let id = 0;
		return data.tagList.map((item) => {
			if (item === null) {
				return null;
			}
			return (
				<span key={id++} className={s.tag}>
					{item}
				</span>
			);
		});
	};

	let checkBoxStatus = null;
	if (loggedIn === false) {
		checkBoxStatus = true;
	}

	const textClass = "article-text-display-none";

	const checked = data.favorited;

	return (
		<div className={s["article-wrapper"]}>
			<header className={s["article-header"]}>
				<div className={s["left-side"]}>
					<div className={s["left-side__header"]}>
						<Link
							to={`/articles/${data.slug}`}
							onClick={() => getArticle(data.slug)}
							className={s.title}
						>
							{data.title}
						</Link>
						<label className={s.like}>
							<input
								className={s.like__input}
								disabled={checkBoxStatus}
								checked={checked}
								onChange={() => {
									if (checked === false) {
										favorite(state.token, data.slug).then(() =>
											getArticles((state.currentPage - 1) * 5)
										);
									}
									if (checked === true) {
										unFavorite(state.token, data.slug).then(() =>
											getArticles((state.currentPage - 1) * 5)
										);
									}
								}}
								type='checkbox'
							/>
							<span className={s.like__box} />
							<span className={s.like__number}>{data.favoritesCount}</span>
						</label>
					</div>
					<div className={s["left-side__tag-container"]}>{tags()}</div>

					<p className={s["left-side__short-description"]}>
						{data.description}
					</p>
				</div>
				<div className={s["right-side"]}>
					<button className={s["article-account-name"]}>
						{data.author.username}
					</button>
					<img
						className={s["article-account-image"]}
						src={data.author.image}
						alt='аватар пользователя'
					/>
					<div className={s["article-date"]}>{formatCreatedTime()}</div>
				</div>
			</header>
			<p className={s[textClass]}>{data.body}</p>
		</div>
	);
}

const mapStateProps = (state) => ({
	state,
});

const mapDispatchToProps = (dispatch) => ({
	favorite: (token, slug) => dispatch(favorite(token, slug)),
	unFavorite: (token, slug) => dispatch(unFavorite(token, slug)),
	getArticles: (token, offset) => dispatch(getArticles(token, offset)),
	getArticle: (slug) => dispatch(getArticle(slug)),
});

export default connect(mapStateProps, mapDispatchToProps)(Article);
