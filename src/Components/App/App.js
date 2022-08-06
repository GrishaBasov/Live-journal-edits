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

import { getArticle, logIn } from "../../Services/Services";

function App({ state, logIn }) {
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

	let moduleDisable = style.displayNone;
	let mainWrapper = style.mainWrapper;

	if (state.deleteModule) {
		moduleDisable = style.moduleDisable;
		mainWrapper = `${style.mainWrapper} ${style.overflowHidden}`;
	}

	function PrivateRoute({ component: Component, ...rest }) {
		return (
			<Route
				{...rest}
				render={props =>
					!state.loggedIn ? (
						<Component {...props} />
					) : (
						<Redirect
							to={{
								pathname: "/articles/",
							}}
						/>
					)
				}
			/>
		);
	}

	function PrivateRouteLoggedIn({ component: Component, ...rest }) {
		return (
			<Route
				{...rest}
				render={props =>
					state.loggedIn ? (
						<Component {...props} />
					) : (
						<Redirect
							to={{
								pathname: "/articles/",
							}}
						/>
					)
				}
			/>
		);
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
					return (
						<FullArticle slug={slug} />
					);
				}}
			/>
			<PrivateRoute path={"/sign-up/"} exact component={SignUp} />
			<PrivateRoute path={"/sign-in/"} exact component={SignIn}/>
			<PrivateRouteLoggedIn path={"/profile/"} exact component={EditProfile}/>

			<Route path={"/articles/:slug/edit"} render = {() => <EditArticle />}/>

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
