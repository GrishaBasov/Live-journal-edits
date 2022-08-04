import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

import s from "./EditProfile.module.scss";

import { editProfile } from "../Services/Services";

function EditProfile({ state, editProfile }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	let usernameInput = s["input-field"];
	let emailInput = s["input-field"];
	let passwordInput = s["input-field"];
	let urlInput = s["input-field"];

	if (errors.username) {
		usernameInput = `${s["input-field"]} ${s["input-wrong"]}`;
	}
	if (errors.email) {
		emailInput = `${s["input-field"]} ${s["input-wrong"]}`;
	}
	if (errors.password) {
		passwordInput = `${s["input-field"]} ${s["input-wrong"]}`;
	}
	if (errors.url) {
		urlInput = `${s["input-field"]} ${s["input-wrong"]}`;
	}

	const onSubmit = (user) => {
		user = {
			user: {
				password: user.password,
				email: user.email,
				token: state.token,
				username: user.username,
				image: user.url,
			},
		};
		editProfile(user);
	};

	if (!state.loggedIn) {
		return null;
	}

	return (
		<form className={s["edit-profile"]} onSubmit={handleSubmit(onSubmit)}>
			<header className={s["edit-profile-header"]}>Edit Profile</header>
			<div>
				<span className={s["input-sign"]}>Username</span>
				<input
					className={usernameInput}
					defaultValue={state.username}
					{...register("username", {
						required: "Поле обязательно для заполнения",
					})}
				/>
				<p>{errors.username?.message}</p>
				<p>{state.errors?.username}</p>
			</div>
			<div>
				<span className={s["input-sign"]}>Email address</span>
				<input
					defaultValue={state.email}
					className={emailInput}
					{...register("email", {
						required: "Поле обязательно для заполнения",
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: "Адрес введён некорректно",
						},
					})}
				/>
				<p>{errors.email?.message}</p>
				<p>{state.errors?.email}</p>
			</div>
			<div>
				<span className={s["input-sign"]}>New password</span>
				<input
					placeholder={"New password"}
					className={passwordInput}
					type='password'
					{...register("password", {
						minLength: {
							value: 6,
							message: "Минимум 6 символов",
						},
						maxLength: {
							value: 40,
							message: "Максимум 40 символов",
						},
					})}
				/>
				<p>{errors.password?.message}</p>
			</div>
			<div>
				<span className={s["input-sign"]}>Avatar image (url)</span>
				<input
					placeholder={"Avatar image"}
					className={urlInput}
					{...register("url", {
						pattern: {
							value: /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/,
							message: "Введите правильный URL",
						},
					})}
				/>
				<p>{errors.url?.message}</p>
			</div>
			<div className={s["sign-up__footer"]}>
				<button className={s["btn-login"]}>Save</button>
			</div>
		</form>
	);
}

const mapStateProps = (state) => ({
	state,
});

const mapDispatchToProps = (dispatch) => ({
	editProfile: (user) => dispatch(editProfile(user)),
});

export default connect(mapStateProps, mapDispatchToProps)(EditProfile);
