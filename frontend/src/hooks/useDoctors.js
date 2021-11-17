import {useEffect, useState} from 'react';
import {getDoctors} from '../service/DoctorApiService';

export default function useDoctors() {
	const [allDoctors, setAllDoctors] = useState([]);

	useEffect(() => {
		getDoctors()
			.then((doctors) => setAllDoctors(doctors))
			.catch((error) => console.error(error.message));
	}, []);

	return {allDoctors, setAllDoctors};
}
