import {Fab} from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components/macro';
import {Link} from 'react-router-dom';
import {Typography} from '@mui/material';

export default function CovidTests({fabPosition}) {
	return (
		<PageLayout>
			<Typography variant='h1'>COVID19 Tests</Typography>

			<Fab
				color='#a1c181ff'
				size='small'
				sx={fabPosition}
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
