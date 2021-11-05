import Navigation from './components/Navigation';
import {Route, Switch} from 'react-router-dom';
import Homepage from './pages/Homepage';
import Doctors from './pages/Doctors';
import Header from './components/Header';

export default function App() {
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
			</Switch>
			<Navigation />
		</div>
	);
}
