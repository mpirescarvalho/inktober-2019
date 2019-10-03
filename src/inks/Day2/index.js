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
	border: 1px solid red;
	background-color: ${props => props.hover ? 'red' : props.theme.Jet};
	${props => props.clear && 'background-color: ' + props.theme.Isabelline};
`;

const Wall = ({ hover, clear, onLose, content }) => (
	<StyledWall 
		clear={clear}
		hover={hover}
		onMouseMoveCapture={(e) => {
			
			if (!clear) {
				onLose();	
			}

			// width: 34px;
			// height: 40px;

			console.log('x', e.pageX - e.currentTarget.parentElement.parentElement.offsetLeft - e.currentTarget.offsetLeft);
			console.log('y', e.pageY - e.currentTarget.parentElement.parentElement.offsetTop - e.currentTarget.offsetTop);

		}} >
		{content}
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

const ContainerWin = styled(ContainerLose)`
	cursor:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='61' height='73' viewport='0 0 100 100' style='fill:black;font-size:37px;'><text y='50%'>🤪</text></svg>") 16 0,auto;
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
	margin-left: ${props => props.x && props.y ? -17 : 0 }px;
	margin-top: ${props => props.x && props.y ? -20 : 0 }px;
	width: 34px;
	height: 40px;
	font-size: 32px;
	border: 1px solid black;
	z-index: 5;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: grab;
`;

class MouseEmoji extends React.Component {

	constructor ({ onGrab }) {
		super();
		this.onGrab = onGrab;
		this.state = {};
	}

	handleMouseMove = (e) => {
		this.setState({ x: e.pageX, y: e.pageY })
	}

	handleMouseEnter = (e) => {
		this.setState({ x: e.pageX, y: e.pageY })
		this.onGrab();
	}

	render() {
		console.log('rendering at', this.state.x, this.state.y);
		return (
			<StyledMouseEmoji 
				onMouseEnter={this.handleMouseEnter}
				onMouseMove={this.handleMouseMove}
				{...this.state}>
				<div style={{marginTop: '-6px'}}>
					<Emoji emoji='🍹' />
				</div>
				<div style={{zIndex: '-1', fontSize: '0.9em', marginLeft: '-40px', marginTop: '28px'}}>
					<Emoji emoji='➖' />
				</div>
			</StyledMouseEmoji>
		);
	}
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
		if (status.lose || status.win) {
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

	const handleWin = () => {
		if (status.started && status.validate) {
			setStatus({ win: true });
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

	if (status.win) {
		return (
			<ContainerWin>
				<StyledContainer>
					<h1>Thank you <Emoji emoji='😋' /></h1>
				</StyledContainer>
			</ContainerWin>
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
					<h1>Grab the drink to start!</h1>
				</CenterHightlight>}

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
					<Wall onMouseEnter={() => handleWin()} clear content={<Emoji emoji='😛' />} />
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
					<Wall clear content={
						<>
							<MouseEmoji onGrab={() => validateGame()}/>
							{status.validate && <Emoji emoji='⬆️' />}
						</>
					} />
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