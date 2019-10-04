import React from 'react';
import styled from 'styled-components';

import InkDay1, { InkDay1Desc } from '../../inks/Day1';
import InkDay2, { InkDay2Desc } from '../../inks/Day2';
import InkDay3, { InkDay3Desc } from '../../inks/Day3';

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

const Inktober = ({day}) => {
	return (
		<>
			<InkBorder>
				<InkContainer>
					{day === 1 && <InkDay1 />}
					{day === 2 && <InkDay2 />}
					{day === 3 && <InkDay3 />}
				</InkContainer>
			</InkBorder>
			<InkDescription><strong>Day {day}: </strong>
				{day === 1 && <InkDay1Desc />}
				{day === 2 && <InkDay2Desc />}
				{day === 3 && <InkDay3Desc />}
			</InkDescription>
		</>
	);
}

export default Inktober;