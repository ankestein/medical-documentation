import AddIcon from '@mui/icons-material/Add';
import {Fab} from '@mui/material';
import {Link} from 'react-router-dom';
import Doctors from './Doctors';
import PropTypes from 'prop-types';
import {Typography} from '@material-ui/core';
import AppointmentCard from '../components/AppointmentCard';
import styled from 'styled-components/macro';

Doctors.propTypes = {
	allDoctors: PropTypes.array,
};

export default function Appointments({allDoctors}) {
	return (
		<PageLayout>
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

			<CardContainer>
				{allDoctors.map((doctor) => {
					{
						return doctor.appointments.map((appointment) => {
							return (
								<AppointmentCard doctor={doctor} appointment={appointment} />
							);
						});
					}
				})}
			</CardContainer>
		</PageLayout>
	);
}

const PageLayout = styled.div`
	margin-bottom: 60px;
`;

const CardContainer = styled.div`
	max-width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-auto-rows: 190px;
`;
