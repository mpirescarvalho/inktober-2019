import React, { useState } from 'react';
import styled from 'styled-components';

import InkDay1, { InkDay1Desc } from '../../inks/Day1';
import InkDay2, { InkDay2Desc } from '../../inks/Day2';
import InkDay3, { InkDay3Desc } from '../../inks/Day3';

import Emoji from '../Emoji';

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

const PaginationContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 0 100px;
`;

const Button = styled.button`
	font-size: 20px;
	background-color: #00000000;
	padding: 2px 5px;
	border: none;
	cursor: ${props => props.invalid ? 'auto' : 'pointer'};
`;

const Inktober = () => {
	
	const maxDay = 3;
	const [day, setDay] = useState(3);
	
	const handleNext = () => {
		if (day < maxDay) setDay((day) => day + 1);
	}

	const handlePrior = () => {
		if (day > 1) setDay((day) => day - 1);
	}

	return (
		<>
			<InkBorder>
				<InkContainer>
					{day === 1 && <InkDay1 />}
					{day === 2 && <InkDay2 />}
					{day === 3 && <InkDay3 />}
				</InkContainer>
			</InkBorder>
			<PaginationContainer>
				<Button invalid={day === 1} onClick={() => handlePrior()}>
					{ day !== 1 && <Emoji emoji='👈'/> }
				</Button> 
				<InkDescription><strong>Day {day}: </strong>
					{day === 1 && <InkDay1Desc />}
					{day === 2 && <InkDay2Desc />}
					{day === 3 && <InkDay3Desc />}
				</InkDescription>
				<Button invalid={day === maxDay} onClick={() => handleNext()}>
					{ day !== maxDay && <Emoji emoji='👉'/> }
				</Button> 
			</PaginationContainer>
		</>
	);
}

export default Inktober;