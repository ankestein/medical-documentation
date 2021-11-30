import {Button, TextField} from '@mui/material';
import {useContext, useEffect, useState} from 'react';
import {getCovidTests, submitCovidTest} from '../service/CovidTestApiService';
import styled from 'styled-components/macro';
import {useHistory} from 'react-router-dom';
import {
	Container,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	Radio,
	RadioGroup,
	Typography,
} from '@material-ui/core';
import DateAdapter from '@mui/lab/AdapterMoment';
import {DateTimePicker, LocalizationProvider} from '@mui/lab';
import PropTypes from 'prop-types';
import {AuthContext} from '../context/AuthProvider';

NewCovidTest.propTypes = {
	setAllCovidTests: PropTypes.func.isRequired,
	newCovidTest: PropTypes.object.isRequired,
	setNewCovidTest: PropTypes.func.isRequired,
	initialCovidTest: PropTypes.object,
};

export default function NewCovidTest({
	setAllCovidTests,
	newCovidTest,
	setNewCovidTest,
	initialCovidTest,
}) {
	const [showError, setShowError] = useState(false);
	const {token} = useContext(AuthContext);
	const history = useHistory();

	useEffect(() => {
		if (showError && isValid(newCovidTest)) setShowError(false);
		//eslint-disable-next-line
	}, [newCovidTest]);

	const handleChange = (event) => {
		setNewCovidTest({...newCovidTest, [event.target.name]: event.target.value});
		if (isValid(newCovidTest)) {
			setShowError(false);
		}
	};

	const handleDateTimeChange = (inputDateTime) => {
		setNewCovidTest({...newCovidTest, dateTime: inputDateTime._d.toJSON()});
		if (isValid(newCovidTest)) {
			setShowError(false);
		}
	};

	const isValid = (newTest) => {
		return newTest.testType && newTest.dateTime;
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!isValid(newCovidTest)) {
			setShowError(true);
			return;
		} else {
			setShowError(false);
		}
		submitCovidTest(newCovidTest, token).catch(console.error);
		setNewCovidTest(initialCovidTest);
		getCovidTests()
			.then((covidTests) => setAllCovidTests(covidTests))
			.catch(console.error)
			.then(() => history.push('/covid-tests'));
	};

	const values = [
		'ANTIGEN_LOLLIPOP',
		'ANTIGEN_NASAL',
		'ANTIGEN_NASOPHARYNGEAL',
		'ANTIGEN_SALIVA',
		'PCR_TEST',
	];
	const labels = [
		'Antigen test - lollipop',
		'Antigen test - nasal',
		'Antigen test - nasopharyngeal',
		'Antigen test - saliva',
		'PCR test',
	];

	return (
		<PageLayout>
			<Form onSubmit={handleSubmit}>
				<Grid container direction={'column'} spacing={5}>
					<Grid item>
						<FormControl component='fieldset'>
							<FormLabel component='legend'>Type of COVID test</FormLabel>
							<RadioGroup
								aria-label='test-type'
								name='testType'
								value={newCovidTest.testType}
								onChange={handleChange}
							>
								{values.map((value, i) => (
									<FormControlLabel
										control={<Radio />}
										label={labels[i]}
										value={value}
									/>
								))}
							</RadioGroup>
						</FormControl>
					</Grid>

					<Grid item>
						<LocalizationProvider dateAdapter={DateAdapter}>
							<DateTimePicker
								label='Date and time'
								defaultValue={null}
								value={newCovidTest.dateTime}
								onChange={handleDateTimeChange}
								name='dateTime'
								renderInput={(params) => <TextField {...params} />}
								showTodayButton={true}
							/>
						</LocalizationProvider>
					</Grid>

					<Grid item>
						<FormControl component='fieldset'>
							<FormLabel component='legend'>Result</FormLabel>
							<RadioGroup
								row
								aria-label='result'
								name='result'
								value={newCovidTest.result}
								onChange={handleChange}
							>
								<FormControlLabel
									value='NEGATIVE'
									control={<Radio />}
									label='negative'
								/>
								<FormControlLabel
									value='POSITIVE'
									control={<Radio />}
									label='positive'
								/>
							</RadioGroup>
						</FormControl>
					</Grid>

					{showError === true && (
						<Container>
							<Typography variant='body2' color='secondary'>
								Please select test type & date and time!
							</Typography>
						</Container>
					)}
					{!newCovidTest.id && (
						<Grid item>
							<Button variant='contained' type='submit'>
								Submit
							</Button>
						</Grid>
					)}
				</Grid>
			</Form>
		</PageLayout>
	);
}

const Form = styled.form`
	width: 80%;
	margin: 40px auto;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const PageLayout = styled.div`
	margin-top: 64px;
	margin-bottom: 60px;
`;
