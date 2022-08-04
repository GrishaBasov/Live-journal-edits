import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { logIn } from "../Services/Services";
import s from "./SignIn.module.scss";

function SignIn({ state, logIn }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (user) => {
		user = {
			user: {
				email: user.email,
				password: user.password,
			},
		};
		logIn(user);
	};

	let emailInput = s["input-field"];
	let passwordInput = s["input-field"];
	if (errors.email) {
		emailInput = `${s["input-field"]} ${s["input-wrong"]}`;
	}
	if (errors.password) {
		passwordInput = `${s["input-field"]} ${s["input-wrong"]}`;
	}

	if (state.loggedIn) {
		return null;
	}

	return (
		<form className={s["sign-in"]} onSubmit={handleSubmit(onSubmit)}>
			<header className={s["sign-in-header"]}>Sign In</header>
			<div>
				<span className={s["input-sign"]}>Email address</span>
				{/* <input className={s["input-field"]} type="text" /> */}
				<input
					className={emailInput}
					placeholder={"Email address"}
					{...register("email", {
						required: "Поле обязательно для заполнения",
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: "Адрес введён некорректно",
						},
					})}
				/>
				<p>{errors.email?.message}</p>
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
				<p>
					{state.errors &&
            `Email or password ${state.errors["email or password"]}`}
				</p>
			</div>
			<div className={s["sign-up__footer"]}>
				<button className={s["btn-login"]}>Login</button>
				<span className={s["footer-caption"]}>
          Don’t have an account?{" "}
					<Link to='/sign-up/' className={s["sign-in-footer__a"]}>
            Sign Up
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
	logIn: (user) => dispatch(logIn(user)),
});

export default connect(mapStateProps, mapDispatchToProps)(SignIn);
