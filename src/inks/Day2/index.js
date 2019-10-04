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
		cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='30' height='40'><text style='font-size:26px;' x='-3' y='35'>🧫</text><text style='font-size:29px;' x='-4' y='27'>🍹</text></svg>")
			15 20,
		auto;
	${props => !props.validate && 'cursor: grab'};
`;

const Row = styled.div`
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
	${props => props.clear && 'background-color: ' + props.theme.Isabelline};
`;

const Wall = ({ hover, clear, onLose, content, ...other }) => (
	<StyledWall
		{...other}
		clear={clear}
		hover={hover}
		onMouseMoveCapture={e => {
			
			//TODO: Melhorar
			//Sem collision em span
			if (e.target.nodeName === 'SPAN') return;

			const { map, y, x } = other;
			const wall = (y, x) => !map[y] || !map[y][x] || map[y][x].cell === 1;
			const wallTop = wall(y - 1, x);
			const wallLeft = wall(y, x - 1);
			const wallTopLeft = wall(y - 1, x - 1);
			const wallBottom = wall(y + 1, x);
			const wallLeftBottom = wall(y + 1, x - 1);
			const wallRight = wall(y, x + 1);
			const wallBottomRight = wall(y + 1, x + 1);
			const wallRightTop = wall(y - 1, x + 1);
			
			var collision = false;

			const xStart = 0;
			const yStart = 0;
			const xEnd = e.target.offsetWidth + 1;
			const yEnd = e.target.offsetHeight;

			const overlayTop = e.nativeEvent.offsetY - 20 <= yStart;
			const overlayLeft = e.nativeEvent.offsetX - 15 <= xStart;
			const overlayBottom = e.nativeEvent.offsetY + 20 >= yEnd;
			const overlayRight = e.nativeEvent.offsetX + 15 >= xEnd;
			const overlayRightBottom = 
				(e.nativeEvent.offsetX + 15 >= xEnd + 2) &&
				(e.nativeEvent.offsetY + 20 >= yEnd + 2);
			const overlayLeftBottom = 
				(e.nativeEvent.offsetX - 15 <= xStart - 2) &&
				(e.nativeEvent.offsetY + 20 >= yEnd + 2);

			//15, 20 => bounds

			if (collision) return console.warn('colision bottom');
			if (collision) return console.warn('colision left');
			if (collision) return console.warn('colision top');
			if (collision) return console.warn('colision right');

			collision = !clear;
			
			collision = collision || (wallTop && overlayTop);
			collision = collision || (wallTopLeft && overlayTop && overlayLeft);
			collision = collision || (wallRightTop && overlayTop && overlayRight);
			collision = collision || (wallLeft && overlayLeft);
			collision = collision || (wallLeftBottom && overlayLeftBottom);
			collision = collision || (wallBottom && overlayBottom);
			collision = collision || (wallBottomRight && overlayRightBottom);
			collision = collision || (wallRight && overlayRight);
			
			if (collision) return onLose();

			if (collision) return console.warn('colision');

			console.log('top', `${wallTop ? 'not' : ''} clear - distancia: ${e.nativeEvent.offsetY - 20}`);
			console.log('atual', `${wall(y, x) ? 'not' : ''} clear`);
			console.log('bottom', `${wallBottom ? 'not' : ''} clear - distancia: ${e.nativeEvent.offsetY + 20 - yEnd}`);
			console.log('left', `${wallLeft ? 'not' : ''} clear - distancia: ${e.nativeEvent.offsetX - 15}`);
			console.log('right', `${wallRight ? 'not' : ''} clear - distancia: ${e.nativeEvent.offsetX + 15 - xEnd}`);
			console.log('x', e.nativeEvent.offsetX);
			console.log('y', e.nativeEvent.offsetY);
			console.log('=====');
		}}
	>
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
	transition: all 0.5s;

	&:hover {
		background-color: ${props => props.theme.SunglowDarker};
	}
`;

