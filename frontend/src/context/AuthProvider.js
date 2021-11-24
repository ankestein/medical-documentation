import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {createContext, useState} from 'react';

export const AuthContext = createContext({});

export default function AuthProvider({children}) {
	const [token, setToken] = useState();
	const history = useHistory();

	const login = (credentials) => {
		axios
			.post('/auth/login', credentials)
			.then((res) => res.data)
			.then((data) => setToken(data))
			.then(() => history.push('/'))
			.catch((error) => console.error(error.message));
	};

	return (
		<AuthContext.Provider value={{token, login}}>
			{children}
		</AuthContext.Provider>
	);
}
