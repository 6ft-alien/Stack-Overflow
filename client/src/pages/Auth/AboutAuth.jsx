import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutAuth = () => {
  const { t } = useTranslation();

  return (
    <div className="auth-container-1">
      <h1>{t('authPage.aboutAuth.title')}</h1>
      <p>{t('authPage.aboutAuth.line1')}</p>
      <p>{t('authPage.aboutAuth.line2')}</p>
      <p>{t('authPage.aboutAuth.line3')}</p>
      <p>{t('authPage.aboutAuth.line4')}</p>
      <p style={{color: "#666767", fontSize:"13px"}}>{t('authPage.aboutAuth.line5')}</p>
      <p style={{color: "#007ac6", fontSize:"13px"}}>{t('authPage.aboutAuth.line6')}</p>
    </div>
  );
};

export default AboutAuth;
