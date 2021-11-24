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

	const fabPosition = {
		position: 'relative',
		top: -35,
		left: '85%',
	};

	const addIconStyle = {
		cursor: 'pointer',
		//fontSize: '1.2857142857142856rem',
		//fontWeight: 500,
		//lineHeight: 1.75,
		//letterSpacing: '0.02857em',
		//textTransform: 'uppercase',
		borderRadius: '50%',
		width: 40,
		height: 40,
		background: '#a1c181ff',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		boxShadow:
			'0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
	};

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
						fabPosition={fabPosition}
						addIconStyle={addIconStyle}
					/>
				</PrivateRoute>
				<PrivateRoute path='/new-doctor'>
					<NewDoctor setAllDoctors={setAllDoctors} />
				</PrivateRoute>
				<PrivateRoute path='/appointments'>
					<Appointments />
				</PrivateRoute>
				<PrivateRoute path='/new-appointment'>
				</Route>
				<Route path='/appointments'>
					<Appointments allDoctors={allDoctors} addIconStyle={addIconStyle} />
				</Route>
				<Route path='/new-appointment'>
					<NewAppointment allDoctors={allDoctors} />
				</PrivateRoute>
				<PrivateRoute path='/covid-tests'>
					<CovidTests />
				</PrivateRoute>
				<PrivateRoute path='/new-covid-test'>
				</Route>
				<Route path='/covid-tests'>
					<CovidTests addIconStyle={addIconStyle} />
				</Route>
				<Route path='/new-covid-test'>
					<NewCovidTest setAllCovidTests={setAllCovidTests} />
				</PrivateRoute>
			</Switch>
			<Navigation />
		</ThemeProvider>
	);
}
