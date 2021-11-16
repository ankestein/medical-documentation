import Navigation from './components/Navigation';
import {Route, Switch} from 'react-router-dom';
import Homepage from './pages/Homepage';
import Doctors from './pages/Doctors';
import Header from './components/Header';
import NewDoctor from './pages/NewDoctor';
import NewAppointment from './pages/NewAppointment';
import Appointments from './pages/Appointments';
import useDoctors from './hooks/useDoctors';

export default function App() {
	const {allDoctors, setAllDoctors, removeDoctor} = useDoctors();

	return (
		<div>
			<Header />
			<Switch>
				<Route exact path='/'>
					<Homepage />
				</Route>
				<Route path='/doctors'>
					<Doctors removeDoctor={removeDoctor} />
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
