import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import s from "./CreateNewArticle.module.scss";
import {
	addTag,
	changeTagInput,
	createArticle,
	delTag,
} from "../Services/Services";

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
		console.log(state.tagList);
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
			<div key={index} className={s["tag-wrapper"]}>
				<input className={s["input-tag"]} value={item} readOnly />
				<button
					onClick={() => delTag(index)}
					type='button'
					className={s["delete-btn"]}
				>
          Delete
				</button>
			</div>
		));

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
			<header className={s["cna-header"]}>Create New Article</header>
			<div className={s["input-wrapper"]}>
				<div>
					<div className={s["input-description"]}>Title</div>
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
					<div className={s["input-description"]}>Short-description</div>
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
					<div className={s["input-description"]}>Text</div>
					<textarea
						className={inputBody}
						placeholder='Text'
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
								addTag(state.tagInput);
							}}
							type='button'
							className={s["add-btn"]}
						>
              Add tag
						</button>
					</div>
				</div>
				{elements(state)}
				<button className={s["send-button"]}>Send</button>
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
