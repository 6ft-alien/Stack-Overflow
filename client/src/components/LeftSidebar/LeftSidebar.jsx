import React from 'react'
import './LeftSidebar.css'
import { NavLink } from 'react-router-dom'
import Globe from '../../assets/Globe.svg'
import { useTranslation } from 'react-i18next';

const LeftSidebar = () => {
  const { t } = useTranslation();

  return (
    <div className='left-sidebar'>
      <nav className="side-nav">
        <NavLink to='/' className='side-nav-links' activeClassName='active'>
          <p>{t('leftbar.home')}</p>
        </NavLink>
        <div className='side-nav-div'>
          <div><p>{t('leftbar.public')}</p></div>
          <NavLink to='/Questions' className='side-nav-links' activeClassName='active' >
            <img src={Globe} alt="Globe" />
            <p style={{paddingLeft: "10px"}}>{t('leftbar.questions')}</p>
          </NavLink>
          
          <NavLink to='/Tags' className='side-nav-links' activeClassName='active' style={{paddingLeft: "40px"}}>
            <p>{t('leftbar.tags')}</p>
          </NavLink>
          <NavLink to='/Users' className='side-nav-links' activeClassName='active' style={{paddingLeft: "40px"}}>
            <p>{t('leftbar.users')}</p>
          </NavLink>
        </div>
      </nav>      
    </div>
  )
}

export default LeftSidebar
