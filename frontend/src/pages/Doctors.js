import AddIcon from '@mui/icons-material/Add';
import {
	Fab,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import {Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {getDoctors} from '../service/DoctorApiService';
import styled from 'styled-components/macro';

export default function Doctors() {
	const [doctors, setDoctors] = useState([]);

	useEffect(() => {
		getDoctors()
			.then((doctors) => setDoctors(doctors))
			.catch((error) => console.error(error.message));
	}, []);

	const fabStyle = {
		position: 'absolute',
		top: 60,
		right: 16,
	};

	return (
		<PageLayout>
			<H2>Doctors</H2>

			<Fab
				color='primary'
				size='small'
				sx={fabStyle}
				aria-label='add'
				component={Link}
				to='/new-doctor'
			>
				<AddIcon />
			</Fab>

			<TableContainer component={Paper}>
				<Table size='small' aria-label='doctors-table'>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell align='left'>Specialty</TableCell>
							<TableCell align='left'>City</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{doctors
							.sort((first, second) => {
								return first.lastName > second.lastName ? 1 : -1;
							})
							.map((doctor) => (
								<TableRow
									key={doctor.id}
									sx={{'&:last-child td, &:last-child th': {border: 0}}}
								>
									<TableCell component='th' scope='row'>
										{`${doctor.firstName} ${doctor.lastName}`}
									</TableCell>
									<TableCell align='left'>{doctor.specialty}</TableCell>
									<TableCell align='left'>{doctor.city}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</PageLayout>
	);
}

const PageLayout = styled.div`
	margin-bottom: 60px;
`;

const H2 = styled.h2`
	margin-left: 12px;
`;
