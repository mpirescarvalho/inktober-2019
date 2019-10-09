import React, { useState } from 'react';
import styled from 'styled-components';
import Particles from 'react-particles-js';
import Slider from 'react-input-slider';

import Emoji from '../../components/Emoji';

const ContainerEmoji = styled.div`
	width: 100%;
	height: 100%;
	text-align: center;
	margin-top: 20px;
	font-size: 6em;
`;

const Container = styled.div`
	background-color: ${props => props.theme.SunglowDarker};
	width: 100%;
	height: 100%;
	position: relative;
	overflow-x: hidden;
	overflow-y: hidden;
`;

const ContainerParticles = styled.div`
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	position: absolute;
`;

const InkDay4 = () => {
	const [forca, setForca] = useState(5);

	const particlesParams = {
		particles: {
			number: {
				value: forca * 100,
				density: {
					enable: true,
					value_area: 800,
				},
			},
			color: {
				value: '#fff',
			},
			shape: {
				type: 'circle',
			},
			opacity: {
				value: forca * 0.2,
				random: true,
				anim: {
					enable: false,
					speed: 1,
					opacity_min: 0.1,
					sync: false,
				},
			},
			size: {
				value: 10,
				random: true,
				anim: {
					enable: false,
					speed: 40,
					size_min: 0.1,
					sync: false,
				},
			},
			line_linked: {
				enable: false,
				distance: 500,
				color: '#ffffff',
				opacity: 0.4,
				width: 2,
			},
			move: {
				enable: true,
				speed: forca * 2.1,
				direction: 'bottom',
				random: false,
				straight: false,
				out_mode: 'out',
				bounce: false,
				attract: {
					enable: false,
					rotateX: 600,
					rotateY: 1200,
				},
			},
		},
		retina_detect: true,
	};

	return (
		<Container>
			<ContainerEmoji>
				{forca < 2 && <Emoji emoji="😎" />}
				{(forca >= 2) && (forca < 3) && <Emoji emoji="🙄" />}
				{(forca >= 3) && (forca < 5) && <Emoji emoji="🤒" />}
				{(forca >= 5) && (forca < 7) && <Emoji emoji="🤧" />}
				{(forca >= 7) && (forca < 10) && <Emoji emoji="🥶" />}
				{forca === 10 && <Emoji emoji="💀" />}
				<br />
				<Emoji emoji="💪" /><Emoji emoji="👕" /><Emoji emoji="🤳" /><br />
				<Emoji style={{ display: 'inline-block' }} emoji="🦵" /><div style={{ display: 'inline-block', transform: 'scaleX(-1)' }}><Emoji emoji="🦵" /></div>

			</ContainerEmoji>
			<ContainerParticles>
				<Particles params={particlesParams} />
			</ContainerParticles>
			<Slider style={{ width: '600px', left: '50%', marginLeft: '-300px', position: 'absolute', bottom: '20px' }} xmin={10} xstep={1} xmax={100} axis="x" x={forca * 10} onChange={({ x }) => setForca(x / 10)} />
		</Container>
	);
};

const InkDay4Desc = () => (
	<span>
		Do you like cold weather? <Emoji emoji="🥶" />
	</span>
);

export default InkDay4;

export { InkDay4Desc };
