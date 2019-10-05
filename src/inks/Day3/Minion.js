import React, { useState, useEffect } from 'react';

import imgMinion from '../../img/minion-life.png';

const Minion = ({ x, y }) => {

	const MINION_WIDTH = 75;
	const MINION_HEIGHT = 55;
	const END_X = 780;
	const END_Y = 480;

	const [pos, setPos] = useState({});

	useEffect(() => {
		var validX = x;
		var validY = y;
		while ((validX + MINION_WIDTH) >= END_X) validX--;
		while ((validY + MINION_HEIGHT) >= END_Y) validY--;
		setPos({ x: validX, y: validY });
	}, [x, y]);

	const handleMouseMove = (e) => {
		const mouseX = e.nativeEvent.offsetX;
		const mouseY = e.nativeEvent.offsetY;
		const middleX = MINION_WIDTH / 2;
		const middleY = MINION_HEIGHT / 2;
		const parametroMeioX = (MINION_WIDTH / 3) / 2;
		const parametroMeioY = (MINION_HEIGHT / 3) / 2;
		const pertoDoMeioX = (mouseX > (middleX - parametroMeioX)) && (mouseX < (middleX + parametroMeioX));
		const pertoDoMeioY = (mouseY > (middleY - parametroMeioY)) && (mouseY < (middleY + parametroMeioY));
		var incX = pertoDoMeioX ? 0 : mouseX > middleX ? -5 : 5;
		var incY = pertoDoMeioY ? 0 : mouseY > middleY ? -5 : 5;
		setPos((pos) => {

			let newX = pos.x + incX;
			const podeIrX = (newX > 0) && (newX + MINION_WIDTH < END_X);
			if (!podeIrX) incX = -incX * 9;

			let newY = pos.y + incY;
			const podeIrY = (newY > 0) && (newY + MINION_HEIGHT < END_Y);
			if (!podeIrY) incY = -incY * 8;

			return ({ x: (pos.x + incX), y: (pos.y + incY) });
		});
	}

	return (
		<img onClick={() => console.log(pos.x, pos.y)} onMouseMove={handleMouseMove} alt="minion" style={{ userSelect: 'none', position: 'absolute', left: pos.x, top: pos.y }} src={imgMinion}></img>
	);
}

export default Minion;