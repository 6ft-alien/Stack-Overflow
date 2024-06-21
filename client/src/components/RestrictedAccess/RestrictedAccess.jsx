import React from 'react';
import './RestrictedAccess.css';
import warning from '../../assets/warning.svg';
import { useTranslation } from 'react-i18next';

const RestrictedAccess = () => {
  const { t } = useTranslation();

  return (
    <section className="message-section">
      <div className="message-container">
        <div className='message-container-2'>
          <h4 className='message'>
            <img src={warning} alt="" style={{ height: "20px" }} /><br /><br />
            {t('restrictedAccess.line1')}<br />
            {t('restrictedAccess.line2')}<br /><br />
            {t('restrictedAccess.line3')}<br /><br />
            {t('restrictedAccess.line4')}<br />
            {t('restrictedAccess.line5')}
          </h4>
        </div>
      </div>
    </section>
  );
};

export default RestrictedAccess;
