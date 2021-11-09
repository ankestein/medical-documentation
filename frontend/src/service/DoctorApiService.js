import axios from 'axios';

export function submitDoctor(newDoctor) {
	return axios.post('/api/doctor', newDoctor).then((response) => response.data);
}
