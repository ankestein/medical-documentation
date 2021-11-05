import AddIcon from '@mui/icons-material/Add';
import {Fab} from '@mui/material';
import {Link} from 'react-router-dom';

export default function Doctors() {
	return (
		<div>
			<h2>This is the Doctors Page</h2>

			<Fab
				size='medium'
				color='steelblue'
				aria-label='add'
				component={Link}
				to='/new-doctor'
			>
				<AddIcon />
			</Fab>
		</div>
	);
}
