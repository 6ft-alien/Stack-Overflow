import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const LanguageBackground = ({ children }) => {
    const location = useLocation();
    const [bgColor, setBgColor] = useState('white');

    useEffect(() => {
        const lang = location.state?.language || localStorage.getItem('language');
        switch (lang) {
            case 'en':
            case 'es':
            case 'pt':
                setBgColor('white');
                break;
            case 'hi':
                setBgColor('rgb(138, 138, 255)');
                break;
            case 'zh':
                setBgColor('rgb(80, 171, 80)');
                break;
            case 'fr':
                setBgColor('rgb(255, 255, 100)');
                break;
            default:
                setBgColor('white');
                break;
        }
    }, [location]);

    return (
        <div style={{ backgroundColor: bgColor }}>
            {children}
        </div>
    );
};

export default LanguageBackground;
