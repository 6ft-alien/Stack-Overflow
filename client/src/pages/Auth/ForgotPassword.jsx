import React, { useState } from 'react';
import icon from '../../assets/icon.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import './Auth.css';
import { forgotPassword } from '../../actions/auth';

const ForgotPassword = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            alert(t('forgotPassword.alertMessage'));
            return;
        } else {
            const response = await dispatch(forgotPassword({ email }));
            if (response.success) {
                alert(t('forgotPassword.successMessage'));
                navigate('/Auth');
            } else {
                console.error(response.message);
                alert(t('forgotPassword.errorMessage'));
            }
        }
    };

    return (
        <section className="auth-section">
            <div className="auth-container-2">
                <img src={icon} alt="stack overflow" className="login-logo" />
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">
                        <h4>{t('forgotPassword.title')}</h4>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <button type="submit" className="auth-btn">
                        {t('forgotPassword.button')}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ForgotPassword;
