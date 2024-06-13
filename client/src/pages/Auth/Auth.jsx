import React, { useState } from 'react';
import icon from '../../assets/icon.svg';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';
import AboutAuth from './AboutAuth';
import { signup, login, checkAuth, sendOTP, verifyOTP } from '../../actions/auth';
import { isChrome } from 'react-device-detect'

const Auth = () => {

  
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
        valid=false;
        alert('Enter Name, Email & Password');
        return;
      }
      if (!email && password && !name) {
        alert('Enter Name & Email');
        valid=false;
        return;
      }
    }
    if (!email && !password) {
      alert('Enter Email & Password');
      valid=false;
      return;
    }
    if (!email && password) {
      alert('Enter Email');
      valid=false;
      return;
    }
    if (email && !password) {
      alert('Enter Password');
      valid=false;
      return;
    }
    if (isSignup) {
      if (!name) {
        alert('Enter Name');
        valid=false;
        return;
      }
      if (password.length<8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
        alert('Password must contain at least eight characters including at least 1 letter and 1 number');
        valid=false;
      }
      if (valid === true) {
        const response = await dispatch(signup({ name, email, password }, navigate));
      if (!response.success) {
        alert(response.message);
      } else {
        alert('Registration successful!');
      }
      }
    } 
    else {
      if(isChrome) {
        if(isOTPSent) {
          if(!otp) {
            alert('OTP is Required')
            return;
          }
          const verified = await dispatch(verifyOTP({ email, otp }))
            if(!verified.success) {
              alert(verified.message)
            }
            else {
              const responseChrome = await dispatch(login({ email, password }, navigate));
              if (!responseChrome.success) {
                alert(responseChrome.message);
              } else {
                alert('Login successful!');
              }
            }
        }
        else {
          const check = await dispatch(checkAuth({ email, password }))
          if(!check.success)
            {
              alert(check.message)
            }
            else {
              const response = await dispatch(sendOTP({ email }))
                if(!response.success) {
                  alert(response.message)
                }
                else {
                  alert('An OTP has been sent to your mail for verification');
                  setIsOTPSent(!isOTPSent);
                }
            }
        }
      }
      else {
          const check = await dispatch(checkAuth({ email, password }))
          if(!check.success)
            {
              alert(check.message)
            }
          else {
              const response = await dispatch(login({ email, password }, navigate));
              if (!response.success) {
                alert(response.message);
              } else {
                alert('Login successful!');
              }
          }
        }
      }
  }

  return (
    <section className="auth-section">
      {isSignup && <AboutAuth />}
      <div className="auth-container-2">
        {!isSignup && <img src={icon} alt="stack overflow" className="login-logo" />}
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <label htmlFor="name">
              <h4>Display Name</h4>
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
            <h4>Email</h4>
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
              <h4>Password</h4>
              {!isSignup && (
                <Link className='forgot' to={'/forgot-password'}>
                  <p style={{ color: '#007ac6', fontSize: '13px' }}>Forgot Password?</p>
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
                Passwords must contain at least eight
                <br />
                characters, including at least 1 letter and 1
                <br />
                number.
              </p>
            )}
          </label>

          {(isChrome && !isSignup) && (
            <label htmlFor="otp">
            <h4>OTP</h4>
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
                Opt-in to receive occasional,
                <br />
                product updates, user research invitations,
                <br />
                company announcements, and digests.
              </p>
            </label>
          )}
          <button type="submit" className="auth-btn">
            {isChrome ? (
              isSignup ? 'Sign up' : isOTPSent ? 'Login' : 'Send OTP'
            ) :
            ( isSignup ? 'Sign up' : 'Login' )}
          </button>
          {isSignup && (
            <p style={{ color: '#666767', fontSize: '13px' }}>
              By clicking "Sign up", you agree to our
              <span style={{ color: '#007ac6' }}> terms of<br />service</span>,
              <span style={{ color: '#007ac6' }}> privacy policy</span> and
              <span style={{ color: '#007ac6' }}> cookie policy</span>
            </p>
          )}
        </form>
        <p>
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
          <button type="button" className="handle-switch-btn" onClick={handleSwitch}>
            {isSignup ? 'Log in' : 'Sign up'}
          </button>
        </p>
      </div>
    </section>
  );
};

export default Auth;
  
