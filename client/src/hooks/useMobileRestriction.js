import { useState, useEffect } from 'react';
import axios from 'axios';
import { isMobileOnly } from 'react-device-detect';

const useMobileRestriction = () => {
    const [isRestricted, setIsRestricted] = useState(false);

    useEffect(() => {
        const fetchCurrentTime = async () => {
            try {
                const response = await axios.get('http://worldtimeapi.org/api/timezone/Asia/Kolkata');
                const currentTimeIST = new Date(response.data.datetime);
                const currentHour = currentTimeIST.getHours();

                console.log(`Current Time (IST):`, currentTimeIST.toString());
                console.log(`Current Hour in IST:`, currentHour);

                const startHour = 10;
                const endHour = 13;

                if (isMobileOnly && (currentHour >= startHour && currentHour < endHour)) {
                    setIsRestricted(false);
                } else {
                    if(isMobileOnly){   
                        setIsRestricted(true);
                    }
                    else {
                        setIsRestricted(false);
                    }
                }
            } catch (error) {
                console.error('Error fetching the current time:', error);
                setIsRestricted(true);
            }
        };

        fetchCurrentTime();
    }, []);

    return isRestricted;
};

export default useMobileRestriction;
