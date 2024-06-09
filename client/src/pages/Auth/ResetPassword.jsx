import React, { useState } from 'react';
import icon from '../../assets/icon.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../actions/auth';
import './Auth.css';

const ResetPassword = () => {
    const { id, token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const resetPasswordStatus = useSelector(state => state.auth.resetPasswordStatus);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!password) {
          alert('Enter Password');
          return;
        }
        if (!confirmPassword) {
          alert('All fields are important');
          return;
        }
        if (password !== confirmPassword) {
            alert('Confirm Password must be same as New Password');
            return;
        }
        
        const result = await dispatch(resetPassword({id, token, password}, navigate));
        if (result.success) {
            alert('Password Reset Successful!\nLOGIN to continue...')
            navigate('/Auth');
        } else {
            alert(result.message);
        }
    };

    return (
        <section className="auth-section">
            <div className="auth-container-2">
                <img src={icon} alt="stack overflow" className="login-logo" />
                <form onSubmit={handleSubmit}>
                    <label htmlFor="password">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h4>New Password</h4>
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
                            <h4>Confirm New Password</h4>
                        </div>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <p style={{ color: '#666767', fontSize: '13px' }}>
                            Passwords must contain at least eight characters,<br /> including at least 1 letter and 1 number.
                        </p>
                    </label>
                    <button type="submit" className="auth-btn">
                        {resetPasswordStatus === 'loading' ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ResetPassword;
