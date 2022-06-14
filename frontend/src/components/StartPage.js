import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Login from "./Log_Reg_User/Login";
import Register from "./Log_Reg_User/Regiser";

const StartPage = () => {
	const [choseView, setChoseView] = useState(true);

	return(
		<>
			<Login choseView={choseView} setChoseView={setChoseView} />
			<Register choseView={choseView} setChoseView={setChoseView}/>
		</>
	)
}

export default StartPage;