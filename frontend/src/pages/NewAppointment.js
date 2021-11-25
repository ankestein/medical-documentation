import {Button, MenuItem, TextField} from '@mui/material';
import {useContext, useState} from 'react';
import styled from 'styled-components/macro';
import DateAdapter from '@mui/lab/AdapterMoment';
import {DatePicker, LocalizationProvider} from '@mui/lab';
import {submitAppointment} from '../service/DoctorApiService';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import Doctors from './Doctors';
import {
	faBell,
	faCalendarAlt,
	faCapsules,
	faClipboard,
	faCommentDots,
	faQuestionCircle,
	faStethoscope,
	faSyringe,
	faUserMd,
	faXRay,
} from '@fortawesome/free-solid-svg-icons';
import {AuthContext} from '../context/AuthProvider';
import IconTextField from '../components/IconTextField';
import {Grid} from '@material-ui/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

Doctors.propTypes = {
	allDoctors: PropTypes.array,
};

export default function NewAppointment({allDoctors}) {
	const initialAppointment = {
		date: null,
		reasonForVisit: '',
		reminder: '',
		notes: '',
		examination: '',
		doctorsReply: '',
		medication: '',
		imagingType: null,
		bloodSampling: '',
	};

	const imagingTypes = [
		{id: 'XRAY', label: 'X-Ray'},
		{id: 'CT', label: 'CT'},
		{id: 'MRT', label: 'MRT'},
		{id: 'ULTRASONIC', label: 'Ultrasonic'},
	];

	const [newAppointment, setNewAppointment] = useState(initialAppointment);
	const [selectedDoctorId, setSelectedDoctorId] = useState('');
	const {token} = useContext(AuthContext);

	const history = useHistory();

	const handleChange = (event) => {
		setNewAppointment({
			...newAppointment,
			[event.target.name]: event.target.value,
		});
	};

	const handleDateChange = (inputDate) => {
		setNewAppointment({...newAppointment, date: inputDate._d.toJSON()});
	};

	const handleDoctorChange = (event) => {
		setSelectedDoctorId(event.target.value);
	};

	const handleImagingChange = (event) => {
		setNewAppointment({...newAppointment, imagingType: event.target.value});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		submitAppointment(newAppointment, selectedDoctorId, token).catch(
			console.error
		);
		setNewAppointment(initialAppointment);
		setSelectedDoctorId('');
		history.push('/appointments');
	};

	return (
		<PageLayout>
			<Form onSubmit={handleSubmit}>
				<Grid container spacing={1} alignItems='center'>
					<Grid item xs={1}>
						<FontAwesomeIcon icon={faUserMd} color='grey' />
					</Grid>
					<Grid item xs={11}>
						<TextField
							fullWidth
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
					</Grid>
				</Grid>

				<Grid container spacing={1} alignItems='center'>
					<Grid item xs={1}>
						<FontAwesomeIcon icon={faCalendarAlt} color='grey' />
					</Grid>
					<Grid item xs={11}>
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
					</Grid>
				</Grid>

				<IconTextField
					icon={faQuestionCircle}
					value={newAppointment.reasonForVisit}
					placeholder='Reason for Visit'
					required={false}
					name='reasonForVisit'
					onChange={handleChange}
				/>

				<IconTextField
					icon={faBell}
					value={newAppointment.reminder}
					placeholder='Reminder'
					required={false}
					name='reminder'
					onChange={handleChange}
				/>

				<IconTextField
					icon={faClipboard}
					value={newAppointment.notes}
					placeholder='Notes'
					required={false}
					name='notes'
					onChange={handleChange}
				/>

				<IconTextField
					icon={faStethoscope}
					value={newAppointment.examination}
					placeholder='Examination'
					required={false}
					name='examination'
					onChange={handleChange}
				/>

				<IconTextField
					icon={faCommentDots}
					value={newAppointment.doctorsReply}
					placeholder="Doctor's reply"
					required={false}
					name='doctorsReply'
					onChange={handleChange}
				/>

				<Grid container spacing={1} alignItems='center'>
					<Grid item xs={1}>
						<FontAwesomeIcon icon={faXRay} color='grey' />
					</Grid>
					<Grid item xs={11}>
						<TextField
							fullWidth
							id='select-imaging'
							select
							value={newAppointment.imagingType}
							label='Imaging'
							required={false}
							name='imagingId'
							onChange={handleImagingChange}
						>
							{imagingTypes.map((imagingType) => (
								<MenuItem key={imagingType.id} value={imagingType.id}>
									{imagingType.label}
								</MenuItem>
							))}
						</TextField>
					</Grid>
				</Grid>

				<IconTextField
					icon={faCapsules}
					value={newAppointment.medication}
					placeholder='Medication'
					required={false}
					name='medication'
					onChange={handleChange}
				/>

				<IconTextField
					icon={faSyringe}
					value={newAppointment.bloodSampling}
					placeholder='Blood sampling'
					required={false}
					name='bloodSampling'
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
	margin-top: 56px;
	margin-bottom: 60px;
`;
