import { useState, useEffect } from 'react';
import axios from 'axios';
import { isMobileOnly } from 'react-device-detect';
import { toZonedTime } from 'date-fns-tz';

const useMobileRestriction = () => {
    const [isRestricted, setIsRestricted] = useState(true);

    useEffect(() => {
        const fetchCurrentTime = async () => {
            try {
                const response = await axios.get('http://worldtimeapi.org/api/timezone/Etc/UTC');
                const utcTime = new Date(response.data.utc_datetime);
                
                const timeZone = 'Asia/Kolkata';   // IST timezone
                const zonedTime = toZonedTime(utcTime, timeZone);
                const currentHour = zonedTime.getHours();

                if (isMobileOnly && (currentHour >= 10 && currentHour < 13)) {
                    setIsRestricted(false); 
                } else {
                    setIsRestricted(isMobileOnly);
                }
            } catch (error) {
                console.error('Error fetching the current time:', error);
            }
        };

        fetchCurrentTime();
    }, []);

    return isRestricted;
};

export default useMobileRestriction;
