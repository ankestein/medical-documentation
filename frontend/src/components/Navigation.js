import {BottomNavigation, BottomNavigationAction, Paper} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';

export default function Navigation() {
	const [value, setValue] = useState('');
	const history = useHistory();

	const handleChange = (event, newValue) => {
		setValue(newValue);
		history.push(newValue);
	};

	return (
		<Paper sx={{position: 'fixed', bottom: 0, width: 1.0}} elevation={3}>
			<BottomNavigation showLabels value={value} onChange={handleChange}>
				<BottomNavigationAction label='Home' value='/' icon={<HomeIcon />} />
				<BottomNavigationAction
					label='Symptoms'
					value='/symptoms'
					icon={<ThermostatIcon />}
				/>
				<BottomNavigationAction
					label='Doctors'
					value='/doctors'
					icon={<PersonIcon />}
				/>
				<BottomNavigationAction
					label='Appointments'
					value='/appointments'
					icon={<EventNoteIcon />}
				/>
			</BottomNavigation>
		</Paper>
	);
}
