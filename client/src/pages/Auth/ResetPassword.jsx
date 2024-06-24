import React, { useEffect, useState } from 'react';
import icon from '../../assets/icon.svg';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { resetPassword } from '../../actions/auth';
import './Auth.css';

const ResetPassword = () => {
    const { t } = useTranslation();
    const { id, token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [language, setLanguage] = useState('');


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const resetPasswordStatus = useSelector(state => state.auth.resetPasswordStatus);

    useEffect(() => {
        const lang = location.state?.language || localStorage.getItem('language');
        setLanguage(lang);
    }, [location]);    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password) {
          alert(t('resetPassword.enterPasswordAlert'));
          return;
        }
        if (!confirmPassword) {
          alert(t('resetPassword.fieldsRequiredAlert'));
          return;
        }
        if (password !== confirmPassword) {
            alert(t('resetPassword.passwordMismatchAlert'));
            return;
        }
        
        const result = await dispatch(resetPassword({id, token, password}, navigate));
        if (result.success) {
            alert(t('resetPassword.successMessage'));
            navigate('/Auth');
        } else {
            alert(t('resetPassword.errorMessage'));
        }
    };

    return (
        <section className={`auth-section ${language}`}>
            <div className="auth-container-2">
                <img src={icon} alt="stack overflow" className="login-logo" />
                <form onSubmit={handleSubmit} style={{width: "320px"}}>
                    <label htmlFor="password">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h4>{t('resetPassword.newPassword')}</h4>
                        </div>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>

                    <label htmlFor="confirmPassword">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h4>{t('resetPassword.confirmNewPassword')}</h4>
                        </div>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <p style={{ color: '#666767', fontSize: '13px' }}>
                            {t('resetPassword.passwordRequirements')}
                        </p>
                    </label>
                    <button type="submit" className="auth-btn">
                        {resetPasswordStatus === 'loading' ? t('resetPassword.updatingButton') : t('resetPassword.updatePasswordButton')}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ResetPassword;
