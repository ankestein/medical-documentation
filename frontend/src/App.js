import Navigation from './components/Navigation';
import {Route, Switch} from 'react-router-dom';
import Homepage from './pages/Homepage';
import Doctors from './pages/Doctors';
import Header from './components/Header';
import NewDoctor from './pages/NewDoctor';
import NewAppointment from './pages/NewAppointment';
import Appointments from './pages/Appointments';
import {useEffect, useState} from 'react';
import {getDoctors} from './service/DoctorApiService';

export default function App() {
	const [allDoctors, setAllDoctors] = useState([]);

	useEffect(() => {
		getDoctors()
			.then((doctors) => setAllDoctors(doctors))
			.catch((error) => console.error(error.message));
	}, []);

	return (
		<div>
			<Header />
			<Switch>
				<Route exact path='/'>
					<Homepage />
				</Route>
				<Route path='/doctors'>
					<Doctors />
				</Route>
				<Route path='/new-doctor'>
					<NewDoctor />
				</Route>
				<Route path='/appointments'>
					<Appointments />
				</Route>
				<Route path='/new-appointment'>
					<NewAppointment allDoctors={allDoctors} />
				</Route>
			</Switch>
			<Navigation />
		</div>
	);
}
