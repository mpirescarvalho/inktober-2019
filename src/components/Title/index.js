import React from 'react';
import styled from 'styled-components';

import Emoji from '../Emoji';

const StyledTitle = styled.div`
	padding: 30px 0;
	text-align: center;
  font-family: ${props => props.theme.titleFont};
`;

const Title = () => (
	<StyledTitle>
		<h1> #Inctober <Emoji emoji="🎨" /> </h1>
	</StyledTitle>
);

export default Title;