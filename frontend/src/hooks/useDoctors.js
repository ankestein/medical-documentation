import {useEffect, useState} from 'react';
import {deleteDoctor, getDoctors} from '../service/DoctorApiService';

export default function useDoctors() {
	const [allDoctors, setAllDoctors] = useState([]);
	const [allCovidTests, setAllCovidTests] = useState([]);

	const [selectedRowParams, setSelectedRowParams] = useState({
		id: '',
		name: '',
		specialty: '',
		city: '',
	});

	useEffect(() => {
		getDoctors()
			.then((doctors) => setAllDoctors(doctors))
			.catch((error) => console.error(error.message));
	}, [allDoctors]);

	const removeDoctor = (doctorId) => {
		deleteDoctor(doctorId).then(() =>
			setAllDoctors(allDoctors.filter((doctor) => doctor.id !== doctorId))
		);
	};

	return {
		allDoctors,
		setAllDoctors,
		removeDoctor,
		selectedRowParams,
		setSelectedRowParams,
		allCovidTests,
		setAllCovidTests,
	};
}
