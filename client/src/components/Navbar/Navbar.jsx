import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {jwtDecode} from 'jwt-decode';

import logo from '../../assets/logo.svg';
import Search from '../../assets/search.svg';
import Avatar from '../../components/Avatar/Avatar';
import './Navbar.css';
import { setCurrentUser } from '../../actions/currentUser';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const User = useSelector((state) => state.currentUserReducer);
  const [selectedOption, setSelectedOption] = useState('English');

  const updateLabel = (event) => {
    const select = event.target;
    const selectedOption = select.options[select.selectedIndex].text;
    setSelectedOption(selectedOption);
  };

  useEffect(() => {
    const select = document.getElementById('mySelect');
    if (select) {
      const initialOption = select.options[select.selectedIndex].text;
      setSelectedOption(initialOption);
    }
  }, []);

  const handleLogOut = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
    dispatch(setCurrentUser(null));
  };

  useEffect(() => {
    const token = User?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogOut();
      }
    }
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('profile'))));
  }, [dispatch]);

  return (
    <nav className='main-nav'>
      <div className="navbar">
        <Link to='/' className='nav-item nav-logo'>
          <img src={logo} alt="logo" height="30" />
        </Link>
        <Link to='/' className='nav-item nav-btn'>About</Link>
        <Link to='/' className='nav-item nav-btn'>Products</Link>
        <Link to='/' className='nav-item nav-btn'>For Teams</Link>
        <form>
          <input type="text" placeholder='Search...' />
          <img src={Search} alt="Search" className='search-icon' width={18} />
        </form>
        <div className="select-container">
          <div>
            <select id="mySelect" onChange={updateLabel}>
            <option value="english">English</option>
            <option value="spanish">Spanish</option>
              <option value="hindi">Hindi</option>
              <option value="portuguese">Portuguese</option>
              <option value="chinese">Chinese</option>
              <option value="french">French</option>
            </select>
          </div>
          <div className="select-label" id="selectLabel">{selectedOption}</div>
        </div>
        {User?.result?.name ? (
          <>
            <Avatar backgroundColor='#009dff' borderRadius="100%" color='white' size="33px" fontWeight="600">
              <Link to={`/Users/${User?.result?._id}`} style={{ color: "white", textDecoration: "none" }}>
                {User.result.name.charAt(0).toUpperCase()}
              </Link>
            </Avatar>
            <button className='nav-item nav-links' onClick={handleLogOut}>Log Out</button>
          </>
        ) : (
          <Link to='/Auth' className='nav-item nav-links'>Log In</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
