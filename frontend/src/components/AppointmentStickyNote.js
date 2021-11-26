import {CardContent, Typography} from '@material-ui/core';

import styled from 'styled-components/macro';

export default function AppointmentStickyNote({appointment, doctor}) {
	return (
		<StyledCard>
			<CardContent style={{padding: '10px', fontSize: 'small'}}>
				<Typography
					variant='overline'
					style={{color: 'text.secondary', fontSize: 10}}
				>
					{`Dr. ${doctor.firstName} ${doctor.lastName}`}
				</Typography>
				<Typography
					variant='subtitle2'
					style={{color: '#233d4dff', marginBottom: 4}}
				>
					{appointment.date}
				</Typography>
				<Typography
					variant='body2'
					style={{
						fontWeight: 500,
						lineHeight: 1,
						color: '#303030',
						marginBottom: 4,
					}}
				>
					{appointment.reasonForVisit}
				</Typography>

				<Typography
					variant='body2'
					style={{
						fontSize: 16,
						color: '#c181c1',
						fontFamily: `'Annie Use Your Telescope', cursive, "Montserrat", "Roboto", "Helvetica", "Arial", sans-serif`,
					}}
				>
					{appointment.reminder}
				</Typography>
			</CardContent>
		</StyledCard>
	);
}

const StyledCard = styled.div`
	background: #ffc;
	position: relative;
	margin: 6px;
	box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
`;
