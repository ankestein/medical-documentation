import {AppBar, IconButton, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {Login} from '@mui/icons-material';
import {Box} from '@material-ui/core';
import {useHistory} from 'react-router-dom';

export default function Header() {
	const history = useHistory();

	const handleClick = () => {
		history.push('/login');
	};

	return (
		<Box sx={{flexGrow: 1}}>
			<AppBar position='static'>
				<Toolbar>
					<IconButton
						edge='start'
						color='inherit'
						aria-label='menu'
						sx={{mr: 2}}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant='h6'
						color='inherit'
						component='div'
						sx={{flexGrow: 1}}
					>
						MedDoc
					</Typography>
					<IconButton color='inherit' onClick={handleClick}>
						<Login />
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
