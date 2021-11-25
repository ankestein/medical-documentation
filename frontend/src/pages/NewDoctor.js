import {Button, MenuItem, TextField} from '@mui/material';
import {useContext, useState} from 'react';
import {getDoctors, submitDoctor} from '../service/DoctorApiService';
import styled from 'styled-components/macro';
import {useHistory} from 'react-router-dom';
import {AuthContext} from '../context/AuthProvider';
import IconTextField from '../components/IconTextField';
import {
	faEnvelope,
	faMapMarkerAlt,
	faMobileAlt,
	faPhone,
	faTooth,
	faUserMd,
} from '@fortawesome/free-solid-svg-icons';
import {Grid} from '@material-ui/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export default function NewDoctor({setAllDoctors}) {
	const initialDoctor = {
		firstName: '',
		lastName: '',
		specialty: '',
		street: '',
		streetNumber: '',
		postalCode: '',
		city: '',
		country: 'Germany',
		phoneNumber: '',
		mobileNumber: '',
		emailAddress: '',
	};

	const [newDoctor, setNewDoctor] = useState(initialDoctor);
	const {token} = useContext(AuthContext);
	const history = useHistory();

	const handleChange = (event) => {
		setNewDoctor({...newDoctor, [event.target.name]: event.target.value});
	};

	const isValid = (newDoc) => {
		return newDoc.lastName && newDoc.specialty && newDoc.city;
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!isValid(newDoctor)) {
			return;
		}
		submitDoctor(newDoctor, token).catch(console.error);
		setNewDoctor(initialDoctor);
		getDoctors()
			.then((doctors) => setAllDoctors(doctors))
			.catch(console.error)
			.then(() => history.push('/doctors'));
	};

	const specialties = [
		'Cardiologist',
		'Dentist',
		'Dermatologist',
		'ENT physician',
		'Gastroenterologist',
		'General practitioner',
		'Gynecologist',
		'Oncologist',
		'Ophthalmologist',
		'Orthopedist',
		'Pediatrician',
		'Psychiatrist',
		'Pulmonologist',
		'Radiologist',
		'Urologist',
	];

	return (
		<PageLayout>
			<Form onSubmit={handleSubmit}>
				<IconTextField
					icon={faUserMd}
					value={newDoctor.firstName}
					label='First name'
					required={true}
					name='firstName'
					onChange={handleChange}
				/>

				<IconTextField
					icon={faUserMd}
					value={newDoctor.lastName}
					required={true}
					label='Last name'
					name='lastName'
					onChange={handleChange}
				/>

				<Grid container spacing={1} alignItems='center'>
					<Grid item xs={1}>
						<FontAwesomeIcon icon={faTooth} color='grey' />
					</Grid>
					<Grid item xs={11}>
						<TextField
							fullWidth
							id='select-specialty'
							select
							value={newDoctor.specialty}
							label='Specialty'
							required={true}
							name='specialty'
							onChange={handleChange}
						>
							{specialties.map((specialty) => (
								<MenuItem key={specialty} value={specialty}>
									{specialty}
								</MenuItem>
							))}
						</TextField>
					</Grid>
				</Grid>

				<IconTextField
					icon={faMapMarkerAlt}
					value={newDoctor.street}
					placeholder='Street'
					label='Street'
					required={false}
					name='street'
					onChange={handleChange}
				/>

				<IconTextField
					icon={faMapMarkerAlt}
					value={newDoctor.streetNumber}
					placeholder='Number'
					label='Number'
					required={false}
					name='streetNumber'
					onChange={handleChange}
				/>

				<IconTextField
					icon={faMapMarkerAlt}
					value={newDoctor.postalCode}
					placeholder='Postal code'
					label='Postal code'
					required={false}
					name='postalCode'
					onChange={handleChange}
				/>

				<IconTextField
					icon={faMapMarkerAlt}
					value={newDoctor.city}
					placeholder='City'
					label='City'
					required={true}
					name='city'
					onChange={handleChange}
				/>

				<IconTextField
					icon={faMapMarkerAlt}
					value={newDoctor.country}
					placeholder='Country'
					label='Country'
					required={false}
					name='country'
					onChange={handleChange}
				/>

				<IconTextField
					icon={faPhone}
					value={newDoctor.phoneNumber}
					placeholder='Phone'
					label='Phone'
					required={false}
					name='phoneNumber'
					onChange={handleChange}
				/>

				<IconTextField
					icon={faMobileAlt}
					value={newDoctor.mobileNumber}
					placeholder='Mobile'
					label='Mobile'
					required={false}
					name='mobileNumber'
					onChange={handleChange}
				/>

				<IconTextField
					icon={faEnvelope}
					value={newDoctor.emailAddress}
					placeholder='Email'
					label='Email'
					required={false}
					name='emailAddress'
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
