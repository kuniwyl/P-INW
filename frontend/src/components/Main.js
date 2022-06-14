import React, { useEffect, useState } from "react";

import Nav from "./FileEditor/Nav";
import ModifyPanel from "./FileEditor/ModifyPanel";
import FileContainer from "./FileEditor/FileContainer";

const Main = () => {

	const [currentFile, setCurrentFile] = useState('');
	const [currentProject, setCurrentProject] = useState('');
	const [fileData, setFileData] = useState('');
	const [outPut, setOutPut] = useState('');

	const [rerender, setRerender] = useState('');
	

	return(
		<>
			<Nav setCurrentFile={setCurrentFile} setCurrentProject={setCurrentProject}/>

			<ModifyPanel fileData={fileData} setFileData={setFileData} currentFile={currentFile} setCurrentFile={setCurrentFile} setOutPut={setOutPut}/>

			<FileContainer outPut={outPut} fileData={fileData} setFileData={setFileData} currentFile={currentFile}/>
		</>
	)
}

export default Main;