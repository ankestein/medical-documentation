import {Button, MenuItem, TextField} from '@mui/material';
import {useState} from 'react';
import {getDoctors, submitDoctor} from '../service/DoctorApiService';
import styled from 'styled-components/macro';
import {useHistory} from 'react-router-dom';
import useDoctors from '../hooks/useDoctors';

export default function NewDoctor() {
	const {setAllDoctors} = useDoctors();

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
	const history = useHistory();

	const handleChange = (event) => {
		setNewDoctor({...newDoctor, [event.target.name]: event.target.value});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!newDoctor.lastName || !newDoctor.specialty || !newDoctor.city) {
			return;
		}
		submitDoctor(newDoctor).catch(console.error);
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
					placeholder='First name'
					required={true}
					name='firstName'
					onChange={handleChange}
				/>

				<TextField
					variant='outlined'
					value={newDoctor.lastName}
					placeholder='Last name'
					required={true}
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
					placeholder='Street'
					required={false}
					name='street'
					onChange={handleChange}
				/>

				<TextField
					variant='outlined'
					value={newDoctor.streetNumber}
					placeholder='Number'
					required={false}
					name='streetNumber'
					onChange={handleChange}
				/>

				<TextField
					variant='outlined'
					value={newDoctor.postalCode}
					placeholder='Postal code'
					required={false}
					name='postalCode'
					onChange={handleChange}
				/>

				<TextField
					variant='outlined'
					value={newDoctor.city}
					placeholder='City'
					required={true}
					name='city'
					onChange={handleChange}
				/>

				<TextField
					variant='outlined'
					value={newDoctor.country}
					placeholder='Country'
					required={false}
					name='country'
					onChange={handleChange}
				/>

				<TextField
					variant='outlined'
					value={newDoctor.phoneNumber}
					placeholder='Phone'
					required={false}
					name='phoneNumber'
					onChange={handleChange}
				/>

				<TextField
					variant='outlined'
					value={newDoctor.mobileNumber}
					placeholder='Mobile'
					required={false}
					name='mobileNumber'
					onChange={handleChange}
				/>

				<TextField
					variant='outlined'
					value={newDoctor.emailAddress}
					placeholder='Email'
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
