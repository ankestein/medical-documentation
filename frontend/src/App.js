import Navigation from './components/Navigation';
import {Route, Switch} from 'react-router-dom';
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
import PrivateRoute from './routing/PrivateRoute';
import {ThemeProvider} from '@emotion/react';
import theme from './styling/theme';

export default function App() {
	const {
		allDoctors,
		setAllDoctors,
		removeDoctor,
		selectedRowParams,
		setSelectedRowParams,
		setAllCovidTests,
	} = useDoctors();

	return (
		<ThemeProvider theme={theme}>
			<Header />
			<Switch>
				<PrivateRoute exact path='/'>
					<Homepage />
				</PrivateRoute>
				<Route path='/login'>
					<LoginPage />
				</Route>
				<PrivateRoute path='/doctors'>
					<Doctors
						allDoctors={allDoctors}
						removeDoctor={removeDoctor}
						selectedRowParams={selectedRowParams}
						setSelectedRowParams={setSelectedRowParams}
					/>
				</PrivateRoute>
				<PrivateRoute path='/new-doctor'>
					<NewDoctor setAllDoctors={setAllDoctors} />
				</PrivateRoute>
				<PrivateRoute path='/appointments'>
					<Appointments allDoctors={allDoctors} />
				</PrivateRoute>
				<PrivateRoute path='/new-appointment'>
					<NewAppointment allDoctors={allDoctors} />
				</PrivateRoute>
				<PrivateRoute path='/covid-tests'>
					<CovidTests />
				</PrivateRoute>
				<PrivateRoute path='/new-covid-test'>
					<NewCovidTest setAllCovidTests={setAllCovidTests} />
				</PrivateRoute>
			</Switch>
			<Navigation />
		</ThemeProvider>
	);
}
