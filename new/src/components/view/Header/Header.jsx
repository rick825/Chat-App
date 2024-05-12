import React from 'react'
import './Header.css';
import '../../assets/styles/Style.css';
import { useLoginStatus } from '../../../context/LoginContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';




const Header = () => {
  
 const navigate = useNavigate();
  const { loggedIn,setLoggedIn } = useLoginStatus();

  const handleLogout = () =>{
    localStorage.removeItem('loggedInUser'); 
    localStorage.removeItem('token');
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
    toast.success("Logout Successfull");
    navigate('/');
  }

  const handleNavigation = (value) =>{
     navigate(value)
  }

  return <>
    <div className="nav">
    <div className="navleft">
      <div className="navlogo">
        <a href="/">
          <h2>Chat App</h2>
        </a>
      </div>
    </div>
    <div className="navright">
      <div className="navlist">
     {loggedIn &&
        <ul>
          <li className="navitem">
            <a  onClick={()=>handleNavigation('/home')} className="navlink"
              ><img
                src="https://img.icons8.com/sf-regular/48/home-page.png" alt="home-page"/>
            </a>
          </li>
          <li className="navitem">
            <a onClick={()=>handleNavigation('/home')} className="navlink"
              ><img
                src="https://img.icons8.com/windows/32/000000/user-male-circle.png"
                alt="user-male-circle"
            /></a>
          </li>
          <li className="navitem">
            <a  style={{cursor: 'pointer'}} onClick={handleLogout} className="navlink"
              ><img src="https://img.icons8.com/sf-regular/48/logout-rounded.png" alt="logout-rounded"/></a>
          </li>
        </ul>
       }
       {!loggedIn &&
        <ul className='notlogin'>
            <li className="navitem">
            <a onClick={()=>handleNavigation('/home')} className="navlink signup"
              > Signup
            </a>
          </li>
          <li className="navitem">
            <a onClick={()=>handleNavigation('/home')} className="navlink login"
              >Login</a>
          </li>
        </ul>
       }

      </div>
    </div>
  </div>
  </>
  
}

export default Header;