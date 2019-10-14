import React, { useState } from 'react';
import styled from 'styled-components';

import Palette from './Palette';
import Emoji from '../../components/Emoji';
import emojiMap from './emojiColorMap';

const Container = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	user-select: none;
`;

const Quadro = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: column;
`;

const Row = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: row;
`;

const Pixel = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	border-left: 1px solid
		${props => (props.clear ? '#eee' : `rgb(${props.color[0]},${props.color[1]},${props.color[2]})`)};
	border-bottom: 1px solid
		${props => (props.clear ? '#eee' : `rgb(${props.color[0]},${props.color[1]},${props.color[2]})`)};
	background-color: ${props => `rgb(${props.color[0]},${props.color[1]},${props.color[2]})`};
	cursor: pointer;
`;

const initialMap = [...new Array(16)].map(() => [...new Array(22)].map(() => ({ emoji: '', color: [] })));

const InkDay5 = () => {
	const [index, setIndex] = useState(0);
	const [map, setMap] = useState(initialMap);
	const [palette] = useState(getPalette());
	const [mouseClicked, setMouseClicked] = useState(false);
	const handlePickItem = i => setIndex(i);
	const handleMouseMove = (y, x) => mouseClicked && handlePaint(y, x);
	const handlePaint = (rowIndex, columnIndex) =>
		setMap(oldMap => {
			return oldMap.map((row, y) =>
				row.map((pixel, x) => {
					if (y === rowIndex && x === columnIndex) {
						return palette[index];
					} else {
						return pixel;
					}
				}),
			);
		});
	return (
		<Container>
			<Quadro onMouseDownCapture={() => setMouseClicked(true)} onMouseUpCapture={() => setMouseClicked(false)}>
				{map.map((row, y) => (
					<Row key={`row-${y}`}>
						{row.map((emoji, x) => (
							<Pixel
								key={`pixel-${x}`}
								onClick={() => handlePaint(y, x)}
								onMouseMove={() => handleMouseMove(y, x)}
								clear={emoji.emoji === ''}
								color={emoji.color}
							>
								{emoji.emoji}
							</Pixel>
						))}
					</Row>
				))}
			</Quadro>
			<Palette onPickItem={handlePickItem} selectedIndex={index} items={palette} />
		</Container>
	);
};

const InkDay5Desc = () => (
	<span>
		Let's build something cool! <Emoji emoji="⛏️" />
	</span>
);

const getPalette = () => {
	const paletteLength = 10;
	let palette = [];
	while (palette.length < paletteLength) {
		const i = Math.floor(Math.random() * emojiMap.length);
		const item = emojiMap[i];
		if (palette.indexOf(item) === -1) palette.push(item);
	}
	return palette;
};

export default InkDay5;

export { InkDay5Desc };
