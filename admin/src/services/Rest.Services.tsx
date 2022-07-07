import { fakeAuthProvider } from "./Auth.Services"

export const Rest = {
	get: (url: string) => {
		const requestOptions = {
			method: 'GET',
			headers: authHeader(url)
		}

		return fetch(url, requestOptions)
			.then(handleResponse)
	},
	put: (url: string) => {
		const requestOptions = {
			method: 'PUT',
			headers: authHeader(url)
		}
		return fetch(url, requestOptions)
			.then(handleResponse)
	},
	delete: (url: string) => {
		const requestOptions = {
			method: 'DELETE',
			headers: authHeader(url)
		}
		return fetch(url, requestOptions)
			.then(handleResponse)
	},
	post: (url: string, body: {}) => {
		console.log(body, 'Rest.Post')
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', ...authHeader(url) },
			body: JSON.stringify(body)
		}
		return fetch(url, requestOptions)
			.then(handleResponse)
	}
}

function authHeader(url: string) {
	let headers = {
		"Access-Control-Allow-Credentials": "true",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET,OPTIONS,DELETE,POST,PUT",
		"X-AUTH-TOKEN": ""
		// "Access-Control-Allow-Headers":"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
	}
	if (fakeAuthProvider.isAuthenticated) {
		headers["X-AUTH-TOKEN"] = fakeAuthProvider.token()
	}
	return headers
}

function handleResponse(response: Response) {
	return response.text().then(text => {
		const data = text && JSON.parse(text);

		if (!response.ok) {
			if ([401, 403].includes(response.status)) {
				// auto logout if 401 Unauthorized or 403 Forbidden response returned from api
				// userService.logout();
			}

			const error = (data && data.message) || response.statusText;
			return Promise.reject(error);
		}

		return data;
	});
}