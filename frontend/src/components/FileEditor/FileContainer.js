import React, { useEffect, useState } from "react";
import { API_HOST, refreshToken } from "../../auth";
import { CsvToHtmlTable } from 'react-csv-to-table'

const FileContainer = ({outPut, fileData, setFileData, currentFile}) => {

	useEffect(() => {
		if(!fileData)
			handleGetSigleProjectFile();
	}, [currentFile, fileData])

	const handleGetSigleProjectFile = () => {
		const body = {
			'project_file_id': currentFile
		}
		refreshToken(
			getSingleProjectFile,
			body,
		)
	}
	const getSingleProjectFile = (options) => {
		fetch(`${API_HOST}/project/file/get/single`, options)
			.then(res => {
				return res.json()
			})
			.then(data => {
				let f = data.file;
				setFileData(f);
			})
	}

	return(
		<div
			className="fileContainer"
		>
			{outPut 
			?
				<CsvToHtmlTable 
				data={outPut}
				csvDelimiter=","
				tableClassName="table table-striped table-hover"
				/>
			: null 
			}
			<CsvToHtmlTable 
				data={createDataCSVIndex(fileData)}
				csvDelimiter=","
				tableClassName="table table-striped table-hover"
			/>
		</div>
	)
}

function addStr(str, index, stringToAdd){
  return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
}

const createDataCSVIndex = (f) => {
	let count = 0;
	if ( f[0] === ',')return f;
	for( let i = 0; i < f.length - 1; i++ ) { 
		if ( f[i] === '\n' ) {
			f = addStr(f, i+1, `${count++},`);
		}
	}
	f = addStr(f, 0, ',');
	return f;
}

export default FileContainer;