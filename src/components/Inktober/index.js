import React, { useState } from 'react';
import styled from 'styled-components';

import InkDay1, { InkDay1Desc } from '../../inks/Day1';
import InkDay2, { InkDay2Desc } from '../../inks/Day2';

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

	const [day] = useState(2);

	return (
		<>
			<InkBorder>
				<InkContainer>
					{day === 1 && <InkDay1 />}
					{day === 2 && <InkDay2 />}
				</InkContainer>
			</InkBorder>
			<InkDescription><strong>Day 2: </strong>
				{day === 1 && <InkDay1Desc />}
				{day === 2 && <InkDay2Desc />}
			</InkDescription>
		</>
	);
}

export default Inktober;