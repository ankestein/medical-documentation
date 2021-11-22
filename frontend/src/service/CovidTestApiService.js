import axios from 'axios';

export function submitCovidTest(newCovidTest) {
	return axios
		.post('/api/covid-test', newCovidTest)
		.then((response) => response.data);
}

export function getCovidTests() {
	return axios.get('/api/covid-test').then((response) => response.data);
}
