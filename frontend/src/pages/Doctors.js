import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button, Fab, Typography} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {Link} from 'react-router-dom';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import ConfirmDialog from '../components/ConfirmDialog';
import {useState} from 'react';

Doctors.propTypes = {
	removeDoctor: PropTypes.func.isRequired,
};

export default function Doctors({
	removeDoctor,
	allDoctors,
	selectedRowParams,
	setSelectedRowParams,
}) {
	const fabStyle = {
		position: 'absolute',
		top: 60,
		right: 16,
	};

	const [open, setOpen] = useState(false);

	const handleClickOpen = (cellValues) => {
		setOpen(true);
		setSelectedRowParams(cellValues.row);
	};

	const columns = [
		{field: 'name', headerName: 'Name', width: 150},
		{field: 'specialty', headerName: 'Specialty', width: 150},
		{field: 'city', headerName: 'City', width: 150},
		{
			field: 'delete',
			headerName: '',
			renderCell: (cellValues) => {
				return (
					<Button
						startIcon={<DeleteIcon />}
						color='primary'
						onClick={() => handleClickOpen(cellValues)}
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
			name: `${doctor.lastName}, ${doctor.firstName}`,
			specialty: doctor.specialty,
			city: doctor.city,
		};
	});

	return (
		<PageLayout>
			<Typography variant='h1'>Doctors</Typography>

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

			<ConfirmDialog
				selectedRowParams={selectedRowParams}
				method={removeDoctor}
				open={open}
				setOpen={setOpen}
				message={`Delete ${selectedRowParams.name}?`}
			/>
		</PageLayout>
	);
}

const PageLayout = styled.div`
	margin-bottom: 60px;
`;
