import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components/macro';
import {useHistory} from 'react-router-dom';
import {customStyle} from '../styling/styles';

export default function CovidTests() {
	const history = useHistory();

	const handleClickAddCovidTest = () => {
		history.push('/new-covid-test');
	};

	return (
		<PageLayout>
			<StyledH1>COVID19 Tests</StyledH1>

			<AddIcon
				style={customStyle.addIconStyle}
				sx={customStyle.fabPosition}
				onClick={handleClickAddCovidTest}
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
