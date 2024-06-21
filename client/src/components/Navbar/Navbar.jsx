import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/logo.svg';
import Search from '../../assets/search.svg';
import Avatar from '../../components/Avatar/Avatar';
import './Navbar.css';
import { setCurrentUser } from '../../actions/currentUser';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const User = useSelector((state) => state.currentUserReducer);
  const [selectedOption, setSelectedOption] = useState('English');

  const updateLanguage = (event) => {
    const selectedLang = event.target.value;
    i18n.changeLanguage(selectedLang);
    localStorage.setItem('language', selectedLang);
    setSelectedOption(event.target.options[event.target.selectedIndex].text);
  };

  useEffect(() => {
    const select = document.getElementById('mySelect');
    if (select) {
      const storedLang = localStorage.getItem('language') || 'en';
      i18n.changeLanguage(storedLang);
      const initialOption = select.options[select.selectedIndex].text;
      setSelectedOption(initialOption);
    }
  }, [i18n]);

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
        <Link to='/' className='nav-item nav-btn'>{t('nav.about')}</Link>
        <Link to='/' className='nav-item nav-btn'>{t('nav.products')}</Link>
        <Link to='/' className='nav-item nav-btn'>{t('nav.forTeams')}</Link>
        <form>
          <input type="text" placeholder={t('nav.search')} />
          <img src={Search} alt="Search" className='search-icon' width={18} />
        </form>
        <div className="select-container">
          <div>
            <select id="mySelect" onChange={updateLanguage} value={localStorage.getItem('language') || 'en'}>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="hi">Hindi</option>
              <option value="pt">Portuguese</option>
              <option value="zh">Chinese</option>
              <option value="fr">French</option>
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
            <button className='nav-item nav-links' onClick={handleLogOut}>{t('nav.logOut')}</button>
          </>
        ) : (
          <Link to='/Auth' className='nav-item nav-links'>{t('nav.logIn')}</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
