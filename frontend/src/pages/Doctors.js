import AddIcon from '@mui/icons-material/Add';
import {Button, Fab} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {Link} from 'react-router-dom';
import styled from 'styled-components/macro';
import useDoctors from '../hooks/useDoctors';
import PropTypes from 'prop-types';

Doctors.propTypes = {
	removeDoctor: PropTypes.func.isRequired,
};

export default function Doctors({removeDoctor}) {
	const {allDoctors} = useDoctors();

	const fabStyle = {
		position: 'absolute',
		top: 60,
		right: 16,
	};

	const columns = [
		{field: 'col1', headerName: 'Name', width: 150},
		{field: 'col2', headerName: 'Specialty', width: 150},
		{field: 'col3', headerName: 'City', width: 150},
		{
			field: 'delete',
			headerName: '',
			renderCell: (cellValues) => {
				return (
					<Button
						color='primary'
						onClick={() => {
							removeDoctor(cellValues.row.id);
						}}
					>
						Delete
					</Button>
				);
			},
		},
	];

	const rows = allDoctors.map((doctor) => {
		return {
			id: doctor.id,
			col1: `${doctor.lastName}, ${doctor.firstName}`,
			col2: doctor.specialty,
			col3: doctor.city,
		};
	});
	console.log(rows);

	return (
		<PageLayout>
			<StyledH1>Doctors</StyledH1>

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

			<div style={{height: '650px', width: '100%'}}>
				<DataGrid hideFooterPagination={false} rows={rows} columns={columns} />
			</div>
		</PageLayout>
	);
}

const PageLayout = styled.div`
	margin-bottom: 60px;
`;

const StyledH1 = styled.h1`
	margin-left: 12px;
`;
