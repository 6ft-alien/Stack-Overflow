import { isMobileOnly } from 'react-device-detect';
import { toZonedTime } from 'date-fns-tz';

const useMobileRestriction = () => {
    const startHour = 10;
    const endHour = 13;

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const now = new Date();
    const zonedTime = toZonedTime(now, timeZone);
    const currentHour = zonedTime.getHours();

    if (isMobileOnly && (currentHour >= startHour && currentHour < endHour)) {
        return false;
    }
    return isMobileOnly;
};

export default useMobileRestriction;
