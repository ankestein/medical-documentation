import {Button, CardActions, CardContent, Typography} from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import styled from 'styled-components/macro';
import moment from 'moment';

export default function CovidTestCard({covidTest}) {
	const testTypes = {
		ANTIGEN_LOLLIPOP: 'Lollipop',
		ANTIGEN_NASAL: 'Nasal',
		ANTIGEN_NASOPHARYNGEAL: 'Nasopharyngeal',
		ANTIGEN_SALIVA: 'Saliva',
		PCR_TEST: 'PCR',
	};

	return (
		<StyledCard>
			<CardContent style={{padding: '10px', fontSize: 'small'}}>
				<Typography variant='overline' style={{color: '#303030', fontSize: 10}}>
					{testTypes[covidTest.testType]}
				</Typography>
				<Typography
					variant='subtitle2'
					style={{color: '#233d4dff', marginBottom: 8, fontSize: 10}}
				>
					{moment(covidTest.dateTime).format('llll')}
				</Typography>
				<Typography
					variant='body2'
					style={{
						fontWeight: 500,
						fontSize: 10,
						lineHeight: 1,
						color: '#303030',
						marginBottom: 4,
					}}
				>
					{covidTest.result}
				</Typography>
			</CardContent>

			<CardActions>
				{!covidTest.result && (
					<Button
						startIcon={<EditIcon />}
						size='small'
						color='primary'
						style={{position: 'absolute', bottom: 6, right: 6, fontSize: 10}}
					>
						Add result
					</Button>
				)}
			</CardActions>
		</StyledCard>
	);
}

const StyledCard = styled.div`
	background: #d0e0c0;
	position: relative;
	margin: 6px;
	border: 1px solid grey;
	border-radius: 12px;
	box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
		0px 6px 10px 0 rgba(0, 0, 0, 0.14), 0px 1px 18px 0 rgba(0, 0, 0, 0.12);
`;
