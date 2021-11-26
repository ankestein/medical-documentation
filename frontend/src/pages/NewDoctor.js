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

	const fields = [
		{
			icon: faMapMarkerAlt,
			label: 'Street',
		},
		{
			icon: faMapMarkerAlt,
			label: 'Number',
			name: 'streetNumber',
		},
		{
			icon: faMapMarkerAlt,
			label: 'Postal code',
			name: 'postalCode',
		},
		{
			icon: faMapMarkerAlt,
			label: 'City',
			required: true,
		},
		{
			icon: faMapMarkerAlt,
			label: 'Country',
		},
		{
			icon: faPhone,
			label: 'Phone',
			name: 'phoneNumber',
		},
		{
			icon: faMobileAlt,
			label: 'Mobile',
			name: 'mobileNumber',
		},
		{
			icon: faEnvelope,
			label: 'Email',
			name: 'emailAddress',
		},
	];

	const toLowerCamelCase = (input) => {
		const regex = /\s+(\w)?/gi;
		input.toLowerCase().replace(regex, function (match, letter) {
			return letter.toUpperCase();
		});
	};

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

				{fields.map((field) => {
					return (
						<IconTextField
							icon={field.icon}
							value={
								field.name ? newDoctor[field.name] : newDoctor[field.label]
							}
							placeholder={field.label}
							label={field.label}
							required={field.required ? field.required : false}
							name={field.name ? field.name : field.label.toLowerCase()}
							onChange={handleChange}
						/>
					);
				})}

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
	margin-top: 64px;
	margin-bottom: 60px;
`;
