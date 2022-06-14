import React, { useState } from "react";
import { API_HOST, refreshToken } from "../../../auth";


const Ques = ({fileData, setFileData}) => {
	const [column, setColumn] = useState("");
	const [con, setCon] = useState("");
	const [value, setValue] = useState("");

	const handleWhere = () => {
		const body = {
			'where': {
				column,
				con,
				value,
			},
			'file': fileData,
		};
		handleRequest(body);
	}

	const handleRequest = (body) => {
		refreshToken(
			req,
			body
		);
	}
	const req = (options) => {
		fetch(`${API_HOST}/project/file/options/edit`, options)
			.then(res => { return res.json() })
			.then(data => {
				const output = JSON.parse(data[0])
				if ( output['where'] )
					setFileData( output['where'] );				
			})
	}

	return(
		<>
			{/* where */}
			<div
				className="functionChoice functionChoiceWhere"
				>
				<lable
					className="functionLabel"
					>Wybierz:
				</lable>
				<input
					className="functionInput"
					placeholder="Kolumnę"
					value={column}
					onChange={(e) => setColumn(e.target.value)}
				/>
				<input
					className="functionInput"
					placeholder="Zależność"
					value={con}
					onChange={(e) => setCon(e.target.value)}
				/>
				<input
					className="functionInput"
					placeholder="Wartość"
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
			</div>
			<div>
				<button
					onClick={handleWhere}
					className="functionButton functionButtonWhere"
					>Zatwierdź
				</button>
			</div>
		</>
	)
}

export default Ques;