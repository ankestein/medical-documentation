import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Stack} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import ConfirmDialog from '../components/ConfirmDialog';
import {useState} from 'react';
import {IconButton, makeStyles} from '@material-ui/core';
import AddButton from '../components/AddButton';

Doctors.propTypes = {
	removeDoctor: PropTypes.func.isRequired,
};

const useStyles = makeStyles({
	root: {
		'& .datagrid-theme--header': {
			backgroundColor: '#d0e0c0',
		},
		'& .datagrid-theme-button-header': {
			backgroundColor: '#d0e0c0',
			color: '#d0e0c0',
		},
	},
});

export default function Doctors({
	removeDoctor,
	allDoctors,
	selectedRowParams,
	setSelectedRowParams,
}) {
	const classes = useStyles();

	const [open, setOpen] = useState(false);

	const history = useHistory();

	const handleClickOpen = (cellValues) => {
		setOpen(true);
		setSelectedRowParams(cellValues.row);
	};

	const handleClickAddDoctor = () => {
		history.push('/new-doctor');
	};

	const columns = [
		{
			field: 'name',
			headerName: 'Name',
			width: 110,
			backgroundColor: 'red',
			headerClassName: 'datagrid-theme--header',
		},
		{
			field: 'specialty',
			headerName: 'Specialty',
			width: 110,
			headerClassName: 'datagrid-theme--header',
		},
		{
			field: 'city',
			headerName: 'City',
			width: 100,
			headerClassName: 'datagrid-theme--header',
		},
		{
			field: 'delete',
			headerName: '-',
			color: '#a1c181ff',
			headerClassName: 'datagrid-theme-button-header',
			renderCell: (cellValues) => {
				return (
					<Stack direction='row' spacing={0.1} margin={0} padding={0}>
						<IconButton
							color='#a1c181ff'
							size='small'
							style={{margin: 0, padding: 0}}
							onClick={() => handleClickOpen(cellValues)}
						>
							<DeleteIcon fontSize='small' />
						</IconButton>
						<IconButton
							color='#a1c181ff'
							size='small'
							style={{margin: 0, padding: 0}}
						>
							<EditIcon fontSize='small' />
						</IconButton>
					</Stack>
				);
			},
		},
	];

	const rows = allDoctors.map((doctor) => {
		return {
			id: doctor.id,
			name: `${doctor.lastName}, ${doctor.firstName.charAt(0)}.`,
			specialty: doctor.specialty,
			city: doctor.city,
		};
	});

	return (
		<PageLayout>
			<StyledH1>Doctors</StyledH1>

			<AddButton onClick={handleClickAddDoctor} />

			<DataGridContainer>
				<DataGrid
					hideFooterPagination={false}
					rows={rows}
					columns={columns}
					className={classes.root}
					style={{fontSize: 11}}
				/>
			</DataGridContainer>
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
	margin-top: 56px;
	margin-bottom: 60px;
`;

const StyledH1 = styled.h1`
	color: #303030;
	font-family: Montserrat, Roboto, Helvetica, Arial, sans-serif;
	font-weight: 500;
	font-size: 18px;
	margin-left: 12px;
	padding-top: 12px;
`;

const DataGridContainer = styled.div`
	height: 650px;
	width: 100%;
	z-index: 1;
`;
