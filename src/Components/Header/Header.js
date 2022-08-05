import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import s from "./Header.module.scss";

import avatar from "./img/avatar.png";

import { logOut, cleanArticle } from "../Services/Services";

function Header({ state, logOut, cleanArticle }) {
	let imgUrl = avatar;
	if (state.image) {
		imgUrl = state.image;
	}

	if (!state.loggedIn) {
		return (
			<header className={s.header}>
				<div className={s["left-side"]}>
					<Link to='/articles/' className={s["main-page"]} onClick={cleanArticle} >
						Realworld Blog
					</Link>
				</div>
				<div className={s["right-side"]}>
					<Link to='/sign-in/' className={s["sign-in"]}>
					Sign In
					</Link>
					<Link to='/sign-up/' className={s["sign-up"]}>
					Sign Up
					</Link>
				</div>
			</header>
		);
	}
	if (state.loggedIn) {
		return (
			<header className={s["header"]}>
				<div className={s["left-side"]}>
					<Link to='/articles/' className={s["main-page"]} onClick={cleanArticle}>
						Realworld Blog
					</Link>
				</div>
				<div className={s["right-side"]}>
					<Link to='/new-article/' className={s["create-article"]}>
						Create article
					</Link>
					<Link to='/profile/' className={s["account-info"]}>
						{state.username}
						<img className={s.avatar} src={imgUrl} alt='фото профиля' />
					</Link>
					<button onClick={logOut} className={s["log-out"]}>
						Log Out
					</button>
				</div>
			</header>
		);
	}
}

const mapStateProps = (state) => ({
	state,
});

const mapDispatchToProps = (dispatch) => ({
	logOut: () => dispatch(logOut()),
	cleanArticle: () => dispatch(cleanArticle())
});

export default connect(mapStateProps, mapDispatchToProps)(Header);
