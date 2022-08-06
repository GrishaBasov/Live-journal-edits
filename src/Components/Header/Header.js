import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import style from "./Header.module.scss";

import avatar from "./img/avatar.png";

import { logOut, cleanArticle } from "../../Services/Services";

function Header({ state, logOut, cleanArticle }) {
	let imgUrl = avatar;
	if (state.image) {
		imgUrl = state.image;
	}

	if (!state.loggedIn) {
		return (
			<header className={style.header}>
				<div className={style.leftSide}>
					<Link to='/articles/' className={style.mainPage} onClick={cleanArticle} >
						Realworld Blog
					</Link>
				</div>
				<div className={style.rightSide}>
					<Link to='/sign-in/' className={style.signIn}>
					Sign In
					</Link>
					<Link to='/sign-up/' className={style.signUp}>
					Sign Up
					</Link>
				</div>
			</header>
		);
	}
	if (state.loggedIn) {
		return (
			<header className={style.header}>
				<div className={style.leftSide}>
					<Link to='/articles/' className={style.mainPage} onClick={cleanArticle}>
						Realworld Blog
					</Link>
				</div>
				<div className={style.rightSide}>
					<Link to='/new-article/' className={style.createArticle}>
						Create article
					</Link>
					<Link to='/profile/' className={style.accountInfo}>
						{state.username}
						<img className={style.avatar} src={imgUrl} alt='фото профиля' />
					</Link>
					<button onClick={logOut} className={style.logOut}>
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
