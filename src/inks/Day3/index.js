import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Emoji from '../../components/Emoji';

import imgMapa from '../../img/mapa-lol.png';

import Minion from './Minion';

const Container = styled.div`
	width: 100%;
	height: 100%;
	background-image: url(${imgMapa});
	background-size: cover;
`;

const InkDay3 = () => {

	return (
		<Container>
			<Minion></Minion>
		</Container>
	);

}

const InkDay3Desc = () => <span>Free farm... <Emoji emoji="💰🙃" /></span>

export default InkDay3;

export { InkDay3Desc };