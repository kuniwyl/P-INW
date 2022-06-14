import React, { useState } from "react";
import { CSVLink } from "react-csv"


const File = ({fileData, setFileData}) => {

	const [fileName, setFileName] = useState('');

	const handleClick = () => {
		setFileData("");
	}

	return(
		<>
			<div
				className="functionChoice"
				>
				<button
					className="functionButton"
					onClick={handleClick}
					>Przeładuj
				</button>
			</div>

			<div
				className="functionChoice"
				>
				<lable
					className="functionLabel"
					>Pobierz plik:
				</lable>
				<input
					className="functionInput"
					placeholder="Nazwa pliku"
					value={fileName}
					onChange={(e) => setFileName(e.target.value)}
				/>
				<CSVLink
					data={fileData}
					filename={fileName}
					className="CSVLINK"
					target={"_blank"}
				>Pobierz</CSVLink>
			</div>
		</>
	)
}

export default File;