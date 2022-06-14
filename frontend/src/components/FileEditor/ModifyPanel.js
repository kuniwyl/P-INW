import React, { useState } from "react";

import File from "./ModifyComponents/File";
import Desc from "./ModifyComponents/Desc";
import Ques from "./ModifyComponents/Ques";
import Edition from "./ModifyComponents/Edition";

const listOfModi = [
	{
		name: "plik",
	},
	{
		name: "opis",
	},
	{
		name: "edycja",
	},
	{
		name: "zapytanie",
	},
]

const ModifyPanel = ({fileData, setFileData, currentFile, setCurrentFile, setOutPut}) => {
	const [activeElement, setActiveElement] = useState('');
	const active = "activeSelector";

	const setActive = id => {
		const lis = document.getElementsByClassName('modyfiSelector')[0].children;
		for(let i = 0; i < lis.length; i++){
			if (lis[i].id == id){
				lis[i].classList.add(active);
			} else {
				lis[i].classList.remove(active);
			}
		}
	}

	const handleChoise = (e) => {
		setActiveElement(e.target.id);
		setActive(e.target.id);
	}

	return(
		<div className="modifyPanel">
			<div
				className="choseModification"
				>
				<ul className="modyfiSelector">
					{listOfModi.map(elem => 
						<li
							onClick={handleChoise}
							id={elem.name}
							>
							<span 
								id={elem.name}
								className="positionCenter"
								>{elem.name}
							</span>
						</li>
					)}
				</ul>
			</div>

			<div className="modyfiPanel">
				{activeElement == "plik" ? <File fileData={fileData} setFileData={setFileData} /> : null}
				{activeElement == "opis" ? <Desc fileData={fileData} setOutPut={setOutPut}/> : null}
				{activeElement == "edycja" ? <Edition fileData={fileData} setFileData={setFileData}/> : null}
				{activeElement == "zapytanie" ? <Ques fileData={fileData} setFileData={setFileData} /> : null}
			</div>
		</div>
	)
}

export default ModifyPanel;