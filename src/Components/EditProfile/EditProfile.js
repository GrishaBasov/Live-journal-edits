import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import classnames from "classnames";


import style from "./EditProfile.module.scss";

import { editProfile } from "../../Services/Services";

function EditProfile({ state, editProfile }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	let usernameInput = classnames(style.inputField, {[style.inputWrong] : errors.username});
	let emailInput = classnames( style.inputField,{[style.inputWrong] : errors.email});
	let passwordInput = classnames( style.inputField,{[style.inputWrong] : errors.password});
	let urlInput = classnames( style.inputField,{[style.inputWrong] : errors.url});


	const passwordFoo = (password) => {
		if (password.length === 0) {
			return localStorage.getItem("password");
		}
	};

	const onSubmit = (user) => {
		user = {
			user: {
				password: passwordFoo(user.password),
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
		<form className={style.editProfile} onSubmit={handleSubmit(onSubmit)}>
			<header className={style.editProfileHeader}>Edit Profile</header>
			<div>
				<span className={style.inputSign}>Username</span>
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
				<span className={style.inputSign}>Email address</span>
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
				<span className={style.inputSign}>New password</span>
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
				<span className={style.inputSign}>Avatar image (url)</span>
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
			<div className={style.signUp__footer}>
				<button className={style.btnLogin}>Save</button>
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
