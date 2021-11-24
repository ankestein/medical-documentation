import AddIcon from '@mui/icons-material/Add';
import {Fab} from '@mui/material';
import {Link} from 'react-router-dom';
import Doctors from './Doctors';
import PropTypes from 'prop-types';
import AppointmentCard from '../components/AppointmentCard';
import styled from 'styled-components/macro';

Doctors.propTypes = {
	allDoctors: PropTypes.array,
};

export default function Appointments({allDoctors, fabPosition}) {
	return (
		<PageLayout>
			<StyledH1>Appointments</StyledH1>

			<Fab
				color='#a1c181ff'
				size='small'
				sx={fabPosition}
				aria-label='add-appointment'
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

const StyledH1 = styled.h1`
	font-family: Montserrat, Roboto, Helvetica, Arial, sans-serif;
	font-weight: 500;
	font-size: 18px;
	margin: 12px;
`;
