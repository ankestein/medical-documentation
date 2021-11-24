import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {Fab, Stack} from '@mui/material';
import {DataGrid} from '@mui/x-data-grid';
import {Link} from 'react-router-dom';
import styled from 'styled-components/macro';
import PropTypes from 'prop-types';
import ConfirmDialog from '../components/ConfirmDialog';
import {useState} from 'react';
import {IconButton, makeStyles} from '@material-ui/core';

Doctors.propTypes = {
	removeDoctor: PropTypes.func.isRequired,
};

const useStyles = makeStyles({
	root: {
		'& .datagrid-theme--header': {
			backgroundColor: '#a1c181ff',
		},
		'& .datagrid-theme-button-header': {
			backgroundColor: '#a1c181ff',
			color: '#a1c181ff',
		},
	},
});

export default function Doctors({
	removeDoctor,
	allDoctors,
	selectedRowParams,
	setSelectedRowParams,
	fabPosition,
}) {
	const classes = useStyles();

	const [open, setOpen] = useState(false);

	const handleClickOpen = (cellValues) => {
		setOpen(true);
		setSelectedRowParams(cellValues.row);
	};

	const columns = [
		{
			field: 'name',
			headerName: 'Name',
			width: 110,
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

			<Fab
				color='#a1c181ff'
				size='small'
				sx={fabPosition}
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
				<DataGrid
					hideFooterPagination={false}
					rows={rows}
					columns={columns}
					className={classes.root}
					style={{fontSize: 11}}
				/>
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

const StyledH1 = styled.h1`
	font-family: Montserrat, Roboto, Helvetica, Arial, sans-serif;
	font-weight: 500;
	font-size: 18px;
	margin: 12px;
`;
