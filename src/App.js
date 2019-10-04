import React from 'react';
import styled from 'styled-components';

import Title from './components/Title';
import Divider from './components/Divider';
import Footer from './components/Footer';
import Inktober from './components/Inktober';

const Container = styled.div`
  height: 500px;
  width: 800px;
  margin: 0 auto;
`;

const App = () => (
  <Container>
    <Title/>
    <Inktober />
    <Divider />
    <Footer />
  </Container>
);

export default App;
