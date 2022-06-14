export const API_HOST = "api";
export const MEDIA_HOST = "http://localhost:8000/modia";

const user = JSON.parse(localStorage.getItem('user'))
const refresh = JSON.parse(localStorage.getItem('refresh'))

export const refreshToken = (fun, body, mode = "body") => {
	const username = user.username;
	const uploadData = {
		username,
		refresh,
	}

	fetch(`${API_HOST}/auth/refresh/`, requsetOptions(uploadData))
		.then(res => {
			return res.json();
		})
		.then(data => {
			const token = data.access;
			if ( mode === "body"){
				const options = requsetOptionsAccess(body, token);
				fun(options);
			} else { 
				const options = requsetOptionsFormData(body, token);
				fun(options);
			}
		})
} 

const requsetOptions = (uploadData) => {
	return {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json"
		},
		body: JSON.stringify(uploadData),
	}
}

const requsetOptionsAccess = (uploadData, token) => {
	return {
		method: "POST",
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Authorization": `Bearer ${token}`,
		},
		body: JSON.stringify(uploadData),
	}
}

const requsetOptionsFormData = (uploadData, token) => {
	return {
		method: "POST",
		headers: {
			"Content-Type": "multipart/form-data; boundary=----",
			"Authorization": `Bearer ${token}`,
		},
		body: uploadData,
	}
}