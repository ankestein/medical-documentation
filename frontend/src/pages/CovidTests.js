import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components/macro';
import {useHistory} from 'react-router-dom';

export default function CovidTests({fabPosition}) {
	const history = useHistory();

	const handleClickAddCovidTest = () => {
		history.push('/new-covid-test');
	};

	return (
		<PageLayout>
			<StyledH1>COVID19 Tests</StyledH1>

			<AddIcon
				style={{
					cursor: 'pointer',
					borderRadius: '50%',
					width: 40,
					height: 40,
					background: '#a1c181ff',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					boxShadow:
						'0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
				}}
				sx={fabPosition}
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
