import axios from 'axios';

export function getGreetings() {
	return axios
		.get('/api/greeting')
		.then((response) => response.data)
		.catch(console.error);
}
