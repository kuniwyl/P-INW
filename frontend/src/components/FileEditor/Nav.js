import React, { useEffect, useState } from "react";
import { API_HOST, refreshToken } from "../../auth";

import FileEditor from "./NavComponents.js/FileEditor";

const Nav = ({setCurrentFile, setCurrentProject}) => { 

	const [project_name, setProjectName] = useState('');
	const [projects, setProjects] = useState([]);
	const [reload, setReolad] = useState(true);

	useEffect(() => {
		const liM = document.getElementsByClassName('liProjectName');
		for(let i = 0; i < liM.length; i++){
			liM[i].style.height = liM[i].children[0].offsetHeight + 10 + 'px';
		}
	})

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user')).id
		const body = {
			user,
		}
		refreshToken(
			getProjectHandle,
			body,
		)
	}, [reload]);
	const getProjectHandle = (options) => {
		fetch(`${API_HOST}/project/get`, options)
			.then(res => {
				if ( res.status == 200 )
					return res.json()
				else return 1;
			})
			.then(data => {
				if ( data != 1 )
					setProjects(data)
			});
	}

	const handleProjectAdd = () => {
		const user = JSON.parse(localStorage.getItem('user')).id
		const body = {
			project_name,
			user,
		}
		refreshToken(
			addProjectHandle,
			body,
		)
	}
	const addProjectHandle = (options) => {
		fetch(`${API_HOST}/project/add`, options)
			.then(res => {
				setProjectName('');
				setReolad(prev => !prev);
			});
	}

	return (
		<nav>
			<span 
				id="projectTitle"
				>Twoje projekty
			</span>

			<input
				id="addProjectInput"
				className="projectAdd"
				type={"text"}	
				onChange={e => setProjectName(e.target.value) }
				value={project_name}
				placeholder="Nazwa projektu"
			/>
			<button 
				id="addProjectButton"
				className="projectAdd"
				onClick={handleProjectAdd}
			>Dodaj projekt
			</button>
			<ul 
				className="navUl"
				>{projects 
					? projects.map((elem, i) => 
						<FileEditor elem={elem} setCurrentFile={setCurrentFile} 
						reload={reload} setReolad={setReolad} setProjectName={setProjectName} setCurrentProject={setCurrentProject}/>)
					: null}
			</ul>	
		</nav>
	)
}

export default Nav;