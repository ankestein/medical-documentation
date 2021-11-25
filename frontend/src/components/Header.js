import {AppBar, IconButton, Toolbar} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {Login} from '@mui/icons-material';
import {Box, Paper} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import logo from '../styling/MedDoc-logo-transparent.png';

export default function Header() {
	const history = useHistory();

	const handleClick = () => {
		history.push('/login');
	};

	return (
		<Paper sx={{position: 'fixed', top: 0, width: 1.0}} elevation={3}>
			<Box>
				<AppBar>
					<Toolbar>
						<IconButton
							edge='start'
							aria-label='menu'
							sx={{marginRight: 2, color: 'white'}}
						>
							<MenuIcon />
						</IconButton>

						<img src={logo} width='130' alt='MedDoc' />

						<IconButton
							onClick={handleClick}
							sx={{marginLeft: 17, color: 'white'}}
						>
							<Login />
						</IconButton>
					</Toolbar>
				</AppBar>
			</Box>
		</Paper>
	);
}
