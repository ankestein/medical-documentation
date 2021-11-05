import {Button, TextField} from '@mui/material';
import {useState} from 'react';
import {submitDoctor} from '../service/doctorApiService';
import styled from 'styled-components/macro';

export default function NewDoctor() {
	const initialDoctor = {
		firstName: '',
		lastName: '',
		specialty: '',
		address: {
			street: '',
			streetNumber: '',
			postalCode: '',
			city: '',
			country: '',
		},
		phoneNumbers: {
			countryCode: '',
			areaCode: '',
			numberSuffix: '',
			phoneType: '',
		},
		emailAddress: '',
	};

	const [newDoctor, setNewDoctor] = useState(initialDoctor);

	const handleChange = (event) => {
		setNewDoctor({...newDoctor, [event.target.name]: event.target.value});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!newDoctor) {
			return;
		}
		submitDoctor(newDoctor).catch(console.error);
		setNewDoctor(initialDoctor);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<TextField
				variant='standard'
				value={newDoctor.firstName}
				placeholder='First name'
				name='firstName'
				onChange={handleChange}
			/>

			<TextField
				variant='standard'
				value={newDoctor.lastName}
				placeholder='Last name'
				required={true}
				name='lastName'
				onChange={handleChange}
			/>

			<Button type='submit'>Submit</Button>
		</Form>
	);
}

const Form = styled.form`
	width: 80%;
	margin: 40px auto;
	display: flex;
	flex-direction: column;
	gap: 20px;
`;
