import AddIcon from '@mui/icons-material/Add';
import {Fab, Typography} from '@mui/material';
import {Link} from 'react-router-dom';

export default function Appointments() {
	return (
		<div>
			<Typography variant='h1'>This is the Appointments Page</Typography>

			<Fab
				//color='primary'
				//size='small'
				//sx={fabStyle}
				aria-label='add-appointment'
				component={Link}
				to='/new-appointment'
			>
				<AddIcon />
			</Fab>
		</div>
	);
}
