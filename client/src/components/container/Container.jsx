import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../view/Header/Header';
import Main from '../view/Main';
import Login from '../view/Registration/Login';
import Signup from '../view/Registration/Signup';
import Dashboard from '../view/Dashboard/Dashboard';
import { useLoginStatus } from '../../context/LoginContext';
import '../assets/styles/Style.css';
import '../assets/styles/mobile.css';
import { Profile } from '../view/profile/Profile';

const Container = () => {


  const {loggedIn, setLoggedIn} = useLoginStatus();


  return (

    <Router>
      <div className='Presentation'>
        <Header />
        <Routes>
        <Route exact path="/" element={<Main loggedin={loggedIn} />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/home" element={<Main loggedin={loggedIn} />} />
        <Route exact path="/signup" element={<Signup setLoggedIn={setLoggedIn}/>} />
        <Route exact path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        </Routes>
      </div>
    </Router> 

  );
};

export default Container;
