import React from "react";

import { format } from "date-fns";
import { Link } from "react-router-dom";
import Markdown from "markdown-to-jsx";
import { connect } from "react-redux";
import DeleteModal from "../DeleteModal";
import s from "./FullArticle.module.scss";
import {
	deleteModuleToggle,
	favorite,
	unFavorite,
	getArticle,
} from "../Services/Services";

function FullArticle({
	state,
	deleteModuleToggle,
	favorite,
	unFavorite,
	getArticle,
}) {
	const data = state.article;
	const { loggedIn } = state;

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

	let deleteButtonStyle = s["delete-button"];
	let editButtonStyle = s["edit-button"];

	if (data.author.username !== state.username) {
		deleteButtonStyle = s["display-none"];
		editButtonStyle = s["display-none"];
	}

	const checked = data.favorited;

	return (
		<div className={s["article-wrapper"]}>
			<header className={s["article-header"]}>
				<div className={s["left-side"]}>
					<div className={s["left-side__header"]}>
						<div className={s.title}>
							<Link to={`/articles/${data.slug}`}>{data.title}</Link>
						</div>
						<label className={s.like}>
							<input
								className={s.like__input}
								disabled={checkBoxStatus}
								type='checkbox'
								checked={checked}
								onChange={() => {
									if (checked === false) {
										favorite(state.token, data.slug).then(() =>
											getArticle(data.slug)
										);
									}
									if (checked === true) {
										unFavorite(state.token, data.slug).then(() =>
											getArticle(data.slug)
										);
									}
								}}
							/>
							<span className={s.like__box} />
							<span className={s.like__number}>{data.favoritesCount}</span>
						</label>
					</div>
					<div className={s["left-side__tag-container"]}>{tags()}</div>

					<div className={s["left-side__short-description"]}>
						{data.description}
					</div>
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
					<button onClick={deleteModuleToggle} className={deleteButtonStyle}>
            Delete
					</button>
					<div className={s["delete-modal"]}>
						<DeleteModal />
					</div>

					<Link to={`/articles/${data.slug}/edit`} className={editButtonStyle}>
            Edit
					</Link>
				</div>
			</header>
			<div className={s["article-text"]}>
				<Markdown>{data.body}</Markdown>
			</div>
		</div>
	);
}
const mapStateProps = (state) => ({
	state,
});

const mapDispatchToProps = (dispatch) => ({
	favorite: (token, slug) => dispatch(favorite(token, slug)),
	unFavorite: (token, slug) => dispatch(unFavorite(token, slug)),
	getArticle: (token, offset) => dispatch(getArticle(token, offset)),
	deleteModuleToggle: () => dispatch(deleteModuleToggle()),
});

export default connect(mapStateProps, mapDispatchToProps)(FullArticle);
