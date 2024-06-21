import React from 'react';
import './RightSidebar.css';
import comment from '../../assets/comment-alt-solid.svg';
import pen from '../../assets/pen-solid.svg';
import blackLogo from '../../assets/blacklogo.svg';
import { useTranslation } from 'react-i18next';

const Widget = () => {
  const { t } = useTranslation();

  return (
    <div className='widget'>
      <h4>{t('rightbar.blogTitle')}</h4>
      <div className="right-sidebar-div-1">
        <div className="right-sidebar-div-2">
          <img src={pen} alt="pen" width='18'/>
          <p>{t('rightbar.blog1')}</p>
        </div>
        <div className="right-sidebar-div-2">
          <img src={pen} alt="pen" width='18'/>
          <p>{t('rightbar.blog2')} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
        </div>
      </div>

      <h4>{t('rightbar.metaTitle')}</h4>
      <div className="right-sidebar-div-1">
        <div className="right-sidebar-div-2">
          <img src={comment} alt="comment" width='18'/>
          <p>{t('rightbar.meta1')} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
        </div>
        <div className="right-sidebar-div-2">
          <img src={comment} alt="comment" width='18'/>
          <p>{t('rightbar.meta2')}</p>
        </div>
        <div className="right-sidebar-div-2">
          <img src={blackLogo} alt="blackLogo" width='18'/>
          <p>{t('rightbar.meta3')}</p>
        </div>
      </div>

      <h4>{t('rightbar.hotMetaTitle')}</h4>
      <div className="right-sidebar-div-1">
        <div className="right-sidebar-div-2">
          <p>38</p>
          <p>{t('rightbar.hotMeta1')}</p>
        </div>
        <div className="right-sidebar-div-2">
          <p>20</p>
          <p>{t('rightbar.hotMeta2')}</p>
        </div>
        <div className="right-sidebar-div-2">
          <p>14</p>
          <p>{t('rightbar.hotMeta3')}</p>
        </div>
      </div>
    </div>
  )
}

export default Widget;