const ContainerLose = styled.div`
	width: 100%;
	height: 100%;
	cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' transform='rotate(75)' width='61' height='73' viewport='0 0 100 100' style='fill:black;font-size:37px;'><text y='50%'>🍸</text></svg>")
			16 0,
		auto;
`;

const ContainerWin = styled(ContainerLose)`
	cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='61' height='73' viewport='0 0 100 100' style='fill:black;font-size:37px;'><text y='50%'>🤪</text></svg>")
			16 0,
		auto;
`;

const CenterHightlight = styled.div`
	position: absolute;
	z-index: 2;
	color: ${props => props.theme.SunglowDarker};
	font-size: 21px;
	text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
	cursor: grab;
	pointer-events: none;
`;

const initialMap = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
	[0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
	[0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
	[1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
	[0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0],
	[1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
	[1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[{ cell: 0, end: true, content: () => <Emoji emoji="😛" /> }, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[
		1,
		0,
		0,
		1,
		1,
		1,
		1,
		1,
		{ cell: 0, start: true, content: estado => <Emoji emoji={estado.validate ? '⬆️' : '🍹'} /> },
		1,
		1,
		1,
		1,
		1,
		1,
		1,
	],
];

const mapState = initialMap.map(row =>
	row.map(cell => {
		if (typeof cell === 'object') return cell;
		return { cell: cell };
	}),
);

const InkDay2 = () => {
	const [status, setStatus] = useState({ started: false, lose: false, validate: false, map: mapState });

	const startGame = () => {
		setStatus(status => ({ started: true, map: status.map }));
	};

	const validateGame = e => {
		if (!status.validate && e.target.nodeName === 'SPAN') {
			setStatus(status => ({ started: true, validate: true, map: status.map }));
		}
	};

	useEffect(() => {
		console.log(status);
		if (status.lose || status.win) {
			setTimeout(() => {
				setStatus(status => ({ map: status.map }));
			}, 4000);
		}
	}, [status]);

	const handleLose = () => {
		if (status.started && status.validate) {
			setStatus(status => ({ lose: true, map: status.map }));
		}
	};

	const handleWin = e => {
		if (status.started && status.validate && e.target.nodeName === 'SPAN') {
			setStatus(status => ({ win: true, map: status.map }));
		}
	};

	if (status.lose) {
		return (
			<ContainerLose>
				<StyledContainer>
					<h1>
						How dare you <Emoji emoji="😰😠" />
					</h1>
				</StyledContainer>
			</ContainerLose>
		);
	}

	if (status.win) {
		return (
			<ContainerWin>
				<StyledContainer>
					<h1>
						Thank you <Emoji emoji="😋" />
					</h1>
				</StyledContainer>
			</ContainerWin>
		);
	}

	if (!status.started) {
		return (
			<div>
				<StyledContainer>
					<h1>
						Be careful <Emoji emoji="😱🍹" />
					</h1>
				</StyledContainer>
				<Center>
					<Button onClick={() => startGame()}>START!</Button>
				</Center>
			</div>
		);
	}

	return (
		<Center onContextMenu={(e) => e.preventDefault()}>
			{!status.validate && (
				<CenterHightlight>
					<h1>Grab the drink to start!</h1>
				</CenterHightlight>
			)}

			<Grid {...status}>
				{status.map &&
					status.map.map((row, y) => (
						<Row key={y}>
							{row.map((cell, x) => {
								const wall = cell.cell === 1;
								const content = cell.content ? cell.content(status) : undefined;
								const onMouseMove = cell.start
									? e => validateGame(e)
									: cell.end
									? e => handleWin(e)
									: undefined;
								return (
									<Wall
										x={x}
										y={y}
										map={status.map}
										setStatus={status => setStatus(status)}
										onMouseMove={onMouseMove}
										onLose={handleLose}
										{...cell}
										content={content}
										key={x}
										clear={!wall}
									/>
								);
							})}
						</Row>
					))}
			</Grid>
		</Center>
	);
};

export default InkDay2;

const InkDay2Desc = () => (
	<span>
		Mindless? Not with a drink <Emoji emoji="🤠" />
	</span>
);

export { InkDay2Desc };
