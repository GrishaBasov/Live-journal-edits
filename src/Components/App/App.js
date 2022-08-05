import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import style from "./App.module.scss";

import Header from "../Header";
import SignUp from "../SignUp";
import SignIn from "../SignIn";
import EditProfile from "../EditProfile";
import ArticleList from "../ArticleList";
import CreateNewArticle from "../CreateNewArticle";
import FullArticle from "../FullArticle";
import EditArticle from "../EditArticle";

import { getArticle, logIn } from "../Services/Services";

function App({ state, getArticle, logIn }) {
	useEffect(() => {
		if (localStorage.getItem("email")) {
			const user = {
				user: {
					email: localStorage.getItem("email"),
					password: localStorage.getItem("password"),
				},
			};
			logIn(user);
		}
	}, []);

	let moduleDisable = style["display-none"];
	let mainWrapper = style["main-wrapper"];

	if (state.deleteModule) {
		moduleDisable = style["module-disable"];
		mainWrapper = `${style["main-wrapper"]} ${style["overflow-hidden"]}`;
	}

	return (
		<div className={mainWrapper}>
			<div className={moduleDisable} />
			<Header />
			<Route exact path='/'><Redirect to='/articles/' />
			</Route>
			<Route path='/articles/' exact render={() => <ArticleList />} />
			<Route
				path='/articles/:slug'
				exact
				render={({ match }) => {
					const { slug } = match.params;
					if (slug !== state.article.slug) {
						getArticle(slug);
					}
					if (state.article.length !== 0) {
						return (
							<FullArticle data={state.article} loggedIn={state.loggedIn} />
						);
					}
				}}
			/>
			<Route
				path='/articles/:slug/edit'
				render={({ match }) => {
					const { slug } = match.params;
					if (slug !== state.article.slug) {
						getArticle(slug);
					}
					if (state.article.length !== 0 && state.loggedIn) {
						return <EditArticle data={state.article} />;
					}
					if (!state.loggedIn) {
						return <Redirect to={"/articles/"} />;
					}
				}}
			/>
			<Route path='/sign-up/' render={() =>{
				if (state.loggedIn) {
					return <Redirect to={"/articles/"} />;
				} else {
					return <SignUp />;
				}
			}}/>
			<Route path='/sign-in/' render={() =>{
				if (state.loggedIn) {
					return <Redirect to={"/articles/"} />;
				} else {
					return <SignIn />;
				}
			}}/>
			<Route path='/profile/' render={() => <EditProfile />} />
			<Route path='/new-article/' render={() =>{
				if (state.loggedIn) {
					return <CreateNewArticle />;
				}
				return <Redirect to='/sign-in/' />;
			} }>
			</Route>
		</div>
	);
}

const mapStateProps = (state) => ({
	state,
});

const mapDispatchToProps = (dispatch) => ({
	getArticle: (slug) => dispatch(getArticle(slug)),
	logIn: (user) => dispatch(logIn(user)),
});

export default connect(mapStateProps, mapDispatchToProps)(App);
