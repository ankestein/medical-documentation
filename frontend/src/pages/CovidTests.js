import {Fab} from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components/macro';
import {Link} from 'react-router-dom';

export default function CovidTests({fabPosition}) {
	return (
		<PageLayout>
			<StyledH1>COVID19 Tests</StyledH1>

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

const StyledH1 = styled.h1`
	font-family: Montserrat, Roboto, Helvetica, Arial, sans-serif;
	font-weight: 500;
	font-size: 18px;
	margin: 12px;
`;
