import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Emoji from '../../components/Emoji';
import Center from '../../components/Center';

const Grid = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	top: 0;
	left: 0;
  display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: column;
	background-color: ${props => props.theme.Jet};
	cursor: grab;
`;

const Row = styled.div`
	background-color: red;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: row;
`;

const StyledWall = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 18px;
	width: 100%;
	height: 100%;
	background-color: ${props => props.theme.Jet};
	${props => props.clear && 'background-color: ' + props.theme.Isabelline};
`;

const Wall = (props) => (
	<StyledWall onMouseOver={() => {
		if (!props.clear) {
			props.onLose();	
		}
	}} {...props}>
		{props.content}
	</StyledWall>
);

const StyledContainer = styled.div`
	padding: 190px 0 140px 0;
	text-align: center;
`;

const Button = styled.button`
	border: none;
	background-color: ${props => props.theme.Sunglow};
	color: ${props => props.theme.Jet};
	font-weight: 900;
	padding: 1.15rem 2rem;
	text-decoration: none;
	transition: all .5s;

	&:hover{
		background-color: ${props => props.theme.SunglowDarker};
	}

`;

const ContainerLose = styled.div`
	width: 100%;
	height: 100%;
	cursor:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' transform='rotate(75)' width='61' height='73' viewport='0 0 100 100' style='fill:black;font-size:37px;'><text y='50%'>🍸</text></svg>") 16 0,auto;
`;

const CenterHightlight = styled.div`
	position: absolute;
	z-index: 2;
	color: ${props => props.theme.SunglowDarker};
	font-size: 21px;
	text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
	cursor: grab;
`;

const StyledMouseEmoji = styled.div`
  position: ${props => props.x && props.y ? 'fixed' : 'block' };
	left: ${props => props.x && props.y ? props.x : 472 }px;
	top: ${props => props.x && props.y ? props.y : 540 }px; 
	margin-left: -10px;
	margin-top: -20px;
	width: 20px;
	height: 40px;
	background-color: black;
	z-index: 5;
	cursor: grab;
`;

const MouseEmoji = ({ onGrab }) => {

	const [mousePosition, setMousePosition] = useState({});

	const handleMouseMove = (e) => {
		setMousePosition({ x: e.pageX, y: e.pageY })
	}

	const handleMouseEnter = (e) => {
		setMousePosition({ x: e.pageX, y: e.pageY })
		onGrab();
	}

	console.log('rendering at', mousePosition.x, mousePosition.y);

	return (
		<StyledMouseEmoji 
			onMouseEnter={handleMouseEnter}
			onMouseMove={handleMouseMove}
			{...mousePosition}>
		</StyledMouseEmoji>
	);
}

const InkDay2 = () => {

	const [status, setStatus] = useState({ started: false, lose: false, validate: false });

	const startGame = () => {
		setStatus({ started: true })
	}

	const validateGame = () => {
		setStatus({ started: true, validate: true });
	}

	useEffect(() => {
		console.log(status);
		if (status.lose) {
			setTimeout(() => {
				setStatus({})
			}, 4000);
		}
	}, [status]);

	const handleLose = () => {
		if (status.started && status.validate) {
			setStatus({ lose: true });
		}
	}

	if (status.lose) {
		return (
			<ContainerLose>
				<StyledContainer>
					<h1>How dare you <Emoji emoji='😰😠' /></h1>
				</StyledContainer>
			</ContainerLose>
		);
	}

	if (!status.started) {
		return (
			<div>
				<StyledContainer>
					<h1>Be careful <Emoji emoji='😱🍹' /></h1>
				</StyledContainer>
				<Center>
					<Button onClick={() => startGame()}>START!</Button>
				</Center>
			</div>
		);
	}

	return (
		<Center>

			{!status.validate &&
				<CenterHightlight>
					<h1>Grab the wine to start!</h1>
				</CenterHightlight>}

				{/* <MouseEmoji onGrab={() => validateGame()}/> */}

			<Grid {...status} >
				<Row>
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
				</Row>
				<Row>
					<Wall clear />
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall clear />
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall clear />
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
				</Row>
				<Row>
					<Wall clear />
					<Wall onLose={() => handleLose()}/>
					<Wall clear />
					<Wall onLose={() => handleLose()}/>
					<Wall clear />
					<Wall onLose={() => handleLose()}/>
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall onLose={() => handleLose()}/>
					<Wall clear />
					<Wall clear />
					<Wall clear />
				</Row>
				<Row>
					<Wall clear />
					<Wall onLose={() => handleLose()}/>
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall clear />
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall clear />
				</Row>
				<Row>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall onLose={() => handleLose()}/>
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall onLose={() => handleLose()}/>
					<Wall clear />
				</Row>
				<Row>
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall clear />
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall clear />
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall clear />
				</Row>
				<Row>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall onLose={() => handleLose()}/>
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
				</Row>
				<Row>
					<Wall onLose={() => handleLose()}/>
					<Wall clear />
					<Wall clear />
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall clear />
				</Row>
				<Row>
					<Wall clear content={<Emoji emoji='😛' />} />
					<Wall clear />
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
					<Wall clear />
				</Row>
				<Row>
					<Wall onLose={() => handleLose()}/>
					<Wall clear />
					<Wall clear />
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					{/* <Wall ForwardRef='WallStart' clear content={<Emoji emoji={!status.validate ? '🍹' : '⬆️'} />} /> */}
					<Wall clear content={<MouseEmoji onGrab={() => validateGame()}/>} />
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
					<Wall onLose={() => handleLose()}/>
				</Row>
			</Grid>
		</Center>
	);
};

export default InkDay2;

const InkDay2Desc = () => <span>Mindless? Not with a drink <Emoji emoji="🤠" /></span>

export { InkDay2Desc };