import React, { useEffect, useState } from "react";
import { API_HOST, refreshToken } from "../../../auth";


const FileEditor = ({elem, setCurrentFile, reload, setReolad, setProjectName, setCurrentProject}) => {
	const [pfile_name, setPfile_name] = useState("");
	const [pfile_file, setPfile_file] = useState("");
	const [projectsFiles, setProjectsFiles] = useState('');

	useEffect(() => {
		handleGetProjectFIles();
	}, [reload])

	const handleDelProjectFile = (e) => {
		const body = { 
			"project_file_id": e.target.parentElement.value,
			"project_id": elem.id
		}
		refreshToken(
			delProjectFileHandle,
			body,
		)
	}
	const delProjectFileHandle = (options) => {
		fetch(`${API_HOST}/project/file/del`, options)
			.then(res => res.json())
		setReolad(prev => !prev);
	}
	
	const handleGetProjectFIles = () => {
		const body = {
			"project_id": elem.id
		}
		refreshToken(
			getProjectFileHandle,
			body,
		)
	}
	const getProjectFileHandle = (options) => {
		fetch(`${API_HOST}/project/file/get`, options)
			.then(res => {
				if ( res.status === 200 ) {
					return res.json()
				} else 
					return null;
			})
			.then(data => {
				if ( data ) {
					setProjectsFiles(data);
				} 
			});
	}

	const handleProjectFileAdd = (e) => {
		if (!pfile_file || !pfile_name) {
			return 0;
		}
		if ( !pfile_file['name'].endsWith('.csv') ) {
			return 0;
		}
		const fData = new FormData();
		fData.append('pfile_name', pfile_name);
		fData.append('pfile_file', pfile_file);
		fData.append('project_id', e.target.parentElement.id);
		refreshToken(
			addProjectFileHandle,
			fData,
			"formData"
		)
	}
	const addProjectFileHandle = (options) => {
		fetch(`${API_HOST}/project/file/add`, options)
			.then(res => {
				setProjectName('');
				setReolad(prev => !prev);
			});
	}

	const handleProjectDelete = (e) => {
		var result = window.confirm("Czy na pewno chcesz usunąć?");
		if (result) {
			const user = JSON.parse(localStorage.getItem('user')).id
			const body = {
				project_id: e.target.parentElement.value,
				user,
			}
			refreshToken(
				delProjectHandle,
				body,
			)
		}
	}
	const delProjectHandle = (options) => {
		fetch(`${API_HOST}/project/del`, options)
			.then(res => res.json())
			.then(data => {
				setReolad(prev => !prev);
			});
	}

	return (
		<>
			<li 
				key={elem.id}
				id={elem.id}
				className="liProjectName"
			>
			<span
				onClick={handleShowHide}
				className="spanProjectName"
				>{elem.project_name}
			</span>

			<button
				className="addProjectFile navButton"
				value={elem.id}
				onClick={handleShowHide}
				><i className="fa-solid fa-plus"></i>
			</button>

			<button
				className="deleteProject navButton"
				value={elem.id}
				onClick={handleProjectDelete}
				><i className="fa-solid fa-trash"></i>
			</button>

			<input
				className="fileInput"
				type={"text"}
				value={pfile_name}
				onChange={e => setPfile_name(e.target.value) }
				placeholder={"Nazwa pliku"}
			/>
			<input 
				className="fileInput"	
				type={"file"} 
				onChange={(e) => setPfile_file(e.target.files[0])}
			/>
			<button
				className="fileInput"	
				onClick={handleProjectFileAdd}
				>Dodaj
			</button>
			{ projectsFiles ?
				<ul>
					{projectsFiles.map((elemnt, index) => 
						<li 
							id={elemnt.pfile_name}
							className="fileName"
							onClick={() => {
								setCurrentFile(elemnt.id)
								setCurrentProject(elem.id)
								setReolad(prev => !prev);
							}}
							>{elemnt.pfile_name}
							<button
								className="deleteProject navButton"
								value={elemnt.id}
								onClick={handleDelProjectFile}
								><i className="fa-solid fa-trash"></i>
							</button>
						</li>
					)}
				</ul> : null }
			</li>
		</>
	)
}

const handleShowHide = (e) => {
	const isActive = 'active';
	const tar = e.currentTarget.parentElement;
	const sp = tar.children[0].offsetHeight;
	const chil = tar.children;
	let size = 0;
	for(let i = 1; i < chil.length; i++){
		size = size + chil[i].offsetHeight
	}
	if (tar.classList.contains(isActive)){
		tar.style.height = sp + 10 + 'px';
		tar.classList.remove(isActive);
	}
	else {
		tar.style.height = tar.offsetHeight + size - 20 + 'px';
		tar.classList.add(isActive);
	}
}

export default FileEditor;