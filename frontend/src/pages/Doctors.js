import AddIcon from '@mui/icons-material/Add';
import {Fab} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
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

	const columns = [
		{field: 'col1', headerName: 'Name', width: 150},
		{field: 'col2', headerName: 'Specialty', width: 150},
		{field: 'col3', headerName: 'City', width: 150},
	];

	const rows = doctors.map((doctor) => {
		return {
			id: doctor.id,
			col1: `${doctor.lastName}, ${doctor.firstName}`,
			col2: doctor.specialty,
			col3: doctor.city,
		};
	});

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

			<div style={{width: '100%'}}>
				<DataGrid rows={rows} columns={columns} hideFooterPagination={true} />
			</div>
		</PageLayout>
	);
}

const PageLayout = styled.div`
	margin-bottom: 60px;
`;

const H2 = styled.h2`
	margin-left: 12px;
`;
