import React from 'react';
import styled from 'styled-components';

import Emoji from '../Emoji';
import InkDay1 from '../../inks/Day1';

const InkBorder = styled.div`
	background-color: ${props => props.theme.Jet};
	box-shadow: 3px 3px 10px 5px #bbb;
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const InkContainer = styled.div`
	height: 95%;
	width: 97%;
	background-color: #fff;
`;

const InkDescription = styled.div`
	text-align: center;
	padding: 20px;
`;

const Inktober = () => {


	return (
		<>
			<InkBorder>
				<InkContainer>
					<InkDay1 />
				</InkContainer>
			</InkBorder>
			<InkDescription><strong>Day 1:</strong> that cost me 400g <Emoji emoji="💰" /> </InkDescription>
		</>
	);
}

export default Inktober;