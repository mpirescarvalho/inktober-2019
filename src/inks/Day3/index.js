import React from 'react';
import styled from 'styled-components';

import Emoji from '../../components/Emoji';

import imgMapa from '../../img/mapa-lol.png';
import imgCursor from '../../img/cursor.png';

import Minion from './Minion';

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Container = styled.div`
	width: 100%;
	height: 100%;
	background-image: url(${imgMapa});
	background-size: cover;
	position: relative;
	cursor: url(${imgCursor}), auto;
`;

const getMinionsInitialPosition = (quantidade) => {
	let minions = [];
	for (let i = 0; i < quantidade; i++) {
		const randomX = getRandomIntInclusive(0, 750);
		const randomY = getRandomIntInclusive(0, 450);
		minions.push({ x: randomX, y: randomY });
	}
	return minions;
}

const InkDay3 = () => {

	const quantidade = getRandomIntInclusive(8, 12);
	const minions = getMinionsInitialPosition(quantidade);

	return (
		<Container>
			{minions.map((minion, index) => <Minion key={index} x={minion.x} y={minion.y} />)}
		</Container>
	);

}

const InkDay3Desc = () => <span>Free farm... <Emoji emoji="💰🙃" /></span>

export default InkDay3;

export { InkDay3Desc };