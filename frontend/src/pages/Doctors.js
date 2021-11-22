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
		position: 'relative',
		top: -62,
		right: -310,
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
				//color='primary'
				//size='small'
				//sx={fabStyle}
				aria-label='add-doctor'
				component={Link}
				to='/new-doctor'
			>
				<AddIcon />
			</Fab>

			{/*
			// style AddIcon myself because styling of FAB breaks when Dialog opens
			<AddIcon
				style={{
					cursor: 'pointer',
					//fontSize: '1.2857142857142856rem',
					//fontWeight: 500,
					//lineHeight: 1.75,
					//letterSpacing: '0.02857em',
					//textTransform: 'uppercase',
					//color: 'rgba(0, 0, 0, 0.87)',
					borderRadius: '50%',
					width: 40,
					height: 40,
					background: '#a1c181ff',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					boxShadow:
						'0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
					...fabStyle,
				}}
			></AddIcon>
			*/}

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
