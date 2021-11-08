import axios from 'axios';

export function submitAppointment(newAppointment) {
	return axios
		.post('/api/appointment', newAppointment)
		.then((response) => response.data);
}
