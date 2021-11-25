import {Button, MenuItem, TextField} from '@mui/material';
import {useContext, useState} from 'react';
import {getDoctors, submitDoctor} from '../service/DoctorApiService';
import styled from 'styled-components/macro';
import {useHistory} from 'react-router-dom';
import {AuthContext} from '../context/AuthProvider';

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
				<TextField
					variant='outlined'
					value={newDoctor.firstName}
					label='First name'
					required={true}
					name='firstName'
					onChange={handleChange}
				/>

				<TextField
					variant='outlined'
					value={newDoctor.lastName}
					required={true}
					label='Last name'
					name='lastName'
					onChange={handleChange}
				/>

				<TextField
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

				<TextField
					variant='outlined'
					value={newDoctor.street}
					label='Street'
					required={false}
					name='street'
					onChange={handleChange}
				/>

				<TextField
					variant='outlined'
					value={newDoctor.streetNumber}
					label='Number'
					required={false}
					name='streetNumber'
					onChange={handleChange}
				/>

				<TextField
					variant='outlined'
					value={newDoctor.postalCode}
					label='Postal code'
					required={false}
					name='postalCode'
					onChange={handleChange}
				/>

				<TextField
					variant='outlined'
					value={newDoctor.city}
					label='City'
					required={true}
					name='city'
					onChange={handleChange}
				/>

				<TextField
					variant='outlined'
					value={newDoctor.country}
					label='Country'
					required={false}
					name='country'
					onChange={handleChange}
				/>

				<TextField
					variant='outlined'
					value={newDoctor.phoneNumber}
					label='Phone'
					required={false}
					name='phoneNumber'
					onChange={handleChange}
				/>

				<TextField
					variant='outlined'
					value={newDoctor.mobileNumber}
					label='Mobile'
					required={false}
					name='mobileNumber'
					onChange={handleChange}
				/>

				<TextField
					variant='outlined'
					value={newDoctor.emailAddress}
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
	margin-bottom: 60px;
`;
