import styled from 'styled-components/macro';

export default function Homepage() {
	return (
		<PageLayout>
			<StyledH1>Home</StyledH1>
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
