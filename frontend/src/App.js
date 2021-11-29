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
import useCovidTests from './hooks/useCovidTests';
import {useState} from 'react';

export default function App() {
	const {
		allDoctors,
		setAllDoctors,
		removeDoctor,
		selectedRowParams,
		setSelectedRowParams,
	} = useDoctors();

	const initialCovidTest = {
		testType: null,
		dateTime: null,
		result: null,
	};
	const [newCovidTest, setNewCovidTest] = useState(initialCovidTest);

	const {allCovidTests, setAllCovidTests} = useCovidTests();

	return (
		<ThemeProvider theme={theme}>
			<Header />
			<Switch>
				<PrivateRoute exact path='/'>
					<Homepage allDoctors={allDoctors} />
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
					<CovidTests
						allCovidTests={allCovidTests}
						setAllCovidTests={setAllCovidTests}
						newCovidTest={newCovidTest}
						setNewCovidTest={setNewCovidTest}
						initialCovidTest={initialCovidTest}
					/>
				</PrivateRoute>
				<PrivateRoute path='/new-covid-test'>
					<NewCovidTest
						setAllCovidTests={setAllCovidTests}
						newCovidTest={newCovidTest}
						setNewCovidTest={setNewCovidTest}
						initialCovidTest={initialCovidTest}
					/>
				</PrivateRoute>
			</Switch>
			<Navigation />
		</ThemeProvider>
	);
}
