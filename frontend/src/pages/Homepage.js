import {Typography} from '@mui/material';
import styled from 'styled-components/macro';

export default function Homepage() {
	return (
		<PageLayout>
			<Typography variant='h1'>Home</Typography>
		</PageLayout>
	);
}

const PageLayout = styled.div`
	margin-bottom: 60px;
`;
