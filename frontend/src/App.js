import {getGreetings} from './service/greetingApiService';
import {useEffect, useState} from 'react';
import jsonGreetings from './greeting.json';

export default function App() {
	const [greetings, setGreetings] = useState([]);

	useEffect(() => {
		getGreetings()
			//.then((greetings) => setGreetings(greetings))
			.then((greetings) => {
				setGreetings(greetings);
				console.log('greetings:');
				console.log(greetings);
			});
	}, []);

	return (
		<>
			<h1>JSON Greetings</h1>
			<ul>
				{jsonGreetings.map((jsonGreeting) => {
					return <li key={jsonGreeting.id}>{jsonGreeting.greetingText}</li>;
				})}
			</ul>

			<h1>Database Greetings</h1>
			<ul>
				{greetings.map((greeting) => {
					return <li key={greeting.id}>{greeting.greetingText}</li>;
				})}
			</ul>
		</>
	);
}
