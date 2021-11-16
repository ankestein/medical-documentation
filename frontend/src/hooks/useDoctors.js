import {useEffect, useState} from 'react';
import {deleteDoctor, getDoctors} from '../service/DoctorApiService';

export default function useDoctors() {
	const [allDoctors, setAllDoctors] = useState([]);

	const [open, setOpen] = useState(false);

	useEffect(() => {
		getDoctors()
			.then((doctors) => setAllDoctors(doctors))
			.catch((error) => console.error(error.message));
	}, []);

	const removeDoctor = (doctorId) => {
		deleteDoctor(doctorId).then(() =>
			setAllDoctors(allDoctors.filter((doctor) => doctor.id !== doctorId))
		);
	};

	return {allDoctors, setAllDoctors, removeDoctor, open, setOpen};
}
