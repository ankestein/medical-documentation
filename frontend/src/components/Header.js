import {AppBar, IconButton, Toolbar, Typography} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
	return (
		/*<header>This is the header</header>*/

		<AppBar position='sticky'>
			<Toolbar variant='dense'>
				<IconButton edge='start' color='inherit' aria-label='menu' sx={{mr: 2}}>
					<MenuIcon />
				</IconButton>
				<Typography variant='h6' color='inherit' component='div'>
					MedDoc
				</Typography>
			</Toolbar>
		</AppBar>
	);
}
