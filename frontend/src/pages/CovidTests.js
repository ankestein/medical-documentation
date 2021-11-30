import styled from 'styled-components/macro';
import {useHistory} from 'react-router-dom';
import CovidTestCard from '../components/CovidTestCard';
import AddButton from '../components/AddButton';

export default function CovidTests({
	allCovidTests,
	setAllCovidTests,
	newCovidTest,
	setNewCovidTest,
	initialCovidTest,
}) {
	const history = useHistory();

	const handleClickAddCovidTest = () => {
		history.push('/new-covid-test');
	};

	return (
		<PageLayout>
			<StyledH1>COVID19 Tests</StyledH1>

			<AddButton onClick={handleClickAddCovidTest} />

			<CardContainer>
				{allCovidTests.map((covidTest) => {
					return (
						<CovidTestCard
							covidTest={covidTest}
							setAllCovidTests={setAllCovidTests}
							newCovidTest={newCovidTest}
							setNewCovidTest={setNewCovidTest}
							initialCovidTest={initialCovidTest}
						/>
					);
				})}
			</CardContainer>
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

const CardContainer = styled.div`
	max-width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-auto-rows: 110px;
	z-index: 1;
`;
