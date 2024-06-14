import { useState, useEffect } from 'react';
import { isMobileOnly } from 'react-device-detect';
import { fetchCurrentTime } from '../utils/currentTime';

const useMobileRestriction = () => {
    const [isRestricted, setIsRestricted] = useState(true);

    useEffect(() => {
        const checkAccess = async () => {
            try {
                const currentTimeIST = await fetchCurrentTime();
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

        checkAccess();
    }, []);

    return isRestricted;
};

export default useMobileRestriction;
