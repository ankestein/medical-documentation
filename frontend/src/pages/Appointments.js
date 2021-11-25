import AddIcon from '@mui/icons-material/Add';
import {useHistory} from 'react-router-dom';
import Doctors from './Doctors';
import PropTypes from 'prop-types';
import AppointmentCard from '../components/AppointmentCard';
import styled from 'styled-components/macro';
import {customStyle} from '../styling/styles';

Doctors.propTypes = {
	allDoctors: PropTypes.array,
};

export default function Appointments({allDoctors}) {
	const history = useHistory();

	const handleClickAddAppointment = () => {
		history.push('/new-appointment');
	};

	return (
		<PageLayout>
			<StyledH1>Appointments</StyledH1>

			<AddIcon
				style={customStyle.addIconStyle}
				sx={customStyle.fabPosition}
				onClick={handleClickAddAppointment}
			/>

			<Circle>
				<AddIcon />
			</Circle>

			<CardContainer>
				{allDoctors.map((doctor) => {
					return doctor.appointments.map((appointment) => {
						return (
							<AppointmentCard doctor={doctor} appointment={appointment} />
						);
					});
				})}
			</CardContainer>
		</PageLayout>
	);
}

const PageLayout = styled.div`
	margin-bottom: 60px;
`;

const CardContainer = styled.div`
	max-width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-auto-rows: 190px;
`;

const StyledH1 = styled.h1`
	font-family: Montserrat, Roboto, Helvetica, Arial, sans-serif;
	font-weight: 500;
	font-size: 18px;
	margin: 12px;
`;

const Circle = styled.div`
	cursor: pointer;
	border-radius: 50%;
	width: 40px;
	height: 40px;
	background: var(--primary-background);
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
		0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
`;
