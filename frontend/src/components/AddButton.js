import AddIcon from '@mui/icons-material/Add';
import styled from 'styled-components/macro';

export default function AddButton({onClick}) {
	return (
		<Circle>
			<AddIcon onClick={onClick} />
		</Circle>
	);
}

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
	position: fixed;
	bottom: 80px;
	right: 20px;
	z-index: 10;
`;
