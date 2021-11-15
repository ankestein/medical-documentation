import {Button, MenuItem, TextField} from '@mui/material';
import {useState} from 'react';
import styled from 'styled-components/macro';
import DateAdapter from '@mui/lab/AdapterMoment';
import {DatePicker, LocalizationProvider} from '@mui/lab';
import {submitAppointment} from '../service/DoctorApiService';
import {useHistory} from 'react-router-dom';

export default function NewAppointment({allDoctors}) {
	const initialAppointment = {
		date: null,
		reasonForVisit: '',
		notes: '',
	};

	const [newAppointment, setNewAppointment] = useState(initialAppointment);
	const [selectedDoctorId, setSelectedDoctorId] = useState('');

	const history = useHistory();

	const handleChange = (event) => {
		setNewAppointment({
			...newAppointment,
			[event.target.name]: event.target.value,
		});
	};

	const handleDateChange = (inputDate) => {
		//const formattedDate = moment(inputDate, 'YYYY-MM-DD').format('LL');
		//setNewAppointment({...newAppointment, date: formattedDate});
		//setNewAppointment({...newAppointment, date: inputDate});
		//setNewAppointment({...newAppointment, date: inputDate._d.toJSON()});
		setNewAppointment({...newAppointment, date: inputDate._d.toString()});
		//console.log(`newAppointment: ${JSON.stringify(newAppointment)}`);
		//console.log(`date: ${JSON.stringify(formattedDate)}`);
	};

	const handleDoctorChange = (event) => {
		setSelectedDoctorId(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		submitAppointment(newAppointment, selectedDoctorId).catch(console.error);
		setNewAppointment(initialAppointment);
		setSelectedDoctorId('');
		history.push('/appointments');
	};

	return (
		<PageLayout>
			<Form onSubmit={handleSubmit}>
				<TextField
					id='select-doctor'
					select
					value={selectedDoctorId}
					label='Doctor'
					required={true}
					name='doctorId'
					onChange={handleDoctorChange}
				>
					{allDoctors
						.sort((first, second) => {
							return first.lastName > second.lastName ? 1 : -1;
						})
						.map((doctor) => (
							<MenuItem key={doctor.id} value={doctor.id}>
								{`${doctor.lastName}, ${doctor.firstName} - ${doctor.specialty} - ${doctor.city}`}
							</MenuItem>
						))}
				</TextField>

				<LocalizationProvider dateAdapter={DateAdapter}>
					<DatePicker
						label='Date'
						value={newAppointment.date}
						onChange={handleDateChange}
						name='date'
						renderInput={(params) => <TextField {...params} />}
						showTodayButton={true}
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
