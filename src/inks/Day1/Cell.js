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
	transition: all .2s;
`;

const EmojiContainer = styled.div`
	opacity: ${props => props.visible ? '1' : '0'};
`;

const Cell = ({ content, x, y }) => {

	const [visible, setVisible] = useState(false);

	const rowMiddle = 80 / 2;
	const colMiddle = 48 / 2;

	useEffect(() => {
		setInterval(() => {
			setVisible(true);
		}, (((Math.abs((x - rowMiddle)) + Math.abs((y - colMiddle))) * 5 + (Math.random() * 50 + 1)) * -1) + 500);
	}, [x, y, rowMiddle, colMiddle]);

	return (
		<StyledCell visible={visible}>
			{console.log('rendering cell')}
			<EmojiContainer visible={visible}>
				<Emoji emoji={content} />
			</EmojiContainer>
		</StyledCell>
	);
}

export default Cell;