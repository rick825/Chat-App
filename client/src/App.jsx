import React from 'react';
import Container from './components/container/Container'
import './components/assets/styles/Style.css';
import {LoginProvider} from './context/LoginContext';
import { DashboaordProvider } from './context/DashboardContext';

function App() {
  return (
    <DashboaordProvider>
    <LoginProvider>
    <div className='container'>
       <Container />
    </div>
    </LoginProvider>
    </DashboaordProvider>
  );
}

export default App;
