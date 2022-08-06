import React, { useEffect } from "react";

import { format } from "date-fns";
import { Link } from "react-router-dom";
import Markdown from "markdown-to-jsx";
import { connect } from "react-redux";
import DeleteModal from "../DeleteModal";
import style from "./FullArticle.module.scss";
import {
	deleteModuleToggle,
	favorite,
	unFavorite,
	getArticle,
} from "../../Services/Services";

function FullArticle({
	state,
	deleteModuleToggle,
	favorite,
	unFavorite,
	getArticle,
	slug
}) {

	useEffect(() => {
		getArticle(slug);
	},[]);

	const data = state.article;
	const { loggedIn } = state;

	const formatCreatedTime = () => {
		const date = data.createdAt;
		return format(new Date(date), "MMMM d, yyyy");
	};

	const tags = () => {
		let id = 0;
		if (data.tagList) {
			return data.tagList.map((item) => {
				if (item.length === 0) {
					return null;
				}
				return (
					<span key={id++} className={style.tag}>{item}</span>
				);
			});
		}
	};

	let checkBoxStatus = null;
	if (loggedIn === false) {
		checkBoxStatus = true;
	}

	let deleteButtonStyle = style.deleteButton;
	let editButtonStyle = style.editButton;

	if (state.article.length !== 0) {
		if (data.author.username !== state.username) {
			deleteButtonStyle = style.displayNone;
			editButtonStyle = style.displayNone;
		}
	}

	const checked = data.favorited;

	if (state.article.length !== 0) {
		return (
			<div className={style.articleWrapper}>
				<header className={style.articleHeader}>
					<div className={style.leftSide}>
						<div className={style.leftSide__header}>
							<div className={style.title}>
								<Link to={`/articles/${data.slug}`}>{data.title}</Link>
							</div>
							<label className={style.like}>
								<input
									className={style.like__input}
									disabled={checkBoxStatus}
									type='checkbox'
									checked={checked}
									onChange={() => {
										if (checked === false) {
											favorite(data.slug).then(() => getArticle(data.slug)
											);
										}
										if (checked === true) {
											unFavorite(data.slug).then(() => getArticle(data.slug)
											);
										}
									}}
								/>
								<span className={style.like__box} />
								<span className={style.like__number}>{data.favoritesCount}</span>
							</label>
						</div>
						<div className={style.leftSide__tagContainer}>{tags()}</div>

						<div className={style.leftSide__shortDescription}>
							{data.description}
						</div>
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
						<button onClick={deleteModuleToggle} className={deleteButtonStyle}>
							Delete
						</button>
						<div className={style.deleteModal}>
							<DeleteModal />
						</div>

						<Link to={`/articles/${data.slug}/edit`} className={editButtonStyle}>
							Edit
						</Link>
					</div>
				</header>
				<div className={style.articleText}>
					<Markdown>{data.body}</Markdown>
				</div>
			</div>
		);
	}






}
const mapStateProps = (state) => ({
	state,
});

const mapDispatchToProps = (dispatch) => ({
	favorite: (slug) => dispatch(favorite(slug)),
	unFavorite: (slug) => dispatch(unFavorite(slug)),
	getArticle: (slug) => dispatch(getArticle(slug)),
	deleteModuleToggle: () => dispatch(deleteModuleToggle()),
});

export default connect(mapStateProps, mapDispatchToProps)(FullArticle);
