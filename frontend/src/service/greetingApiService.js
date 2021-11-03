import axios from 'axios';

export function getGreetings() {
	return (
		axios
			.get('/api/greeting')
			//.then((response) => response.data)
			.then((response) => {
				console.log('GET response data:');
				console.log(response.data);
				return response.data;
			})
			.catch(console.error)
	);
}
