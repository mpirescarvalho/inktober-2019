import React from 'react';
import styled from 'styled-components';

import Emoji from '../Emoji';

const StyledFooter = styled.div`
	text-align: center;
	padding: 15px;
`;

const Footer = () => (
	<StyledFooter>
		By Marcelo Carvalho <Emoji emoji="🙋‍♂" /> 
	</StyledFooter>
);

export default Footer;