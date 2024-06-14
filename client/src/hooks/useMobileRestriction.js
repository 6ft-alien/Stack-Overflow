import { isMobileOnly } from 'react-device-detect';

const useMobileRestriction = () => {
    const startHour = 10;
    const endHour = 13;
    const now = new Date();
    const currentHour = now.getHours();

    if (isMobileOnly && (currentHour >= startHour && currentHour < endHour)) {
        return true;
    }
    else {
        return false;
    }
};

export default useMobileRestriction;
