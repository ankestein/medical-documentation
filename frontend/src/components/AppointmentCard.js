import {Button, CardActions, CardContent, Typography} from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import styled from 'styled-components/macro';

export default function AppointmentCard({appointment, doctor}) {
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
				<Typography variant='body2' style={{fontSize: 8, color: '#233d4dff'}}>
					{appointment.notes}
				</Typography>
			</CardContent>

			<CardActions>
				<Button
					startIcon={<EditIcon />}
					size='small'
					color='primary'
					style={{position: 'absolute', bottom: 6, right: 6, fontSize: 10}}
				>
					Edit
				</Button>
			</CardActions>
		</StyledCard>
	);
}

const StyledCard = styled.div`
	background: #a1c181ff;
	position: relative;
	margin: 6px;
	border: 1px solid grey;
	border-radius: 12px;
	box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
		0px 6px 10px 0 rgba(0, 0, 0, 0.14), 0px 1px 18px 0 rgba(0, 0, 0, 0.12);
`;
