import {Button, TextField} from '@mui/material';
import {useState} from 'react';
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

export default function NewCovidTest({setAllCovidTests}) {
	const initialCovidTest = {
		testType: null,
		dateTime: null,
		result: null,
	};

	const [newCovidTest, setNewCovidTest] = useState(initialCovidTest);
	//const [valid, setValid] = useState(null);
	const [showError, setShowError] = useState(false);
	const history = useHistory();
	{
		/*}
	useEffect(() => {
		isValid(newCovidTest);
	}, [newCovidTest]);

	useEffect(() => {
		setShowError(() => {
			if (valid === true) return false;
			if (valid === false) return true;
		});
	}, [valid]);
	*/
	}

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
		if (newTest.testType && newTest.dateTime) {
			//	setValid(true);
			return true;
		} else {
			//setValid(false);
			return false;
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!isValid(newCovidTest)) {
			setShowError(true);
			return;
		} else {
			setShowError(false);
		}
		submitCovidTest(newCovidTest).catch(console.error);
		setNewCovidTest(initialCovidTest);
		//	setValid(null);
		getCovidTests()
			.then((covidTests) => setAllCovidTests(covidTests))
			.catch(console.error)
			.then(() => history.push('/covid-tests'));
	};

	return (
		<PageLayout>
			<Form onSubmit={handleSubmit}>
				<Grid container direction={'column'} spacing={5}>
					<Grid item>
						<FormControl component='fieldset'>
							<FormLabel component='legend'>Type of COVID test</FormLabel>
							<RadioGroup
								required
								aria-required={true}
								aria-label='test-type'
								name='testType'
								value={newCovidTest.testType}
								onChange={handleChange}
							>
								<FormControlLabel
									value='ANTIGEN_LOLLIPOP'
									control={<Radio />}
									label='Antigen test - lollipop'
								/>
								<FormControlLabel
									value='ANTIGEN_NASAL'
									control={<Radio />}
									label='Antigen test - nasal'
								/>
								<FormControlLabel
									value='ANTIGEN_NASOPHARYNGEAL'
									control={<Radio />}
									label='Antigen test - nasopharyngeal'
								/>
								<FormControlLabel
									value='ANTIGEN_SALIVA'
									control={<Radio />}
									label='Antigen test - saliva'
								/>
								<FormControlLabel
									value='PCR_TEST'
									control={<Radio />}
									label='PCR test'
								/>
							</RadioGroup>
						</FormControl>
					</Grid>

					<Grid item>
						<LocalizationProvider dateAdapter={DateAdapter}>
							<DateTimePicker
								required
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

					<Grid item>
						<Button variant='contained' type='submit'>
							Submit
						</Button>
					</Grid>
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
	margin-bottom: 60px;
`;
