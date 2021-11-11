import axios from 'axios';

export function submitDoctor(newDoctor) {
	return axios.post('/api/doctor', newDoctor).then((response) => response.data);
}

export function submitAppointment(newDoctor) {
	return axios
		.put('/api/doctor/appointment', newDoctor)
		.then((response) => response.data);
}

export function getDoctors() {
	return axios.get('/api/doctor').then((response) => response.data);
}
