import {useEffect, useState} from 'react';
import {getCovidTests} from '../service/CovidTestApiService';

export default function useCovidTests() {
	const [allCovidTests, setAllCovidTests] = useState([]);

	useEffect(() => {
		getCovidTests()
			.then((covidTests) => setAllCovidTests(covidTests))
			.catch((error) => console.error(error.message));
	}, [allCovidTests]);

	return {
		allCovidTests,
		setAllCovidTests,
	};
}
