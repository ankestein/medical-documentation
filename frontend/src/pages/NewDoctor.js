import {Button, TextField} from '@mui/material';
import {useState} from 'react';
import {submitDoctor} from '../service/DoctorApiService';
import styled from 'styled-components/macro';

export default function NewDoctor() {
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
	};

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
					variant='outlined'
					value={newDoctor.specialty}
					placeholder='Specialty'
					required={true}
					name='specialty'
					onChange={handleChange}
				/>

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
