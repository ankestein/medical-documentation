import {useContext, useState} from 'react';
import {Button} from '@material-ui/core';
import {TextField} from '@mui/material';
import styled from 'styled-components/macro';
import {AuthContext} from '../context/AuthProvider';

const initialState = {
	username: '',
	password: '',
};

export default function LoginPage() {
	const [credentials, setCredentials] = useState(initialState);
	const {login} = useContext(AuthContext);

	const handleChange = (event) => {
		setCredentials({...credentials, [event.target.name]: event.target.value});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		login(credentials);
	};

	return (
		<PageLayout>
			<Form onSubmit={handleSubmit}>
				<TextField
					type='text'
					required
					value={credentials.username}
					name='username'
					label='Username'
					onChange={handleChange}
				/>

				<TextField
					type='password'
					required
					value={credentials.password}
					name='password'
					onChange={handleChange}
					label='Password'
				/>
				<Button type='submit'>Login</Button>
			</Form>
		</PageLayout>
	);
}

const Form = styled.form`
	width: 60%;
	margin: 40px auto;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

const PageLayout = styled.div`
	margin-top: 80px;
	margin-bottom: 60px;
`;
