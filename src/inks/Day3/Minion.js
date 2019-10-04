import React from 'react';

import imgMinion from '../../img/minion-life.png';

const Minion = ({x, y}) => <img alt="minion" style={{position: 'absolute', left: '10px'}} src={imgMinion}></img>

export default Minion;