import * as api from '../api'

export const fetchCurrentTime = async () => {
    try {
        const response = await api.fetchCurrentTime('https://worldtimeapi.org/api/timezone/Asia/Kolkata');
        return new Date(response.data.datetime);
    } catch (error) {
        console.error('Error fetching the current time:', error);
        return null;
    }
};

