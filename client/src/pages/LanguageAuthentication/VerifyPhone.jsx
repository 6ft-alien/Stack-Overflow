import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { verifyOTPPhone, sendOTPPhone } from '../../actions/translations';
import icon from '../../assets/icon.svg';
import '../Auth/Auth.css';

const VerifyPhone = () => {
    const { t, i18n } = useTranslation();
    const [phone, setPhone] = useState('');
    const [otp, setOTP] = useState('');
    const [isOTPSent, setIsOTPSent] = useState(false);
    const [path, setPath] = useState('');
    const [language, setLanguage] = useState('');
    const [backlang, setBackLang] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const languageMap = {
        en: 'English',
        es: 'Spanish',
        hi: 'Hindi',
        pt: 'Portuguese',
        zh: 'Chinese',
        fr: 'French',
    };

    useEffect(() => {
        const lang = localStorage.getItem('language');
        setBackLang(lang);

        if (location.state && location.state.from) {
            setPath(location.state.from);
        }
        if (location.state && location.state.language) {
            setLanguage(location.state.language);
        }
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!phone) {
            alert(t('verPhone.alerts.enterPhone'));
        } else {
            if (isOTPSent) {
                if (!otp) {
                    alert(t('verPhone.alerts.enterOTP'));
                    return;
                }
                const verified = await dispatch(verifyOTPPhone({ phone, otp }));
                if (!verified.success) {
                    alert(t('verPhone.alerts.phoneVerificationFailed', { message: verified.message }));
                } else {
                    alert(t('verPhone.alerts.phoneVerified'));
                    i18n.changeLanguage(language);
                    localStorage.setItem('language', language);
                    navigate(path, { state: { language } });
                }
            } else {
                const smsSent = await dispatch(sendOTPPhone(phone));
                if (!smsSent.success) {
                    alert(smsSent.message);
                } else {
                    alert(t('verPhone.alerts.otpSent'));
                    setIsOTPSent(true);
                }
            }
        }
    };

    return (
        <section className={`auth-section ${backlang}`}>
            <div className="auth-container-2">
                <img src={icon} alt="stack overflow" className="login-logo" />
                <form onSubmit={handleSubmit} style={{ width: "290px" }}>
                    <label htmlFor="phone">
                        <h4>{t('verPhone.labels.enterPhone')}</h4>
                        <p style={{ color: '#666767', fontSize: '10px' }}>
                                {t('verPhone.messages.verifyPhoneToTranslate')} {languageMap[language]}
                        </p>
                        <div className='country-phone'>
                            <input type="tel" id="countryCode" value="+91" disabled={true} />
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                value={phone}
                                disabled={isOTPSent}
                                placeholder="90364XXXXX"
                                maxLength={10}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </label>
                    <label htmlFor="otp">
                        <h4>{t('verPhone.labels.otp')}</h4>
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
                        {isOTPSent ? t('verPhone.buttons.verifyPhone') : t('verPhone.buttons.sendOTP')}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default VerifyPhone;
