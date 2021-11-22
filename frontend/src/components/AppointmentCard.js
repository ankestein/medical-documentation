import {
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
} from '@material-ui/core';

export default function AppointmentCard({appointment, doctor}) {
	return (
		<Card sx={{minWidth: 275}}>
			<CardContent>
				<Typography sx={{fontSize: 14}} color='text.secondary' gutterBottom>
					{`Doctor ${doctor.firstName} ${doctor.lastName}`}
				</Typography>
				<Typography sx={{mb: 1.5}} color='text.secondary'>
					{appointment.date}
				</Typography>
				<Typography variant='h5' component='div'>
					{appointment.reasonForVisit}
				</Typography>
				<Typography variant='body2'>{appointment.notes}</Typography>
			</CardContent>
			<CardActions>
				<Button size='small'>Edit Appointment</Button>
			</CardActions>
		</Card>
	);
}
