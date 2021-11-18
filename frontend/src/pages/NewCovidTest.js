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
import {DateTimePicker, LocalizationProvider} from '@mui/lab';

export default function NewCovidTest({setAllCovidTests}) {
	{
		/*}
	const initialCovidTest = {
		testType: '',
		dateTime: null,
		result: '',
	};
	*/
	}
	{
		/*}
	const initialCovidTest = {
		testType: null,
		dateTime: null,
		result: '',
	};
*/
	}

	const [newCovidTest, setNewCovidTest] = useState({});
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
		//setNewCovidTest(initialCovidTest);
		setNewCovidTest({});
		getCovidTests()
			.then((covidTests) => setAllCovidTests(covidTests))
			.catch(console.error)
			.then(() => history.push('/covid-tests'));
	};

	{
		/*}
	const testTypes = [
		{value: 'ANTIGEN_LOLLIPOP', label: 'Antigen test - lollipop'},
		{value: 'ANTIGEN_NASAL', label: 'Antigen test - nasal'},
		{value: 'ANTIGEN_NASOPHARYNGEAL', label: 'Antigen test - nasopharyngeal'},
		{value: 'ANTIGEN_SALIVA', label: 'Antigen test - saliva'},
		{value: 'PCR_TEST', label: 'PCR test'},
	];
  */
	}
	{
		/*}
const testTypes = [
  'ANTIGEN_LOLLIPOP',
  'ANTIGEN_NASAL',
  'ANTIGEN_NASOPHARYNGEAL',
  'ANTIGEN_SALIVA',
  'PCR_TEST',
];
	*/
	}

	return (
		<PageLayout>
			<Form onSubmit={handleSubmit}>
				{/*}
      <Autocomplete
        id='select-test-type'
        options={testTypes}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        value={newCovidTest.testType}
        required={true}
        name='testType'
        onChange={handleChange}
        renderInput={(params) => (
          <TextField {...params} label='Type of COVID test' />
        )}
      />
      */}

				{/*}
				<Autocomplete
					options={testTypes}
					isOptionEqualToValue={(option, value) => option.value === value.value}
					value={newCovidTest.testType}
					name='testType'
					getOptionLabel={(option) => option.value}
					renderOption={(option) => <>{option.label}</>}
					onChange={handleChange}
					renderInput={(params) => (
						<TextField {...params} label='Type of COVID test' />
					)}
				/>
     */}

				<FormControl component='fieldset'>
					<FormLabel component='legend'>Type of COVID test</FormLabel>
					<RadioGroup
						row
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
