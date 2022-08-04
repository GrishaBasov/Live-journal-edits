import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import s from "../CreateNewArticle/CreateNewArticle.module.scss";
import {
	changeArticleTagInput,
	changeTagInput,
	addTagEdit,
	delTagEdit,
	editArticle,
} from "../Services/Services";

function EditArticle({
	changeArticleTagInput,
	data,
	state,
	changeTagInput,
	addTagEdit,
	delTagEdit,
	editArticle,
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
				tagList: state.article.tagList,
				token: state.token,
			},
		};
		editArticle(article, state.article.slug);
	};

	const elements = (data) =>
		data.tagList.map((item, index) => {
			if (item.length === 0) {
				return null;
			}
			return (
				<div key={index} className={s["tag-wrapper"]}>
					<input
						className={s["input-tag"]}
						value={item}
						onChange={(e) => changeArticleTagInput(e.target.value, index)}
					/>
					<button
						onClick={() => delTagEdit(index)}
						type='button'
						className={s["delete-btn"]}
					>
            Delete
					</button>
				</div>
			);
		});

	let inputTitle = s["input-title"];
	if (errors.title) {
		inputTitle += ` ${s["input-wrong"]}`;
	}
	let inputShortDescription = s["input-short-description"];
	if (errors.description) {
		inputShortDescription += ` ${s["input-wrong"]}`;
	}
	let inputBody = s["input-text"];
	if (errors.body) {
		inputBody += ` ${s["input-wrong"]}`;
	}

	return (
		<form
			className={s["create-new-article-wrapper"]}
			onSubmit={handleSubmit(onSubmit)}
		>
			<header className={s["cna-header"]}>Edit Article</header>
			<div className={s["input-wrapper"]}>
				<div>
					<div className={s["input-description"]}>Title</div>
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
					<div className={s["input-description"]}>Short-description</div>
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
					<div className={s["input-description"]}>Text</div>
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
				<div className={s["tags-wrapper"]}>
					<div className={s["input-description"]}>Tags</div>
					<div className={s["tag-wrapper"]}>
						<input
							className={s["input-tag"]}
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
							className={s["add-btn"]}
						>
              Add tag
						</button>
					</div>
				</div>
				{elements(data)}
				<button className={s["send-button"]}>Send</button>
			</div>
		</form>
	);
}

const mapStateProps = (state) => ({
	state,
});

const mapDispatchToProps = (dispatch) => ({
	changeTagInput: (tag) => dispatch(changeTagInput(tag)),
	addTagEdit: (tag) => dispatch(addTagEdit(tag)),
	changeArticleTagInput: (data, index) =>
		dispatch(changeArticleTagInput(data, index)),
	delTagEdit: (index) => dispatch(delTagEdit(index)),
	editArticle: (data, slug) => dispatch(editArticle(data, slug)),
});

export default connect(mapStateProps, mapDispatchToProps)(EditArticle);
