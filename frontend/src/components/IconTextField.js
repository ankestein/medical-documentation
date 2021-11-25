import {Grid} from '@material-ui/core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {TextField} from '@mui/material';

export default function IconTextField({
	icon,
	value,
	required,
	onChange,
	placeholder,
	name,
}) {
	return (
		<Grid container spacing={1} alignItems='center'>
			<Grid item xs={1}>
				<FontAwesomeIcon icon={icon} color='grey' />
			</Grid>
			<Grid item xs={11}>
				<TextField
					variant='outlined'
					value={value}
					placeholder={placeholder}
					required={required}
					name={name}
					onChange={onChange}
				/>
			</Grid>
		</Grid>
	);
}
