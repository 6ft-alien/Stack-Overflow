import React, { useState } from 'react';
import icon from '../../assets/icon.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Auth.css';
import { forgotPassword } from '../../actions/auth';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            alert('Enter Email');
            return;
        }
        else {
            const response = await dispatch(forgotPassword({ email }));
            if (response.success) {
                alert('A password reset link has been sent to registered email')
                navigate('/Auth');
            } else {
                console.error(response.message);
                alert('Invalid E-Mail');
            }
        }
    };

    return (
        <section className="auth-section">
            <div className="auth-container-2">
                <img src={icon} alt="stack overflow" className="login-logo" />
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">
                        <h4>Enter Account E-Mail</h4>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <button type="submit" className="auth-btn">
                        Send Password Reset Link
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ForgotPassword;
