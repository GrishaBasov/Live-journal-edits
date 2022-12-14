import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import classnames from "classnames";

import {
	addTag,
	changeTagInput,
	createArticle,
	delTag,
} from "../../Services/Services";

import style from "./CreateNewArticle.module.scss";


function CreateNewArticle({
	state,
	changeTagInput,
	addTag,
	delTag,
	createArticle,
}) {
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
				tagList: state.tagList,
				token: state.token,
			},
		};
		createArticle(article);
	};

	const elements = (state) =>
		state.tagList.map((item, index) => (
			<div key={index} className={style.tagWrapper}>
				<input className={style.inputTag} value={item} readOnly />
				<button
					onClick={() => delTag(index)}
					type='button'
					className={style.deleteBtn}
				>
          Delete
				</button>
			</div>
		));

	let inputTitle = classnames(style.inputTitle, {[style.inputWrong] : errors.title});
	let inputShortDescription = classnames( style.inputShortDescription,{[style.inputWrong] : errors.description});
	let inputBody = classnames( style.inputText,{[style.inputWrong] : errors.body});

	return (
		<form
			className={style.createNewArticleWrapper}
			onSubmit={handleSubmit(onSubmit)}
		>
			<header className={style.cnaHeader}>Create New Article</header>
			<div className={style.inputWrapper}>
				<div>
					<div className={style.inputDescription}>Title</div>
					<input
						className={inputTitle}
						placeholder='Title'
						type='text'
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
								addTag(state.tagInput);
							}}
							type='button'
							className={style.addBtn}
						>
              Add tag
						</button>
					</div>
				</div>
				{elements(state)}
				<button className={style.sendButton}>Send</button>
			</div>
		</form>
	);
}

const mapStateProps = (state) => ({
	state,
});

const mapDispatchToProps = (dispatch) => ({
	changeTagInput: (data) => dispatch(changeTagInput(data)),
	addTag: (tag) => dispatch(addTag(tag)),
	delTag: (index) => dispatch(delTag(index)),
	createArticle: (data) => dispatch(createArticle(data)),
});

export default connect(mapStateProps, mapDispatchToProps)(CreateNewArticle);
