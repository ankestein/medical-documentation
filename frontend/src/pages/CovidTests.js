import {Fab} from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components/macro';
import {Link} from 'react-router-dom';
import {Typography} from '@mui/material';

export default function CovidTests() {
	return (
		<PageLayout>
			<Typography variant='h1'>COVID19 Tests</Typography>

			<Fab
				color='primary'
				size='small'
				aria-label='add-covid-test'
				component={Link}
				to='/new-covid-test'
			>
				<AddIcon />
			</Fab>
		</PageLayout>
	);
}

const PageLayout = styled.div`
	margin-bottom: 60px;
`;

const StyledH1 = styled.h1`
	margin-left: 12px;
`;
