import React from 'react';
import './RestrictedAccess.css'
import warning from '../../assets/warning.svg'
const RestrictedAccess = () => (
  <section className="message-section">
    <div className="message-container">
      <div className='message-container-2'>
        <h4 className='message'>
          <img src={warning} alt="" style={{height:"20px"}}/><br /><br />
          You are not allowed to visit<br />
          our website at this time.<br /><br />
          Try using a PC or a Laptop.<br /><br />
          WEBSITE TIMINGS ON MOBILE:<br />
          10:00 AM - 1:00 PM IST
        </h4>
      </div>
    </div>
  </section>
);

export default RestrictedAccess;
