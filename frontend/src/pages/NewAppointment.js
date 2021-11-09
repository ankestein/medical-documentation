import {Button, TextField} from '@mui/material';
import {useState} from 'react';
import {submitAppointment} from '../service/AppointmentApiService';
import styled from 'styled-components/macro';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {DatePicker, LocalizationProvider} from '@mui/lab';
import moment from 'moment';

export default function NewAppointment() {
	const initialAppointment = {
		doctor: '',
		date: null,
		reasonForVisit: '',
		notes: '',
	};

	const [newAppointment, setNewAppointment] = useState(initialAppointment);

	const handleChange = (event) => {
		setNewAppointment({
			...newAppointment,
			[event.target.name]: event.target.value,
		});
	};

	const handleDateChange = (inputDate) => {
		const formattedDate = moment(inputDate, 'YYYY-MM-DD').format('LL');
		setNewAppointment({
			...newAppointment,
			date: formattedDate,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		submitAppointment(newAppointment).catch(console.error);
		setNewAppointment(initialAppointment);
	};

	return (
		<PageLayout>
			<Form onSubmit={handleSubmit}>
				<TextField
					variant='outlined'
					value={newAppointment.doctor}
					placeholder='Doctor'
					required={true}
					name='doctor'
					onChange={handleChange}
				/>

				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<DatePicker
						label='Date'
						value={newAppointment.date}
						onChange={handleDateChange}
						name='date'
						renderInput={(params) => <TextField {...params} />}
					/>
				</LocalizationProvider>

				<TextField
					variant='outlined'
					value={newAppointment.reasonForVisit}
					placeholder='Reason for Visit'
					required={false}
					name='reasonForVisit'
					onChange={handleChange}
				/>

				<TextField
					variant='outlined'
					value={newAppointment.notes}
					placeholder='Notes'
					required={false}
					name='notes'
					onChange={handleChange}
				/>

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
