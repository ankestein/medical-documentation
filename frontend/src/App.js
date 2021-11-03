import {getGreetings} from './service/greetingApiService';
import {useEffect, useState} from 'react';

export default function App() {
	const [greetings, setGreetings] = useState([]);

	useEffect(() => {
		getGreetings().then((greetings) => setGreetings(greetings));
	}, []);

	return (
		<>
			<ul>
				{greetings.map((greeting) => {
					return <li key={greeting.id}>{greeting.greetingText}</li>;
				})}
			</ul>
		</>
	);
}
