import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@material-ui/core';

import {DialogContentText} from '@mui/material';

export default function ConfirmDialog({
	selectedRowParams,
	open,
	setOpen,
	removeDoctor,
}) {
	const handleClickClose = () => {
		setOpen(false);
	};

	const handleClickRemove = () => {
		removeDoctor(selectedRowParams.id);
		handleClickClose();
	};

	return (
		<Dialog open={open} onClose={handleClickClose}>
			<DialogTitle id='alert-dialog-title'>{''}</DialogTitle>
			<DialogContent>
				<DialogContentText id='alert-dialog-description'>
					{`Delete ${selectedRowParams.name}?`}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClickClose} color='primary'>
					Cancel
				</Button>
				<Button onClick={() => handleClickRemove()} color='secondary' autoFocus>
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
}
