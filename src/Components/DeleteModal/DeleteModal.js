import React from "react";
import { connect } from "react-redux";
import style from "./DeleteModal.module.scss";
import vector from "./img/Vector.png";
import { deleteModuleToggle, deleteArticle } from "../../Services/Services";

function DeleteModal({ state, deleteModuleToggle, deleteArticle }) {
	if (state.deleteModule) {
		return (
			<div className={style.modalWrapper}>
				<div className={style.triangle} />
				<div className={style.mainContentWrapper}>
					<div className={style.headerWrapper}>
						<img
							className={style.vectorImage}
							src={vector}
							alt='восклицательный знак'
						/>
						<div className={style.modalText}>
              Are you sure to delete this article?
						</div>
					</div>
					<div className={style.buttons}>
						<button onClick={deleteModuleToggle} className={style.buttonNo}>
              No
						</button>
						<button
							onClick={() => deleteArticle(state.article.slug)}
							className={style.buttonYes}
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
	deleteArticle: (slug) => dispatch(deleteArticle(slug)),
});

export default connect(mapStateProps, mapDispatchToProps)(DeleteModal);
