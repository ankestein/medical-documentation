import AddIcon from '@mui/icons-material/Add';
import {Fab} from '@mui/material';
import {Link} from 'react-router-dom';
import Doctors from './Doctors';
import PropTypes from 'prop-types';
import {List, Typography} from '@material-ui/core';
import AppointmentCard from '../components/AppointmentCard';

Doctors.propTypes = {
	allDoctors: PropTypes.array,
};

export default function Appointments({allDoctors}) {
	return (
		<div>
			<Typography variant='h3'>Appointments</Typography>
			<Fab
				size='small'
				color='primary'
				aria-label='add'
				component={Link}
				to='/new-appointment'
			>
				<AddIcon />
			</Fab>

			<List>
				{allDoctors.map((doctor) => {
					return (
						<li key={doctor.id}>
							{doctor.appointments.map((appointment) => {
								return (
									<List>
										<li key={appointment.id}>
											<AppointmentCard
												doctor={doctor}
												appointment={appointment}
											/>
										</li>
									</List>
								);
							})}
						</li>
					);
				})}
			</List>
		</div>
	);
}
