import { Spin } from "antd";
import React from "react";
import style from "./Spinner.module.scss";

function Spinner() {
	return (
		<div className={style.spinner}>
			<Spin />
		</div>
	);
}

export default Spinner;
