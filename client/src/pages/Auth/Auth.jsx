import React, { useState } from 'react';
import icon from '../../assets/icon.svg';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';
import AboutAuth from './AboutAuth';
import { signup, login, checkAuth, sendOTP, verifyOTP } from '../../actions/auth';
import { isChrome } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

const Auth = () => {
  const { t } = useTranslation();
  const [isSignup, setIsSignup] = useState(false);
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOTP] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  var valid = true;

  const handleSwitch = () => {
    setIsSignup(!isSignup);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignup) {
      if (!email && !password && !name) {
        valid = false;
        alert(t('authPage.alerts.enterNameEmailPassword'));
        return;
      }
      if (!email && password && !name) {
        alert(t('authPage.alerts.enterNameEmail'));
        valid = false;
        return;
      }
    }
    if (!email && !password) {
      alert(t('authPage.alerts.enterEmailPassword'));
      valid = false;
      return;
    }
    if (!email && password) {
      alert(t('authPage.alerts.enterEmail'));
      valid = false;
      return;
    }
    if (email && !password) {
      alert(t('authPage.alerts.enterPassword'));
      valid = false;
      return;
    }
    if (isSignup) {
      if (!name) {
        alert(t('authPage.alerts.enterName'));
        valid = false;
        return;
      }
      if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
        alert(t('authPage.alerts.passwordRequirements'));
        valid = false;
      }
      if (valid === true) {
        const response = await dispatch(signup({ name, email, password }, navigate));
        if (!response.success) {
          alert(response.message);
        } else {
          alert(t('authPage.alerts.registrationSuccess'));
        }
      }
    } else {
      if (isChrome) {
        if (isOTPSent) {
          if (!otp) {
            alert(t('authPage.alerts.otpRequired'));
            return;
          }
          const verified = await dispatch(verifyOTP({ email, otp }));
          if (!verified.success) {
            alert(verified.message);
          } else {
            const responseChrome = await dispatch(login({ email, password }, navigate));
            if (!responseChrome.success) {
              alert(responseChrome.message);
            } else {
              alert(t('authPage.alerts.loginSuccess'));
            }
          }
        } else {
          const check = await dispatch(checkAuth({ email, password }));
          if (!check.success) {
            alert(check.message);
          } else {
            const response = await dispatch(sendOTP({ email }));
            if (!response.success) {
              alert(response.message);
            } else {
              alert(t('authPage.alerts.otpSent'));
              setIsOTPSent(!isOTPSent);
            }
          }
        }
      } else {
        const check = await dispatch(checkAuth({ email, password }));
        if (!check.success) {
          alert(check.message);
        } else {
          const response = await dispatch(login({ email, password }, navigate));
          if (!response.success) {
            alert(response.message);
          } else {
            alert(t('authPage.alerts.loginSuccess'));
          }
        }
      }
    }
  };

  return (
    <section className="auth-section">
      {isSignup && <AboutAuth />}
      <div className="auth-container-2">
        {!isSignup && <img src={icon} alt="stack overflow" className="login-logo" />}
        <form onSubmit={handleSubmit} style={isSignup ? { marginTop: "60px", width: "300px" } : {}}>
          {isSignup && (
            <label htmlFor="name">
              <h4>{t('authPage.labels.displayName')}</h4>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          )}
          <label htmlFor="email">
            <h4>{t('authPage.labels.email')}</h4>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              disabled={isOTPSent}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h4>{t('authPage.labels.password')}</h4>
              {!isSignup && (
                <Link className='forgot' to={'/forgot-password'}>
                  <p style={{ color: '#007ac6', fontSize: '13px' }}>{t('authPage.forgotPasswordLink')}</p>
                </Link>
              )}
            </div>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              disabled={isOTPSent}
              onChange={(e) => setPassword(e.target.value)}
            />
            {isSignup && (
              <p style={{ color: '#666767', fontSize: '13px' }}>
                {t('authPage.passwordRequirements')}
              </p>
            )}
          </label>

          {(isChrome && !isSignup) && (
            <label htmlFor="otp">
              <h4>{t('authPage.labels.otp')}</h4>
              <input
                className='otp-field'
                type="text"
                name="otp"
                id="otp"
                disabled={!isOTPSent}
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
              />
            </label>
          )}

          {isSignup && (
            <label htmlFor="check">
              <input type="checkbox" id="check" name="check" />
              <p style={{ fontSize: '13px' }}>
                {t('authPage.checkBoxText')}
              </p>
            </label>
          )}
          <button type="submit" className="auth-btn">
            {isChrome ? (
              isSignup ? t('authPage.buttons.signup') : isOTPSent ? t('authPage.buttons.login') : t('authPage.buttons.sendOTP')
            ) :
              (isSignup ? t('authPage.buttons.signup') : t('authPage.buttons.login'))}
          </button>
          {isSignup && (
            <p style={{ color: '#666767', fontSize: '13px' }}>
              {t('authPage.termsOfService')} 
              <span style={{ color: '#007ac6' }}> {t('authPage.termsLinks.terms')}</span>,
              <span style={{ color: '#007ac6' }}> {t('authPage.termsLinks.privacyPolicy')}</span> {t('authPage.and')}
              <span style={{ color: '#007ac6' }}> {t('authPage.termsLinks.cookiePolicy')}</span>.
            </p>
          )}
        </form>
        <p>
          {isSignup ? t('authPage.alreadyHaveAccountText') : t('authPage.dontHaveAccountText')}
          <button type="button" className="handle-switch-btn" onClick={handleSwitch}>
            {isSignup ? t('authPage.switchButtonText.login') : t('authPage.switchButtonText.signup')}
          </button>
        </p>
      </div>
    </section>
  );
};

export default Auth;
