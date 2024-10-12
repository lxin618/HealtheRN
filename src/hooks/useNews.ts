import { NEWS_API } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useNews = () => {
    const fetchHealthNews = async () => {
        const healthNewsUrl = NEWS_API + '&category=health&q=health&thread.country=nz';
        const CACHE_KEY = 'healthNews';
        const CACHE_EXPIRATION_KEY = 'healthNewsCacheExpiration';
        const now = new Date().getTime();

        // Check if there's a cached response and if it's still valid
        const cachedData = await AsyncStorage.getItem(CACHE_KEY);
        const expirationTime = await AsyncStorage.getItem(CACHE_EXPIRATION_KEY);

        if (cachedData && expirationTime && now < parseInt(expirationTime, 10)) {
            return JSON.parse(cachedData); // Return cached data if valid
        }

        try {
            const response = await fetch(healthNewsUrl);
            const data = await response.json();
            // // Cache the new data and set expiration time (24 hours)
            await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data.posts));
            await AsyncStorage.setItem(
                CACHE_EXPIRATION_KEY,
                (now + 24 * 60 * 60 * 1000).toString()
            );
            return data; // Return the newly fetched data
        } catch (error) {
            console.error('Failed to fetch news:', error);
            throw error; // Rethrow the error for handling elsewhere
        }
    };

    return {
        data: {},
        operations: {
            fetchHealthNews,
        },
    };
};
