import styled from 'styled-components/macro';
import AppointmentStickyNote from '../components/AppointmentStickyNote';

export default function Homepage({allDoctors}) {
	const futureAppointments = (appointment) => {
		return new Date(appointment.date) - new Date() > 0;
	};

	return (
		<Background>
			<PageLayout>
				<StyledH1>My next appointments:</StyledH1>

				<CardContainer>
					{allDoctors.map((doctor) => {
						return doctor.appointments
							.filter(futureAppointments)
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
		</Background>
	);
}

const Background = styled.div`
	height: 100vh;
	background: #d0e0c0;
`;

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

const CardContainer = styled.div`
	max-width: 90%;
	margin: 0 auto;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-auto-rows: 190px;
	z-index: 1;
`;
