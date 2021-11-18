import {Button, MenuItem, TextField} from '@mui/material';
import {useState} from 'react';
import {getCovidTests, submitCovidTest} from '../service/CovidTestApiService';
import styled from 'styled-components/macro';
import {useHistory} from 'react-router-dom';
import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
} from '@material-ui/core';
import DateAdapter from '@mui/lab/AdapterMoment';
import {DateTimePicker, LocalizationProvider} from '@mui/lab';

export default function NewCovidTest({setAllCovidTests}) {
	const initialCovidTest = {
		testType: '',
		dateTime: null,
		result: '',
	};

	const [newCovidTest, setNewCovidTest] = useState(initialCovidTest);
	const history = useHistory();

	const handleChange = (event) => {
		setNewCovidTest({...newCovidTest, [event.target.name]: event.target.value});
	};

	const handleDateTimeChange = (inputDateTime) => {
		setNewCovidTest({...newCovidTest, dateTime: inputDateTime._d.toJSON()});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!newCovidTest.testType || !newCovidTest.dateTime) {
			return;
		}
		submitCovidTest(newCovidTest).catch(console.error);
		setNewCovidTest(initialCovidTest);
		getCovidTests()
			.then((covidTests) => setAllCovidTests(covidTests))
			.catch(console.error)
			.then(() => history.push('/covid-tests'));
	};

	const testTypes = [
		'ANTIGEN_LOLLIPOP',
		'ANTIGEN_NASAL',
		'ANTIGEN_NASOPHARYNGEAL',
		'ANTIGEN_SALIVA',
		'PCR_TEST',
	];

	return (
		<PageLayout>
			<Form onSubmit={handleSubmit}>
				<TextField
					id='select-test-type'
					select
					value={newCovidTest.testType}
					label='Type of COVID test'
					required={true}
					name='testType'
					onChange={handleChange}
				>
					{testTypes.map((type) => (
						<MenuItem key={type} value={type}>
							{type}
						</MenuItem>
					))}
				</TextField>

				<LocalizationProvider dateAdapter={DateAdapter}>
					<DateTimePicker
						label='Date and time'
						value={newCovidTest.dateTime}
						onChange={handleDateTimeChange}
						name='dateTime'
						renderInput={(params) => <TextField {...params} />}
						showTodayButton={true}
					/>
				</LocalizationProvider>

				<FormControl component='fieldset'>
					<FormLabel component='legend'>Result</FormLabel>
					<RadioGroup
						row
						aria-label='result'
						name='result-radio-buttons-group'
						defaultValue='negative'
					>
						<FormControlLabel
							value='negative'
							control={<Radio />}
							label='negative'
						/>
						<FormControlLabel
							value='positive'
							control={<Radio />}
							label='positive'
						/>
					</RadioGroup>
				</FormControl>

				<Button variant='contained' type='submit'>
					Submit
				</Button>
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
