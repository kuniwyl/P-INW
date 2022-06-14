import React, { useState } from "react";
import { API_HOST, refreshToken } from "../../../auth";

const Edition = ({fileData, setFileData}) => {
	const [from, setFrom] = useState("");
	const [to, setTo] = useState("");
	const [choiceColumns, setChoiceColumns] = useState('');
	const [oldName, setOldName] = useState('');
	const [newName, setNewName] = useState('');
	const [sortColumn, setSortColumn] = useState('');
	const [ascending, setAscending] = useState('Rosnąco');
	const [delColumn, setDelColumn] = useState('');

	const handleChoiceRows = () => {
		const body = {
			'choice_rows': {
				from,
				to,
			},
			'file': fileData,
		};
		handleRequest(body);
	}

	const handleChoiceColumn = () => {
		const body = {
			'choice_columns': choiceColumns,
			'file': fileData,
		};
		handleRequest(body);
	}

	const handleChangeName = () => {
		const body = {
			'rename_columns': {
				'old': oldName,
				'new': newName,
			},
			'file': fileData,
		};
		handleRequest(body);
	}

	const hadnleDeleteNulls = () => {
		const body = {
			'file': fileData,
			'remove_nulls': "True",
		};
		handleRequest(body);
	}

	const hadnleSort = () => {
		let asce = 1;
		if( ascending === 'Rosnąco') asce = 0;
		const body = {
			'file': fileData,
			'sorting': {
				'column': sortColumn,
				'asce': asce,
			},
		};
		handleRequest(body);
	}

	const handleDelColumn = () => {
		const body = { 
			'del_column': delColumn,
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

				if ( output['choice_rows'] )
					setFileData( output['choice_rows'] );
				if ( output['choice_columns'] )
					setFileData( output['choice_columns'] );
				if ( output['rename_columns'] )
					setFileData( output['rename_columns'] );
				if ( output['remove_nulls'] )
					setFileData( output['remove_nulls'] );		
				if ( output['sorting'] )
					setFileData( output['sorting'] );		
				if ( output['del_column'] )
					setFileData( output['del_column'] );					
			})
	}

	return(
		<>
			{/* choice_rows */}
			<div
				className="functionChoice"
				>
				<lable
					className="functionLabel"
					>Wybierz wiersze:
				</lable>
				<input
					className="functionInput"
					placeholder="Od"
					value={from}
					onChange={(e) => setFrom(e.target.value)}
				/>
				<input
					className="functionInput"
					placeholder="Do"
					value={to}
					onChange={(e) => setTo(e.target.value)}
				/>
				<button
					onClick={handleChoiceRows}
					className="functionButton"
					>Zatwierdź
				</button>
			</div>

			{/* choice_columns */}
			<div
				className="functionChoice"
				>
				<lable
					className="functionLabel"
					>Wybierz kolumne:
				</lable>
				<input
					className="functionInput"
					placeholder="Nazwa kolumny"
					value={choiceColumns}
					onChange={(e) => setChoiceColumns(e.target.value)}
				/>
				<button
					onClick={handleChoiceColumn}
					className="functionButton"
					>Zatwierdź
				</button>
			</div>

			{/* rename_columns */}
			<div
				className="functionChoice"
				>
				<lable
					className="functionLabel"
					>Zmień nazwę kolumny:
				</lable>
				<input
					className="functionInput"
					placeholder="Obecna nazwa"
					value={oldName}
					onChange={(e) => setOldName(e.target.value)}
				/>
				<input
					className="functionInput"
					placeholder="Nowa nazwa"
					value={newName}
					onChange={(e) => setNewName(e.target.value)}
				/>
				<button
					onClick={handleChangeName}
					className="functionButton"
					>Zatwierdź
				</button>
			</div>

			{/* remove_nulls */}
			<div
				className="functionChoice"
				>
				<lable
					className="functionLabel"
					>Usuń wartości null-owe:
				</lable>
				<button
					onClick={hadnleDeleteNulls}
					className="functionButton"
					>Zatwierdź
				</button>
			</div>

			{/* sorting */}
			<div
				className="functionChoice"
				>
				<lable
					className="functionLabel"
					>Wartość największa:
				</lable>
				<input
					className="functionInput"
					placeholder="Nazwa kolumny"
					value={sortColumn}
					onChange={(e) => setSortColumn(e.target.value)}
				/>
				<input
					className="functionInput"
					readOnly="True"
					value={ascending}
					onClick={(e) => {
						if ( ascending === 'Rosnąco')
							setAscending('Malejąco')
						else
							setAscending('Rosnąco')
					}}
				/>
				<button
					onClick={hadnleSort}
					className="functionButton"
					>Zatwierdź
				</button>
			</div>

			{/* del_column */}
			<div
					className="functionChoice"
					>
					<lable
						className="functionLabel"
						>Usuń kolumnę:
					</lable>
					<input
						className="functionInput"
						placeholder="Nazwa kolumny"
						value={delColumn}
						onChange={(e) => setDelColumn(e.target.value)}
					/>
					<button
						onClick={handleDelColumn}
						className="functionButton"
						>Zatwierdź
					</button>
				</div>
		</>
	)
}

export default Edition;