import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import style from "./SignUp.module.scss";
import { createNewUser } from "../../Services/Services";
import classnames from "classnames";

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

	let usernameInput = classnames(style.inputField, {[style.inputWrong] : errors.username});
	let emailInput = classnames( style.inputField,{[style.inputWrong] : errors.email});
	let passwordInput = classnames( style.inputField,{[style.inputWrong] : errors.password});
	let passwordRepeat = classnames( style.inputField,{[style.inputWrong] : errors.passwordRepeat});

	return (
		<form className={style.signUp} onSubmit={handleSubmit(onSubmit)}>
			<header className={style.signUpHeader}>Create New Account</header>
			<div>
				<span className={style.inputSign}>Username</span>
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
				<span className={style.inputSign}>Email address</span>
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
				<span className={style.inputSign}>Password</span>
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
				<span className={style.inputSign}>Repeat Password</span>
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
			<label className={style.check}>
				<input
					type='checkbox'
					className={style.check__input}
					{...register("checkbox", {
						required:
              "Требуется ваше согласие на обработку персональных данных",
					})}
				/>
				<span className={style.check__box} />
				<span className={style.check__description}>
          I agree to the processing of my personal information
				</span>
			</label>
			<p>{errors.checkbox?.message}</p>
			<div className={style.signUp__footer}>
				<button className={style.btnCreate}>Create</button>
				<span className={style.footerCaption}>
          Already have account?{" "}
					<Link to='/sign-in/' className={style.signUpFooter__a}>
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
