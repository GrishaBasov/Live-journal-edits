import React from "react";
import { connect } from "react-redux";
import s from "./DeleteModal.module.scss";
import vector from "./img/Vector.png";
import { deleteModuleToggle, deleteArticle } from "../Services/Services";

function DeleteModal({ state, deleteModuleToggle, deleteArticle }) {
	if (state.deleteModule) {
		return (
			<div className={s["modal-wrapper"]}>
				<div className={s.triangle} />
				<div className={s["main-content-wrapper"]}>
					<div className={s["header-wrapper"]}>
						<img
							className={s["vector-image"]}
							src={vector}
							alt='восклицательный знак'
						/>
						<div className={s["modal-text"]}>
              Are you sure to delete this article?
						</div>
					</div>
					<div className={s.buttons}>
						<button onClick={deleteModuleToggle} className={s["button-no"]}>
              No
						</button>
						<button
							onClick={() => deleteArticle(state.token, state.article.slug)}
							className={s["button-yes"]}
						>
              Yes
						</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateProps = (state) => ({
	state,
});

const mapDispatchToProps = (dispatch) => ({
	deleteModuleToggle: () => dispatch(deleteModuleToggle()),
	deleteArticle: (token, slug) => dispatch(deleteArticle(token, slug)),
});

export default connect(mapStateProps, mapDispatchToProps)(DeleteModal);
