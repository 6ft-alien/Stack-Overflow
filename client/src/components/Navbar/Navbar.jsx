import React, { useEffect } from 'react';
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
        {User?.result?.name ? (
          <>
            <Avatar backgroundColor='#009dff' borderRadius="50%" px="10px" py="7px" color='white'>
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
