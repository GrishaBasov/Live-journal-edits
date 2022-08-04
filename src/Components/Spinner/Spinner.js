import { Spin } from "antd";
import React from "react";
import s from "./Spinner.module.scss";

function Spinner() {
	return (
		<div className={s.spinner}>
			<Spin />
		</div>
	);
}

export default Spinner;
