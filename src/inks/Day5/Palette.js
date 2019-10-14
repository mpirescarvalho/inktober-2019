import React from 'react';
import styled from 'styled-components';
import Slider from 'react-input-slider';

import Draggable from 'react-draggable';

const StyledPalette = styled.div`
	display: block;
	width: 300px;
	position: absolute;
	bottom: 30px;
	left: 50%;
	margin-left: -150px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const PaletteItem = styled.div`
	width: 30px;
	height: 30px;
	line-height: 30px;
	text-align: center;
	cursor: pointer;
	background-color: ${props => `rgb(${props.color[0]},${props.color[1]},${props.color[2]})`};
`;

const SelectedMarker = styled.div`
	left: ${props => props.index * 30}px;
	width: 30px;
	height: 30px;
	position: absolute;
	border: 2px solid ${props => `rgb(${props.color[0]},${props.color[1]},${props.color[2]})`};
	transition: all 0.3s ease-in-out;
`;

const Palette = ({ items, onPickItem, selectedIndex, pixels, pixelsChange }) => (
	<Draggable>
		<StyledPalette>
			<SelectedMarker
				color={getInvertedColor(items[selectedIndex].color)}
				index={selectedIndex}
				max={items.length}
			/>
			{items.map((item, i) => (
				<PaletteItem key={i} onClick={() => onPickItem(i)} color={item.color}>
					{item.emoji}
				</PaletteItem>
			))}
			<Slider
				style={{ width: '300px', position: 'absolute', bottom: '-20px' }}
				xmin={1}
				xstep={1}
				xmax={10}
				axis="x"
				x={pixels}
				onChange={({ x }) => pixelsChange(x)}
			/>
		</StyledPalette>
	</Draggable>
);

const getInvertedColor = color => {
	return [255 - color[0], 255 - color[1], 255 - color[2]];
};

export default Palette;
