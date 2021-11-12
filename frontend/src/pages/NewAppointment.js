import {Button, MenuItem, TextField} from '@mui/material';
import {useEffect, useState} from 'react';
import styled from 'styled-components/macro';
import DateAdapter from '@mui/lab/AdapterMoment';
import {DatePicker, LocalizationProvider} from '@mui/lab';
import moment from 'moment';
import {getDoctors, submitAppointment} from '../service/DoctorApiService';

export default function NewAppointment() {
	const initialAppointment = {
		date: null,
		reasonForVisit: '',
		notes: '',
	};

	const initialDoctor = {
		id: '',
		firstName: '',
		lastName: '',
		specialty: '',
		street: '',
		streetNumber: '',
		postalCode: '',
		city: '',
		country: '',
		phoneNumber: '',
		mobileNumber: '',
		emailAddress: '',
		appointmentDto: initialAppointment,
	};

	const [newAppointment, setNewAppointment] = useState(initialAppointment);
	const [selectedDoctor, setSelectedDoctor] = useState(initialDoctor);
	const [allDoctors, setAllDoctors] = useState([]);

	useEffect(() => {
		getDoctors()
			.then((doctors) => setAllDoctors(doctors))
			.catch((error) => console.error(error.message));
	}, []);

	useEffect(() => {
		setSelectedDoctor({...selectedDoctor, appointmentDto: newAppointment});
	}, [newAppointment]);

	const handleChange = (event) => {
		setNewAppointment({
			...newAppointment,
			[event.target.name]: event.target.value,
		});
	};

	const handleDateChange = (inputDate) => {
		const formattedDate = moment(inputDate, 'YYYY-MM-DD').format('LL');
		setNewAppointment({...newAppointment, date: formattedDate});
	};

	const handleDoctorChange = (event) => {
		let doctorToUpdate = allDoctors.find(
			(doctor) => doctor.id === event.target.value
		);
		delete doctorToUpdate.appointments;
		setSelectedDoctor(doctorToUpdate);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		submitAppointment(selectedDoctor).catch(console.error);
		setNewAppointment(initialAppointment);
		setSelectedDoctor(initialDoctor);
	};

	return (
		<PageLayout>
			<Form onSubmit={handleSubmit}>
				<TextField
					id='select-doctor'
					select
					value={selectedDoctor.id}
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
