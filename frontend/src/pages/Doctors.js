import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {Button, Fab} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {Link} from 'react-router-dom';
import styled from 'styled-components/macro';
import useDoctors from '../hooks/useDoctors';
import PropTypes from 'prop-types';
import ConfirmDialog from '../components/ConfirmDialog';

Doctors.propTypes = {
	removeDoctor: PropTypes.func.isRequired,
};

export default function Doctors({removeDoctor, open, setOpen}) {
	const {allDoctors} = useDoctors();

	const fabStyle = {
		position: 'absolute',
		top: 60,
		right: 16,
	};

	const handleClickOpen = () => {
		setOpen(true);
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
					<div>
						<Button
							startIcon={<DeleteIcon />}
							color='primary'
							onClick={() => handleClickOpen()}
						>
							Delete
						</Button>

						<ConfirmDialog
							cellValues={cellValues}
							removeDoctor={removeDoctor}
							open={open}
							setOpen={setOpen}
						/>
					</div>
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
