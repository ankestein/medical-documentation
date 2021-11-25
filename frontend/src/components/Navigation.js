import {BottomNavigation, BottomNavigationAction, Paper} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {faUserMd} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styled from 'styled-components/macro';

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
				<BottomNavigationAction
					label='Doctors'
					value='/doctors'
					icon={
						<StyledBox>
							<FontAwesomeIcon icon={faUserMd} size='lg' />
						</StyledBox>
					}
				/>

				<BottomNavigationAction
					label='Appointments'
					value='/appointments'
					icon={<EventNoteIcon />}
				/>

				<BottomNavigationAction
					label='Tests'
					value='/covid-tests'
					icon={<CoronavirusIcon />}
				/>

				<BottomNavigationAction
					label='Symptoms'
					value='/symptoms'
					icon={<ThermostatIcon />}
				/>

				<BottomNavigationAction label='Home' value='/' icon={<HomeIcon />} />
			</BottomNavigation>
		</Paper>
	);
}

const StyledBox = styled.div`
	margin-top: 3px;
	margin-bottom: 3px;
`;
