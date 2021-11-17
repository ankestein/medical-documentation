import axios from 'axios';

export function submitDoctor(newDoctor) {
	return axios.post('/api/doctor', newDoctor).then((response) => response.data);
}

export function submitAppointment(newAppointment, doctorId) {
	return axios
		.put(`/api/doctor/${doctorId}/appointment`, newAppointment)
		.then((response) => response.data);
}

export function getDoctors() {
	return axios.get('/api/doctor').then((response) => response.data);
}

export function deleteDoctor(doctorId) {
	return axios.delete(`/api/doctor/${doctorId}`);
}
