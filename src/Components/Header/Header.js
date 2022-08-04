import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import s from "./Header.module.scss";

import avatar from "./img/avatar.png";

import { logOut } from "../Services/Services";

function Header({ state, logOut }) {
	let imgUrl = avatar;
	if (state.image) {
		imgUrl = state.image;
	}

	if (!state.loggedIn) {
		return (
			<header className={s.header}>
				<Link to='/articles/' className={s["main-page"]}>
          Realworld Blog
				</Link>
				<Link to='/sign-in/' className={s["sign-in"]}>
          Sign In
				</Link>
				<Link to='/sign-up/' className={s["sign-up"]}>
          Sign Up
				</Link>
			</header>
		);
	}
	if (state.loggedIn) {
		return (
			<header className={s.header}>
				<Link to='/articles/' className={s["main-page"]}>
          Realworld Blog
				</Link>
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
			</header>
		);
	}
}

const mapStateProps = (state) => ({
	state,
});

const mapDispatchToProps = (dispatch) => ({
	logOut: () => dispatch(logOut()),
});

export default connect(mapStateProps, mapDispatchToProps)(Header);
