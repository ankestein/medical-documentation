import axios from 'axios';

const getHeader = (token) => {
	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
};

export function submitDoctor(newDoctor, token) {
	return axios
		.post('/api/doctor', newDoctor, getHeader(token))
		.then((response) => response.data);
}

export function submitAppointment(newAppointment, doctorId, token) {
	return axios
		.put(
			`/api/doctor/${doctorId}/appointment`,
			newAppointment,
			getHeader(token)
		)
		.then((response) => response.data);
}

export function getDoctors(token) {
	return axios
		.get('/api/doctor', getHeader(token))
		.then((response) => response.data);
}

export function deleteDoctor(doctorId, token) {
	return axios.delete(`/api/doctor/${doctorId}`, getHeader(token));
}
