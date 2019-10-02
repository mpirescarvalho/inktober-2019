import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Emoji from '../../components/Emoji';

import dorians from '../../img/dorians-pixel.png';

const Container = styled.div`
	width: 100%;
	height: 100%;
	padding: 20px;
`;

const Background = styled.div`
	width: 100%;
	height: 100%;
	/* top: 0;
	left: 0; */
	position: absolute;
	background-image: url(${dorians});
	background-size: cover;
	filter: blur(1px);
`;

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
`;

const Row = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: row;
	/* background-color: red; */
`;

const Cell = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
  font-size: 7px;
	background-color: none;
	width: 100%;
	height: 100%;
	z-index: 2;
	background-color: ${props => props.visible ? 'none' : '#fff'}

	div {
		z-index: -1;
		position: absolute;
		filter: blur(3px);
		transform: scale(1.5);
	}

`;

const raw =
	'💲 💲 💲 💲 🎶 🎶 ☁ ☁ ☁ ☁ ☁ ☁ 🎶 ☁ 🎶 🎶 💲 💲 💲 💲 💤 💤 💤 🌀 🌀 💤 💤 🔹 🌀 🌀 🔵 🔵 🔵 🌀 🌀 💤 🔹 💤 🌀 🔵 🌀 🌀 🌀 💤 💤 💤 🌀 🔵 🔵 🔵 🔵 🌀 💤 💤 💤 💤 🔹 🌀 🌀 💤 💲 🎶 ☁ ☁ ☁ ☁ 🎶 🎶 🎶 💲 💲 💲 💲 💲 💲 💲 🎶 🎶 🎶 ☁-' +
	'☁ ☁ ☁ ☁ 🎶 💲 💲 🎶 🎶 💲 💲 💲 🎶 💲 💲 💲 💲 💲 💲 💤 💤 💤 🔹 🌀 🌀 💤 💤 🌀 🌀 🌀 🔵 🔵 🔵 🔵 🌀 🌀 💤 💤 🌀 🌀 🔵 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🔵 🔵 🌀 🌀 💤 🌀 🌀 💤 💤 🌀 🌀 🔹 🔹 🔹 💤 💤 💤 💤 💤 💲 💲 🎶 🎶 🎶 🎶 💲 🎶 🎶 💲 💲 💲 💲-' +
	'☁ ☁ ☁ ☁ 🎶 💲 💲 💲 💲 ➖ 💲 💲 💲 💲 🎶 🎶 🎶 🎶 ☁ 💲 💤 💤 🔹 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🔵 🔵 🔵 🔵 🌀 🌀 🌀 🌀 🔵 🔵 🔵 🌀 🌀 🌀 🔵 🔵 🔵 🔵 🔵 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 💤 🔹 ☔ 🌀 🌀 🌀 🌀 🌀 🔹 🔹 💤 💤 💤 💤 💲 💲 🎶 💲 💲 💲 💲 💲-' +
	'💲 💲 💲 💲 💲 💲 💲 💲 💲 💲 💲 💲 💲 💲 💲 💤 💤 💤 💤 💤 💤 💤 💤 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🔵 🔵 🔵 🔵 🔵 🔷 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🌀 🌀 🌀 🔷 🔷 🌀 🌀 🌀 💤 🔹 🌀 🌀 🔷 🔷 🔷 🔷 🔷 🔷 🌀 🌀 🌀 🌀 🔹 🔹 🔹 💤 💤 💲 💲 🎶-' +
	'🎶 🎶 🎶 🎶 💲 💤 💤 💤 💤 💤 💤 💤 💤 🔹 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 💤 💤 🌀 🌀 🔵 🔵 🚾 🚾 🗾 🗾 🗾 🗾 🗾 🗾 🗾 🗾 🗾 🗾 🗾 🗾 🚾 🚾 🚹 🚹 🔵 🔵 🔵 🌀 🌀 🌀 🔵 🔵 🌀 🌀 🌀 🌀 🔷 🔷 🔷 🔷 🔷 🔷 🌀 🌀 🌀 🌀 🌀 🌀 🔹 🔹 🔹 💤 💤 💤 💤-' +
	'💲 💲 💲 💲 💤 💤 💤 💤 💤 💤 💤 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🚹 🚾 🚾 🏧 🏧 🏧 💎 💎 📫 💎 💎 📫 📫 📫 📘 🔷 📫 🔷 🔷 🏧 🚾 🚹 🚹 🌀 🌀 🌀 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔷 🔷 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀-' +
	'💤 💤 💤 💤 💤 💤 💤 💤 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🏧 📫 ⬜ ⬜ ⬜ ⬜ 🌁 ⬜ 🌁 🌁 🌁 🌁 🗼 📃 🏢 📂 📖 🏪 💎 📫 🏧 🆖 🚾 🔵 🌀 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀-' +
	'💤 💤 💤 💤 🔹 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🚾 🔵 📫 🌁 ⬜ ⬜ 📈 🗼 ⬜ ⬜ ⬜ 📈 📈 🏭 💬 🏭 💬 🕖 🍨 🃏 👟 💨 📫 🏧 🆖 🚹 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔷 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀-' +
	'💤 💤 💤 🔹 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔷 🔵 🔵 🔵 🔵 🔵 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🚾 🚾 🏧 🌁 ⬜ ⬜ 📈 💬 📃 ⬜ ⬜ ⬜ ⬜ 📈 🌁 📈 📈 🏭 🏭 🌁 🎹 🎲 👀 🏦 💧 🏧 🗾 🚹 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔷 🔷 🔷 🔷 🔷-' +
	'💤 💤 💤 💤 🔹 🌀 🌀 🌀 🌀 🌀 🔷 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🌀 🌀 🔵 🏧 💎 🗼 ⬜ ⬜ 🎂 🃏 👟 🎥 🎥 🔫 🎥 🦇 🎓 🦇 🔚 🔛 🦇 🦇 👀 ⬜ 💬 📱 🔲 🏦 👕 🗾 🗾 🚹 🚹 🔵 🔵 🚹 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀-' +
	'💤 💤 💤 💤 💤 💤 🔹 🌀 🌀 🌀 🌀 🔷 🔵 🔵 🔵 🔵 🚹 🚹 🚹 🚹 🚹 🚹 🔵 🔵 🚹 🚾 📫 🎦 ⬜ 🌁 💸 💳 🔪 🔚 🗿 📼 🦡 🔪 🚥 🚥 🔪 🎼 🦡 🔪 🚥 🎓 🐧 💬 🔳 📱 🔩 🏦 💦 🆖 🗾 🚹 🚹 🚹 🚹 🔵 🔵 🔵 🔵 🔵 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 💤 💤 💤 💤 💤 💤 💤 💤-' +
	'🌀 🔹 🔹 🔹 🔹 💤 💤 💤 🌀 🌀 🌀 🌀 🔷 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🚹 🚹 🚾 🚾 🔷 💨 ⬜ ⬜ 🔊 🦇 🦇 🎣 🎼 🎼 🎍 🚥 🔪 🔪 🎍 🍢 🔪 🎼 🎍 📟 🐧 🌁 ⬜ 🎧 👟 🏂 📱 🎲 👤 🔷 🆖 🗾 🚾 🔵 🔵 🔵 🔵 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔹 💤 💤 💤 💤-' +
	'🌀 🌀 🌀 🌀 🔹 💤 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🚹 🚹 🗾 🗾 💦 🏢 ⬜ 🌁 🔎 🦇 🎣 🎼 🔪 🎼 🎼 🚥 🚥 🦡 🗿 🚥 🦡 🦡 🐧 🐧 🚥 🕕 ⬜ 🏭 🚽 💻 🔳 📱 🔘 👤 📘 🗾 🚾 🚹 🔵 🔵 🔵 🔵 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔹 🔹 💤 💤 💤 💤 💤-' +
	'🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🚹 🚾 🗾 🗾 🔹 📉 ⬜ ⬜ 🛀 🎓 🎣 🎼 🔪 🔪 🦡 🦡 🦡 🦡 🚥 🔪 🔪 🦡 🔎 📟 🔊 🔲 ⬜ 🏭 🔳 🔗 🎧 🎲 🎹 🔦 💺 💧 🚾 🚾 🔵 🔵 🔵 🔵 🔵 🔵 🌀 🌀 🌀 🌀 🌀 🌀 🌀 💤 💤 💤 💤 💤 💤 💤 💤-' +
	'🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🚾 🗾 🗾 👤 🌁 ⬜ 🌁 🚽 🎣 🦇 🎓 🔪 ⌚ 👤 📼 🦡 👤 👤 🔎 🗿 ⌚ 🔗 🔗 📟 🃏 ⬜ 💬 🕓 📄 🐦 📱 🎹 🔘 👟 💠 💦 🔵 🚹 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔷 🌀 🌀 🌀 🌀 🌀 🌀 🌀 💤 💤 💤 💤-' +
	'🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🚾 🗾 📫 📫 🌁 ⬜ 📈 📟 🎼 🔪 🔪 ⌚ 🔎 👾 🔦 🎐 👤 👤 💺 🎐 🔎 🔊 📟 📟 🐦 📈 🏭 🕕 🎲 🕓 🔗 🔳 🔘 🔘 📱 💧 🔷 🚾 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔹 💤 💤 💤 💤-' +
	'🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🚾 🗾 💧 🆖 🌁 ⬜ 🗼 💍 🎼 🎼 🎿 👤 👤 🔹 ☔ 💧 💦 ☔ 💧 👤 💺 👕 📟 🐦 🐦 🔳 🏭 💬 🍚 🎹 🐦 🗿 🏭 🐚 👀 📫 🌀 🚾 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 💤 💤 💤 💤-' +
	'🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🚾 🗾 📫 🎦 ⬜ ⬜ 🌁 💺 🔹 💎 🏧 🚾 🚾 🚾 🚾 🚾 🚾 🚾 🚾 🚾 🔵 ☔ 💍 🏪 🐦 🃏 🏭 🏂 🕕 🃏 📱 🔍 📃 🏭 📹 💎 🌀 🚾 🚾 🚾 🚾 🚹 🚹 🚹 🚹 🔵 🔵 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀-' +
	'🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🚾 🔷 💨 🎡 ⬜ ⬜ 🗼 💺 💧 🗾 🗾 🗾 🚹 🔵 🔵 🔵 🔵 🔵 🚹 🚾 🚾 🔷 💺 🏪 📹 📤 🏭 🏂 🎲 🎹 💬 🐦 🚓 📄 🔩 💠 📘 🔵 🚾 🚹 🚹 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀-' +
	'🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🚹 🚹 🚾 ☔ ⬜ 📃 ⬜ ⬜ 📉 💧 🗾 🗾 🚾 🔵 🔵 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🚾 🔷 💧 🏪 🏦 🎲 🎲 🎲 📈 💬 📂 🔪 📱 📱 🔲 📫 🔷 🚾 🚾 🚾 🚹 🚹 🚹 🚹 🚹 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵-' +
	'🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🚹 🚹 🚾 🚾 🚾 🎵 ⬜ 📃 ⬜ ⬜ 🏢 💧 🆖 🗾 🚹 🔵 🔵 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🚾 🔷 🎿 💺 📱 📱 🕓 ⬜ 📃 📃 ⌚ 👀 👟 🏦 🔲 👕 🔵 🚾 🚾 🚾 🚹 🚹 🔵 🔵 🔵 🔵 🔵 🔵 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀-' +
	'🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🔵 🌀 🔵 🔵 🔵 🔵 🔵 🚹 🚹 🚾 🚾 🚾 🔷 💨 ⬜ 🏭 ⬜ ⬜ 📂 👤 🗾 🗾 🚾 🔵 🔵 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🚾 🚾 📫 👤 👕 💬 ⬜ 🌁 📈 📃 🎧 💀 🍲 🔘 👟 💧 🔷 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀-' +
	'🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🔵 🌀 🌀 🔵 🔵 🔵 🔵 🚾 🚾 🚾 🚾 🚾 🌀 📶 ⬜ 💬 ⬜ ⬜ 📃 💧 🏧 🗾 🚾 🚹 🔵 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🚾 🏧 📘 🗼 ⬜ ⬜ 📈 📄 🎧 📱 📱 👀 🏦 👤 🔷 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀-' +
	'🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🔵 🌀 🔵 🔵 🔵 🔵 🚾 🚾 🚾 🚾 🔵 🌀 ⬜ ⬜ 🎲 ⬜ ⬜ 🌁 🏢 📫 🗾 🗾 🔵 🔵 🌀 🌀 🌀 🌀 🌀 💤 💤 💤 🌀 🌀 🌀 🔵 🗾 🔷 🌁 ⬜ 🌁 ⬜ 🍨 🎼 🌁 🎲 🏦 👕 🌀 🔷 🔵 🔵 🔵 🔵 🔵 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀-' +
	'🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🚾 🚾 🚾 🔵 📫 ⬜ ⬜ 👟 🎲 ⬜ ⬜ 🌁 🎡 📫 🗾 🗾 🚹 🔵 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🔵 🚹 🔷 🎡 ⬜ 🌁 🌁 🐧 🛀 🌁 👀 🏦 💧 🌀 🔷 🔷 🔵 🔵 🔷 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀-' +
	'🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🔵 🔵 🔵 🔵 🔵 🚾 🚾 🚾 🚾 🏧 📉 🔘 🔎 💀 🏠 ⬜ 🌁 📉 👔 🔵 🗾 🗾 🚾 🔵 🔵 🔷 🔷 🌀 🌀 🌀 🌀 🌀 🔵 🔵 🚾 🔷 ⬜ 🗼 ⬜ 🏭 🎍 📃 💾 💻 💎 🌀 🔷 🔷 🔷 🔷 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀-' +
	'💤 💤 💤 💤 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🔵 🔵 🔵 🚹 🚾 🚾 🚾 🚾 🔷 👕 🎲 💬 🏭 🎂 🐠 ⬜ ⬜ 📃 📉 📖 🔷 🚾 🚾 🚾 🚾 🚹 🔵 🔵 🔵 🔵 🚾 🚾 🚾 🗾 📫 📉 🚉 🎲 📚 📱 🎹 🔘 👟 ☔ 🌀 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀-' +
	'💤 💤 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🔵 🔵 🔵 🚹 🚹 🚾 🚾 🚾 🚾 💧 🏦 🏢 📃 📃 📚 🐠 ⬜ ⬜ 📃 🎡 📫 🌀 🗾 🚾 🚾 🏧 🚾 🚾 🏧 🔵 🗾 🚾 🏧 📫 ⬜ 🌁 🎣 💾 🦡 🎹 🐦 👀 🏦 🌀 🔷 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🌀 🌀 🌀 🌀 🌀 🌀 🌀-' +
	'🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🔵 🔵 🚹 🚾 🚾 🗾 🏧 🌀 🆒 📉 🌁 🌁 🐧 🚥 📈 📃 🎹 📂 🔲 🏪 💺 💺 💺 👤 👤 👤 🎣 👤 🎣 💎 📉 🏦 🦇 ⌚ 📱 📱 🎹 👟 🏦 💎 🌀 🔵 🚹 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔷 🔷 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀-' +
	'🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🔵 🔵 🔵 🚹 🚾 🗾 🗾 🏧 📘 📉 🌁 🌁 🌁 📼 🦇 🎹 🎹 🔳 🕕 🍚 🎹 📧 📧 📤 🎲 💾 🃏 👀 👀 🕓 📱 🎣 ➗ 🚥 🎲 🎹 💾 📤 📱 💺 🔷 🚹 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀-' +
	'🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🚹 🚹 🚾 🗾 🗾 💦 ⏬ ⬜ ⬜ ⬜ 🎲 🚉 🐦 📃 ⬜ ⬜ ⬜ 📈 📃 🏭 🎹 📤 🔘 👀 👀 👀 ⌚ 🎥 🎣 🎥 📟 ⬜ 🗼 🏢 🚓 🦇 🔹 🔷 🚹 🔵 🔵 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀-' +
	'🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🚹 🚾 🗾 🚾 💦 ⬜ ⬜ 📈 🏭 🕕 🦡 🔩 🏂 🎲 🚉 🚥 🚥 🎼 🎼 🎼 🎼 🚏 🔚 💱 🎣 🎥 🔚 🎧 💻 🔘 🔗 🔛 🎶 🔹 🌀 🔵 🔵 🔵 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 💤 💤 💤 💤 💤 💤 💤-' +
	'🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🚹 🚾 🗾 🌀 📖 ⬜ ⬜ ⬜ 🏭 🔩 🎼 🔪 🔪 🎼 🚥 🎍 🎍 🎓 🎓 🎼 🎐 📼 🎓 🚏 🦇 🚏 🔲 🎧 🦇 🦇 🦇 💤 ☔ 🔵 🚹 🔵 🔵 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 💤 💤 💤 💤 💤 💤 💤-' +
	'💤 💤 💤 💤 💤 💤 💤 💤 💤 💤 💤 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🚾 🚾 🗾 👤 ⬜ ⬜ ⬜ 🎲 🐧 🐧 🐧 🚥 🗿 📼 🔪 🔪 🎼 🎼 🎼 🔪 🎼 🦇 🎓 🎥 🔌 🦇 💱 🔚 🦇 🔹 🌀 🚾 🚾 🔵 🔵 🔵 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀-' +
	'💤 💤 💤 💤 💲 💤 💤 💤 💤 💤 💤 💤 💤 💤 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🔵 🚹 🚾 🗾 🗾 📉 ⬜ 💬 🦇 ⌚ ⌚ 🎐 🎐 🎼 🔗 ⌚ 🗿 🔪 📼 🗿 📼 🎣 🦇 🦇 🦇 🦇 🔨 🎣 🎐 🔷 🚹 🚾 🔵 🔵 🔵 🔵 🔵 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔹 🔹 💤 💤 💤-' +
	'💤 💤 💤 💤 💤 💤 💤 💤 💤 💤 💤 💤 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🔵 🔵 🔵 🚹 🚹 🚹 🗾 💎 ⬜ 🎲 🚏 🗿 📼 🎧 🎼 🚏 🔎 🗿 ⌚ 🌷 🌷 📼 🔪 🔛 🔛 🦇 🦇 🦇 🎣 🔪 🦇 🚾 🚾 🚹 🔵 🔵 🔵 🔷 🔷 🌀 🌀 🌀 🌀 🌀 🌀 🔹 💤 💤 💤 💤 💤 💤 💤 💤 💤 💤 💤 💤 💤-' +
	'💤 💤 💤 💤 💤 💤 💤 💤 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🔵 🔵 🔵 🔵 🔵 🚹 🔵 🔵 🚹 🔵 🆒 💍 📼 🐧 🦡 👤 👾 🎧 🔗 🔎 🎧 🗿 📼 🎣 🦇 🎥 🎣 🎣 🦇 🚏 👤 👤 ☔ 🚾 🚾 🔵 🔵 🔵 🔵 🔷 🌀 🌀 🔹 🔹 💤 💤 💤 💤 💤 💤 💤 💤 💤 💤 💤 💤 💤 💤 💤 💤 💤-' +
	'💤 💤 💤 💤 💤 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🌀 🌀 🌀 🔵 🔵 🚾 ☔ 👤 👤 👤 👤 💺 📼 🚏 📼 🎼 🦇 🦇 🎥 💱 🔚 🎓 🎼 🎣 🎣 📼 🚏 💧 🚾 🚾 🚹 🔵 🔵 🔵 🌀 🌀 🌀 💤 💤 💤 💤 💤 💤 💤 💤 💤 💤 💤 💤 💲 💲 💲 ➖ ➖ 💤 ➖ ➖-' +
	'💤 💤 💤 💤 💤 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 💤 🌀 🌀 🔵 🔵 🏧 🔷 🔵 🔵 💎 👤 🔦 🦇 🔚 🔚 🎥 🦇 🦇 🎣 🎼 👤 📼 🔎 🎼 🔹 🔷 🚾 🔵 🔵 🔵 🔵 🔵 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 💤 💤 💤 💤 💤 💤 💤 💤 💤 💤 💤 💤 💤 💤-' +
	'💤 💤 💤 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 💤 🌀 🔵 🔵 🔵 🔵 🚾 🗾 🗾 👤 📹 🎣 🦇 🎼 📼 📼 🔦 🔎 🎼 👤 👤 👤 🌀 🔷 🚹 🚾 🌀 🌀 🌀 🌀 🔵 🔵 🔷 🔷 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔹 💤 💤 💤 💤 💤 💤 💲 💲 💲 💲-' +
	'🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 💤 💤 🌀 🌀 🔵 🔵 🔵 🔵 🔵 🔷 🦇 🚏 🦇 👤 👤 👤 👤 🔹 🔹 💧 💦 🔷 🔷 🔵 🚹 🔵 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 💤 💤 💤 💤 💤 💲 🎶 ☁ ☁-' +
	'💤 💤 💤 💤 💤 🔹 🔹 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔹 🔹 💤 💤 💤 💤 🌀 🔹 🔹 🔹 💤 💤 🌀 🌀 🔵 🔵 🔵 🔷 🌀 ☔ 🏧 🚾 🚾 🚾 🚾 🚾 🚾 🚹 🚹 🚹 🚹 🔵 🔵 🌀 🌀 🌀 💤 🔹 🌀 🌀 🌀 💤 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔹 🔹 💤 💤 💤 💤 💤 💲 💲 🎶 🎶 💲-' +
	'💲 🎶 🎶 🎶 💲 💤 💤 💤 💤 💤 🔹 🔹 🔹 🔹 🔹 💤 💤 💤 💤 💤 💤 💤 💤 💤 💤 💤 💤 💤 🌀 🌀 🌀 🌀 🔵 🔵 🔷 🔷 🔷 🔷 🔷 🔵 🔵 🔵 🔵 🌀 🌀 🔵 🔵 🔵 🔵 🌀 💤 💤 💤 💤 💤 💤 💤 💤 🌀 🌀 🌀 🌀 🔹 🔹 🔹 🔹 🔹 💤 💤 💤 💤 💤 💲 💲 🎶 🎶 🎶 ☁ 🎶 🎶-' +
	'➖ 💲 💲 💲 🎶 ☁ ☁ ☁ 🎶 💲 💲 💲 ➖ ➖ ➖ ➖ 💤 💤 💲 💲 🎶 ☁ ☁ 💤 💤 💤 🎶 💤 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🌀 🌀 🌀 🌀 🌀 🔵 🌀 🌀 💤 💤 💤 💤 🔹 🔹 💤 🌀 🌀 🌀 💤 💤 💤 💤 💲 💤 💲 💲 🎶 🎶 🎶 🎶 🎶 🎶 🎶 💲 💲 🎶 🎶 🎶-' +
	'➗ ➗ ➗ 🔃 ➖ 💲 💲 🎶 🎶 ☁ ☁ 🎶 💲 💲 💲 💲 💲 💲 💲 🎶 ☁ 🎶 🎶 🔹 🔹 💤 💲 💤 🌀 🌀 🌀 🔵 🌀 🌀 🌀 💤 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🌀 🔵 🌀 🌀 💤 💤 💤 🔹 🔹 🌀 🌀 🌀 🌀 🔹 💤 💤 🎶 ☁ ☁ 🎶 ☁ ☁ ☁ ☁ ☁ 🎶 🎶 🎶 🎶 🎶 💲 💲 💲 💲';

const matrix = raw.split('-').map(row => row.split(' ').map(cel => ({ emoji: cel, visible: false })));

const InkDay1 = () => {



	return (
		<Container>
			<Grid>
				<Background />
				{matrix.map((row, index) => {
					return <Row key={index}>{row.map((cel, index) => {
						const emoji = cel.visible ? cel.emoji : '';
						return <Cell visible={cel.visible} key={index} ><div>{emoji}</div><Emoji emoji={emoji} /></Cell>
					})}</Row>
				})}
			</Grid>
		</Container>
	);
}

export default InkDay1;

