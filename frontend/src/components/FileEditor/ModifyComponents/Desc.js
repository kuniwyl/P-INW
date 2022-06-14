import React, { useState } from "react";
import { refreshToken, API_HOST } from "../../../auth";

const Desc = ({fileData, setOutPut}) => {

	const [mean, setMean] = useState("");
	const [median, setMedian] = useState("");
	const [min, setMin] = useState('');
	const [max, setMax] = useState('');
	const [sum, setSum] = useState('');

	const handleDecribe = () => {
		const body = {
			'describe': 'True',
			'file': fileData,
		}
		handleRequest(body);
	}

	const handleMode = () => {
		const body = {
			'mode': 'True',
			'file': fileData,
		}
		handleRequest(body);
	}

	const handleMean = () => {
		const body = {
			'mean': mean,
			'file': fileData,
		}
		handleRequest(body);
	}

	const handleMedian = () => {
		const body = {
			'median': median,
			'file': fileData,
		}
		handleRequest(body)
	}

	const handleMin = () => {
		const body = {
			'min': min,
			'file': fileData,
		}
		handleRequest(body)
	}

	const handleMax = () => {
		const body = {
			'max': max,
			'file': fileData,
		}
		handleRequest(body)
	}

	const handleSum = () => {
		const body = {
			'sum': sum,
			'file': fileData,
		}
		handleRequest(body)
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
				if ( output['describe'] )
					setOutPut( output['describe'] );
				if ( output['mode'] )
					setOutPut( output['mode'] );
				if ( output['mean'] )
					setOutPut( output['mean'] );
				if ( output['median'] )
					setOutPut( output['median'] );		
				if ( output['min'] )
					setOutPut( output['min'] );		
				if ( output['max'] )
					setOutPut( output['max'] );		
				if ( output['sum'] )
					setOutPut( output['sum'] );					
			})
	}

	return(
		<>
			{/* desc / mode */}
			<div
				className="functionChoice"
				>
				<lable
					className="functionLabel"
					>Describe/Mode:
				</lable>
				<button
					onClick={handleDecribe}
					className="functionButton"
					>Describe
				</button>
				<button
					onClick={handleMode}
					className="functionButton"
					>Mode
				</button>
			</div>

			{/* mean */}
			<div
				className="functionChoice"
				>
				<lable
					className="functionLabel"
					>Średnia z kolumny:
				</lable>
				<input
					className="functionInput"
					placeholder="Nazwa kolumny"
					value={mean}
					onChange={(e) => setMean(e.target.value)}
				/>
				<button
					onClick={handleMean}
					className="functionButton"
					>Zatwierdź
				</button>
			</div>

			{/* median */}
			<div
				className="functionChoice"
				>
				<lable
					className="functionLabel"
					>Median z kolumny:
				</lable>
				<input
					className="functionInput"
					placeholder="Nazwa kolumny"
					value={median}
					onChange={(e) => setMedian(e.target.value)}
				/>
				<button
					onClick={handleMedian}
					className="functionButton"
					>Zatwierdź
				</button>
			</div>

			{/* min */}
			<div
				className="functionChoice"
				>
				<lable
					className="functionLabel"
					>Wartość minimalna:
				</lable>
				<input
					className="functionInput"
					placeholder="Nazwa kolumny"
					value={min}
					onChange={(e) => setMin(e.target.value)}
				/>
				<button
					onClick={handleMin}
					className="functionButton"
					>Zatwierdź
				</button>
			</div>

			{/* max */}
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
					value={max}
					onChange={(e) => setMax(e.target.value)}
				/>
				<button
					onClick={handleMax}
					className="functionButton"
					>Zatwierdź
				</button>
			</div>

			{/* sum */}
			<div
					className="functionChoice"
					>
					<lable
						className="functionLabel"
						>Suma wartości:
					</lable>
					<input
						className="functionInput"
						placeholder="Nazwa kolumny"
						value={sum}
						onChange={(e) => setSum(e.target.value)}
					/>
					<button
						onClick={handleSum}
						className="functionButton"
						>Zatwierdź
					</button>
				</div>
		</>
	)
}

export default Desc;