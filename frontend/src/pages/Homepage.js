import styled from 'styled-components/macro';
import AppointmentStickyNote from '../components/AppointmentStickyNote';

export default function Homepage({allDoctors}) {
	return (
		<PageLayout>
			<StyledH1>My next appointments:</StyledH1>

			<CardContainer>
				{allDoctors.map((doctor) => {
					return doctor.appointments
						.filter(
							(appointment) => new Date(appointment.date) - new Date() > 0
						)
						.map((appointment) => {
							return (
								<AppointmentStickyNote
									doctor={doctor}
									appointment={appointment}
								/>
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

const StyledH1 = styled.h1`
	font-family: Montserrat, Roboto, Helvetica, Arial, sans-serif;
	font-weight: 500;
	font-size: 18px;
	margin: 12px;
`;

const CardContainer = styled.div`
	max-width: 90%;
	margin: 0 auto;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-auto-rows: 190px;
	z-index: 1;
`;
