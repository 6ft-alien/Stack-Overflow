import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const languageMap = {
    en: 'English',
    es: 'Spanish',
    hi: 'Hindi',
    pt: 'Portuguese',
    zh: 'Chinese',
    fr: 'French',
  };

  const User = useSelector((state) => state.currentUserReducer);
  const [currentUrl, setCurrentUrl] = useState('');

  const updateLanguage = async (event) => {
    const selectedLang = event.target.value;
    if (selectedLang === 'fr') {
      alert(t('nav.verifyMessage'));
      navigate('/verify-email', { state: { from: currentUrl } });
    }
    else {
      alert(`${t('nav.verifyMessage2')} ${languageMap[selectedLang]}`)
      navigate('/verify-phone', { state: { from: currentUrl, language: selectedLang } });
    }
  };

  useEffect(() => {
    const select = document.getElementById('mySelect');
    if (select) {
      const storedLang = localStorage.getItem('language') || 'en';
      i18n.changeLanguage(storedLang);
    }
  }, [i18n]);

  useEffect(() => {
    const path = window.location.pathname + window.location.search;
    setCurrentUrl(path);
  }, [location]);

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
          <div className="select-label" id="selectLabel">{languageMap[localStorage.getItem('language') || 'en']}</div>
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
