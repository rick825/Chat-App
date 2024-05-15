import React from 'react'
import './Header.css';
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
            <p  onClick={()=>handleNavigation('/home')} className="navlink"
              ><img
                src="https://img.icons8.com/sf-regular/48/home-page.png" alt="home-page"/>
            </p>
          </li>
          <li className="navitem">
            <p onClick={()=>handleNavigation('/profile')} className="navlink"
              ><img
                src="https://img.icons8.com/windows/32/000000/user-male-circle.png"
                alt="user-male-circle"
            /></p>
          </li>
          <li className="navitem">
            <p  style={{cursor: 'pointer'}} onClick={handleLogout} className="navlink"
              ><img src="https://img.icons8.com/sf-regular/48/logout-rounded.png" alt="logout-rounded"/></p>
          </li>
        </ul>
       }
       {!loggedIn &&
        <ul className='notlogin'>
            <li className="navitem">
            <p onClick={()=>handleNavigation('/signup')} className="navlink signup"
              > Signup
            </p>
          </li>
          <li className="navitem">
            <p onClick={()=>handleNavigation('/login')} className="navlink login"
              >Login</p>
          </li>
        </ul>
       }

      </div>
    </div>
  </div>
  </>
  
}

export default Header;