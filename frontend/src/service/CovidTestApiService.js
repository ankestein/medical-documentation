import axios from 'axios';

const getHeader = (token) => {
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
};

export function submitCovidTest(newCovidTest, token) {
	return axios
		.post('/api/covid-test', newCovidTest, getHeader(token))
		.then((response) => response.data);
}

export function getCovidTests(token) {
	return axios
		.get('/api/covid-test', getHeader(token))
		.then((response) => response.data);
}
