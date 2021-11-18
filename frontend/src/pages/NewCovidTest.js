import {Button, TextField} from '@mui/material';
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
import {Autocomplete, DateTimePicker, LocalizationProvider} from '@mui/lab';

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
		'Antigen test - lollipop',
		'Antigen test - nasal',
		'Antigen test - nasopharyngeal',
		'Antigen test - saliva',
		'PCR test',
	];

	return (
		<PageLayout>
			<Form onSubmit={handleSubmit}>
				<Autocomplete
					id='select-test-type'
					options={testTypes}
					value={newCovidTest.testType}
					required={true}
					name='testType'
					onChange={handleChange}
					renderInput={(params) => (
						<TextField {...params} label='Type of COVID test' />
					)}
				/>

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
					<RadioGroup row aria-label='result' name='result-radio-buttons-group'>
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
