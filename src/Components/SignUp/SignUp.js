import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import s from "./SignUp.module.scss";
import { createNewUser } from "../Services/Services";

function SignUp({ state, createNewUser }) {
	const {
		watch,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (user) => {
		user = {
			user: {
				email: user.email,
				password: user.password,
				username: user.username,
			},
		};
		createNewUser(user);
	};

	let usernameInput = s["input-field"];
	let emailInput = s["input-field"];
	let passwordInput = s["input-field"];
	let passwordRepeat = s["input-field"];
	if (errors.username) {
		usernameInput = `${s["input-field"]} ${s["input-wrong"]}`;
	}
	if (errors.email) {
		emailInput = `${s["input-field"]} ${s["input-wrong"]}`;
	}
	if (errors.password) {
		passwordInput = `${s["input-field"]} ${s["input-wrong"]}`;
	}
	if (errors.passwordRepeat) {
		passwordRepeat = `${s["input-field"]} ${s["input-wrong"]}`;
	}

	if (state.loggedIn) {
		return null;
	}

	return (
		<form className={s["sign-up"]} onSubmit={handleSubmit(onSubmit)}>
			<header className={s["sign-up-header"]}>Create New Account</header>
			<div>
				<span className={s["input-sign"]}>Username</span>
				<input
					placeholder={"Username"}
					className={usernameInput}
					{...register("username", {
						required: "Поле обязательно для заполнения",
						minLength: {
							value: 4,
							message: "Минимум 4 символа",
						},
						maxLength: {
							value: 20,
							message: "Максимум 20 символов",
						},
					})}
				/>

				<p>{errors.username?.message}</p>
				<p>{state.errors?.username}</p>
			</div>
			<div>
				<span className={s["input-sign"]}>Email address</span>
				<input
					placeholder={"Email address"}
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
				<span className={s["input-sign"]}>Password</span>
				<input
					placeholder={"Password"}
					className={passwordInput}
					type='password'
					{...register("password", {
						required: "Поле обязательно для заполнения",
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
				<span className={s["input-sign"]}>Repeat Password</span>
				<input
					placeholder={"Repeat Password"}
					className={passwordRepeat}
					type='password'
					{...register("passwordRepeat", {
						required: "Поле обязательно для заполнения",
						validate: (value) =>
							value === watch("password") || "Пароли не совпадают",
					})}
				/>
				<p>{errors.passwordRepeat?.message}</p>
			</div>
			<label className={s.check}>
				<input
					type='checkbox'
					className={s.check__input}
					{...register("checkbox", {
						required:
              "Требуется ваше согласие на обработку персональных данных",
					})}
				/>
				<span className={s.check__box} />
				<span className={s.check__description}>
          I agree to the processing of my personal information
				</span>
			</label>
			<p>{errors.checkbox?.message}</p>
			<div className={s["sign-up__footer"]}>
				<button className={s["btn-create"]}>Create</button>
				<span className={s["footer-caption"]}>
          Already have account?{" "}
					<Link to='/sign-in/' className={s["sign-up-footer__a"]}>
            Sign In
					</Link>
				</span>
			</div>
		</form>
	);
}

const mapStateProps = (state) => ({
	state,
});

const mapDispatchToProps = (dispatch) => ({
	createNewUser: (user) => dispatch(createNewUser(user)),
});

export default connect(mapStateProps, mapDispatchToProps)(SignUp);
