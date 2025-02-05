import { useState, useEffect } from "react";

type Insight = {
    id: string;
    title: string;
    description: string;
    type: string;
};

export function useInsights() {
    const [insights, setInsights] = useState<Insight[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setInsights([
                {
                     id: 1,
      title: 'Exercise Pattern Detected',
      description: 'Analyze your exercise habits and get tailored recommendations.',
      link: '/exercise-pattern',
    },
    {
      id: 2,
      title: 'Financial Opportunity',
      description: 'Discover ways to improve your financial health.',
      link: '/financial-opportunity',
    },
    {
      id: 3,
      title: 'Learning Recommendation',
      description: 'Find courses and materials to upskill effectively.',
      link: '/learning-recommendation',
    },
    {
      id: 4,
      title: 'Sites of Interest',
      description: 'Explore interesting sites using Google Maps, YouTube, and financial data.',
      link: '/sites-of-interest',
    },
    {
      id: 5,
      title: 'Chat',
      description: 'Connect with like-minded individuals and make new friends.',
      link: '/chat',
                },
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    return { insights, loading };
}