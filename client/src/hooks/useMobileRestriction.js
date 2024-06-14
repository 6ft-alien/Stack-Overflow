import { useState, useEffect } from 'react';
import axios from 'axios';
import { isMobileOnly } from 'react-device-detect';

const useMobileRestriction = () => {
    const [isRestricted, setIsRestricted] = useState(false);

    useEffect(() => {
        const fetchCurrentTime = async () => {
            try {
                const response = await axios.get('https://worldtimeapi.org/api/timezone/Asia/Kolkata');
                const currentTimeIST = new Date(response.data.datetime);
                const currentHour = currentTimeIST.getHours();

                if (isMobileOnly && (currentHour >= 10 && currentHour < 13)) {
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
            }
        };

        fetchCurrentTime();
    }, []);

    return isRestricted;
};

export default useMobileRestriction;
