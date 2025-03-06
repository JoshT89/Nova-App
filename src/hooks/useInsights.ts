import { useEffect, useState } from 'react';
import { fetchYouTubeActivities, fetchYouTubeSubscriptions } from '../data/youtube';
import { analyzeYouTubeData } from '../utils/analyzeYouTubeData';
import { getStoredTokens } from '../utils/auth';

export const useInsights = (youtubeToken: string | null) => {
    const [insights, setInsights] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Check if we have valid tokens
                const tokens = await getStoredTokens();
                if (!tokens?.accessToken) {
                    // Return fallback insights if no authentication
                    setInsights([
                        {
                            id: "1",
                            title: "Exercise Pattern Detected",
                            description: "Analyze your exercise habits and get tailored recommendations.",
                            link: "/exercise-pattern",
                        },
                        // ... other fallback insights
                    ]);
                    return;
                }

                // Fetch and analyze data
                const [activities, subscriptions] = await Promise.all([
                    fetchYouTubeActivities(),
                    fetchYouTubeSubscriptions(),
                ]);

                const analyzedInsights = analyzeYouTubeData(activities, subscriptions);
                setInsights(analyzedInsights);
            } catch (error) {
                console.error('Error in useInsights:', error);
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
                
                // Set fallback insights on error
                setInsights([
                    {
                        id: "1",
                        title: "Exercise Pattern Detected",
                        description: "Analyze your exercise habits and get tailored recommendations.",
                        link: "/exercise-pattern",
                    },
                    // ... other fallback insights
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { insights, loading, error };
};
