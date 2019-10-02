import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Emoji from '../../components/Emoji';

const StyledCell = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
  font-size: 7px;
	background-color: none;
	width: 100%;
	height: 100%;
	z-index: 2;
	transform: scale(1.2);
	background-color: ${props => props.visible ? 'none' : '#fff'};
`;

const Cell = ({ content }) => {

	const [visible, setVisible] = useState(false);

	useEffect(() => {
		setInterval(() => {
			setVisible(true);
		}, Math.random() * (20 - 1) + 1);
	});

	return (
		<StyledCell visible={visible}>
			{console.log('rendering cell')}
			{visible && <Emoji emoji={content} />}
		</StyledCell>
	);
}

export default Cell;