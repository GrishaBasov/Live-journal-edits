import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import classnames from "classnames";

import style from "../CreateNewArticle/CreateNewArticle.module.scss";

import {
	changeArticleTagInput,
	changeTagInput,
	addTagEdit,
	delTagEdit,
	editArticle,
	addTag
} from "../../Services/Services";


function EditArticle({
	changeArticleTagInput,
	state,
	changeTagInput,
	addTagEdit,
	delTagEdit,
	editArticle,
}) {
	const data = state.article;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (article) => {
		article = {
			article: {
				title: article.title,
				description: article.description,
				body: article.body,
				tagList: state.article.tagList,
				token: state.token,
			},
		};
		editArticle(article, state.article.slug);
	};

	const oldTags = (data) =>
		data.tagList.map((item, index) => {
			if (item.length === 0) {
				return null;
			}
			return (
				<div key={index} className={style.tagWrapper}>
					<input
						className={style.inputTag}
						value={item}
						onChange={(e) => changeArticleTagInput(e.target.value, index)}
					/>
					<button
						onClick={() => delTagEdit(index)}
						type='button'
						className={style.deleteBtn}
					>
            Delete
					</button>
				</div>
			);
		});

	let inputTitle = classnames(style.inputTitle, {[style.inputWrong] : errors.title});
	let inputShortDescription = classnames( style.inputShortDescription,{[style.inputWrong] : errors.description});
	let inputBody = classnames( style.inputText,{[style.inputWrong] : errors.body});


	return (
		<form
			className={style.createNewArticleWrapper}
			onSubmit={handleSubmit(onSubmit)}
		>
			<header className={style.cnaHeader}>Edit Article</header>
			<div className={style.inputWrapper}>
				<div>
					<div className={style.inputDescription}>Title</div>
					<input
						className={inputTitle}
						placeholder='Title'
						type='text'
						defaultValue={data.title}
						{...register("title", {
							required: "Поле обязательно для заполнения",
						})}
					/>
					<p>{errors.title?.message}</p>
				</div>
				<div>
					<div className={style.inputDescription}>Short-description</div>
					<input
						className={inputShortDescription}
						placeholder='Short-description'
						type='text'
						defaultValue={data.description}
						{...register("description", {
							required: "Поле обязательно для заполнения",
						})}
					/>
					<p>{errors.description?.message}</p>
				</div>
				<div>
					<div className={style.inputDescription}>Text</div>
					<textarea
						className={inputBody}
						placeholder='Text'
						defaultValue={data.body}
						{...register("body", {
							required: "Поле обязательно для заполнения",
						})}
					/>
					<p>{errors.body?.message}</p>
				</div>
				<div className={style.tagsWrapper}>
					<div className={style.inputDescription}>Tags</div>
					<div className={style.tagWrapper}>
						<input
							className={style.inputTag}
							placeholder='Tag'
							type='text'
							value={state.tagInput}
							onChange={(e) => changeTagInput(e.target.value)}
						/>
						<button
							onClick={() => {
								addTagEdit(state.tagInput);
							}}
							type='button'
							className={style.addBtn}
						>
							Add tag
						</button>
					</div>
				</div>
				{oldTags(data)}
				<button className={style.sendButton}>Send</button>
			</div>
		</form>
	);
}

const mapStateProps = (state) => ({
	state,
});

const mapDispatchToProps = (dispatch) => ({
	changeTagInput: (tag) => dispatch(changeTagInput(tag)),
	addTag: (tag) => dispatch(addTag(tag)),
	addTagEdit: (tag) => dispatch(addTagEdit(tag)),
	changeArticleTagInput: (data, index) =>
		dispatch(changeArticleTagInput(data, index)),
	delTagEdit: (index) => dispatch(delTagEdit(index)),
	editArticle: (data, slug) => dispatch(editArticle(data, slug)),
});

export default connect(mapStateProps, mapDispatchToProps)(EditArticle);


