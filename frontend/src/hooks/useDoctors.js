import {useContext, useEffect, useState} from 'react';
import {deleteDoctor, getDoctors} from '../service/DoctorApiService';
import {AuthContext} from '../context/AuthProvider';

export default function useDoctors() {
	const [allDoctors, setAllDoctors] = useState([]);
	const [allCovidTests, setAllCovidTests] = useState([]);

	const {token} = useContext(AuthContext);

	const [selectedRowParams, setSelectedRowParams] = useState({
		id: '',
		name: '',
		specialty: '',
		city: '',
	});

	useEffect(() => {
		getDoctors(token)
			.then((doctors) => setAllDoctors(doctors))
			.catch((error) => console.error(error.message));
	}, [allDoctors, token]);

	const removeDoctor = (doctorId) => {
		deleteDoctor(doctorId, token).then(() =>
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
