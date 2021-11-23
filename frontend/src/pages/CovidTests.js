import {Fab} from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components/macro';
import {Link} from 'react-router-dom';
import {Typography} from '@mui/material';
import CovidTestCard from '../components/CovidTestCard';

export default function CovidTests({allCovidTests}) {
	const fabStyle = {
		position: 'relative',
		top: -62,
		right: -310,
	};

	return (
		<PageLayout>
			<Typography variant='h1'>COVID19 Tests</Typography>

			<Fab
				color='primary'
				size='small'
				sx={fabStyle}
				aria-label='add-covid-test'
				component={Link}
				to='/new-covid-test'
			>
				<AddIcon />
			</Fab>

			<CardContainer>
				{allCovidTests.map((covidTest) => {
					return <CovidTestCard covidTest={covidTest} />;
				})}
			</CardContainer>
		</PageLayout>
	);
}

const PageLayout = styled.div`
	margin-bottom: 60px;
`;

const CardContainer = styled.div`
	max-width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-auto-rows: 110px;
`;
