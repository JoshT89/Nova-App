// src/data/youtube.ts

import { getValidAccessToken } from '../utils/auth';

/**
 * Fetches the user's YouTube activities (e.g., watched videos, liked videos, etc.)
 */
export const fetchYouTubeActivities = async (): Promise<any[]> => {
    try {
        const accessToken = await getValidAccessToken();

        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/activities?part=snippet,contentDetails&mine=true&maxResults=50`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Authentication token expired or invalid');
            }
            throw new Error(`YouTube API error: ${response.status}`);
        }

        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error fetching YouTube activities:', error);
        throw error;
    }
};

/**
 * Fetches the user's YouTube subscriptions (channels they are subscribed to)
 */
export const fetchYouTubeSubscriptions = async (): Promise<any[]> => {
    try {
        const accessToken = await getValidAccessToken();
        
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=50`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Authentication token expired or invalid');
            }
            throw new Error(`YouTube API error: ${response.status}`);
        }

        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error fetching YouTube subscriptions:', error);
        throw error;
    }
};