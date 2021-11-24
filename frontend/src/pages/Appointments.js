import AddIcon from '@mui/icons-material/Add';
import {Fab, Typography} from '@mui/material';
import {Link} from 'react-router-dom';

export default function Appointments({fabPosition}) {
	return (
		<div>
			<Typography variant='h1'>This is the Appointments Page</Typography>

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
		</div>
	);
}
