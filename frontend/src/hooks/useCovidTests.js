import {useContext, useEffect, useState} from 'react';
import {getCovidTests} from '../service/CovidTestApiService';
import {AuthContext} from '../context/AuthProvider';

export default function useCovidTests() {
	const [allCovidTests, setAllCovidTests] = useState([]);

	const {token} = useContext(AuthContext);

	useEffect(() => {
		getCovidTests(token)
			.then((covidTests) => setAllCovidTests(covidTests))
			.catch((error) => console.error(error.message));
	}, [allCovidTests, token]);

	return {
		allCovidTests,
		setAllCovidTests,
	};
}
