import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { verifyOTPMail, sendOTPMail } from '../../actions/translations';
import icon from '../../assets/icon.svg';
import '../Auth/Auth.css';

const VerifyEmail = () => {
    const { t, i18n } = useTranslation();
    const [email, setEmail] = useState('');
    const [otp, setOTP] = useState('');
    const [isOTPSent, setIsOTPSent] = useState(false);
    const [path, setPath] = useState('');
    const User = useSelector((state) => state.currentUserReducer);
    const [backlang, setBackLang] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (User?.result?.email) {
            setEmail(User?.result?.email);
        }
    }, [User]);

    useEffect(() => {
        const lang = localStorage.getItem('language');
        setBackLang(lang);

        if (location.state && location.state.from) {
            setPath(location.state.from)
        }
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            alert(t('verMail.messages.enterEmail'));
        } else {
            if (isOTPSent) {
                if (!otp) {
                  alert(t('verMail.messages.otpRequired'));
                  return;
                }
                const verified = await dispatch(verifyOTPMail({ email, otp }));
                if (!verified.success) {
                  alert(verified.message);
                } else {
                    alert(t('verMail.messages.emailVerified'));
                    i18n.changeLanguage('fr');
                    localStorage.setItem('language', 'fr');
                    navigate(path)
                }
              } else {
                  const emailSent = await dispatch(sendOTPMail(email));
                  if (!emailSent.success) {
                    alert(emailSent.message);
                  } else {
                    alert(t('verMail.messages.otpSent'));
                      setIsOTPSent(!isOTPSent);
                  }
              }
        }
    };

    return (
    <section className={`auth-section ${backlang}`}>
            <div className="auth-container-2">
                <img src={icon} alt="stack overflow" className="login-logo" />
                <form onSubmit={handleSubmit} style={{width: "290px"}}>
                    <label htmlFor="email">
                        <h4>{t('verMail.labels.enterEmail')}</h4>
                        <p style={{ color: '#666767', fontSize: '13px' }}>
                            {t('verMail.messages.verifyEmailToTranslate')}
                        </p>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            disabled={isOTPSent}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label htmlFor="otp">
                        <h4>{t('verMail.labels.otp')}</h4>
                        <input
                            className='otp-field'
                            type="text"
                            name="otp"
                            id="otp"
                            disabled={!isOTPSent}
                            value={otp}
                            maxLength={6}
                            onChange={(e) => setOTP(e.target.value)}
                        />
                    </label>
                    <button type="submit" className="auth-btn">
                        {isOTPSent ? t('verMail.buttons.verifyEmail') : t('verMail.buttons.sendOTP')}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default VerifyEmail;
