import Navigation from './components/Navigation';
import {Route, Switch, useHistory} from 'react-router-dom';
import Homepage from './pages/Homepage';
import Doctors from './pages/Doctors';
import Header from './components/Header';
import NewDoctor from './pages/NewDoctor';
import NewAppointment from './pages/NewAppointment';
import Appointments from './pages/Appointments';
import useDoctors from './hooks/useDoctors';
import NewCovidTest from './pages/NewCovidTest';
import CovidTests from './pages/CovidTests';
import LoginPage from './pages/LoginPage';
import axios from 'axios';
import {useState} from 'react';

export default function App() {
	const {
		allDoctors,
		setAllDoctors,
		removeDoctor,
		selectedRowParams,
		setSelectedRowParams,
		setAllCovidTests,
	} = useDoctors();

	const history = useHistory();
	const [token, setToken] = useState();

	const login = (credentials) => {
		axios
			.post('/auth/login', credentials)
			.then((res) => res.data)
			.then((data) => setToken(data))
			.then(() => history.push('/'))
			.catch((error) => console.error(error.message));
	};

	return (
		<div>
			<Header />
			<Switch>
				<Route exact path='/'>
					<Homepage />
				</Route>
				<Route path='/login'>
					<LoginPage login={login} />
				</Route>
				<Route path='/doctors'>
					<Doctors
						allDoctors={allDoctors}
						removeDoctor={removeDoctor}
						selectedRowParams={selectedRowParams}
						setSelectedRowParams={setSelectedRowParams}
					/>
				</Route>
				<Route path='/new-doctor'>
					<NewDoctor setAllDoctors={setAllDoctors} />
				</Route>
				<Route path='/appointments'>
					<Appointments />
				</Route>
				<Route path='/new-appointment'>
					<NewAppointment allDoctors={allDoctors} />
				</Route>
				<Route path='/covid-tests'>
					<CovidTests />
				</Route>
				<Route path='/new-covid-test'>
					<NewCovidTest setAllCovidTests={setAllCovidTests} />
				</Route>
			</Switch>
			<Navigation />
		</div>
	);
}
