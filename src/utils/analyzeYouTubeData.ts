type Insight = {
    id: string;
    title: string;
    description: string;
    link: string;
};

export const analyzeYouTubeData = (activities: any[], subscriptions: any[]): Insight[] => {
    const insights: Insight[] = [];

    // Exercise Pattern Detected
    const exerciseVideos = activities.filter((activity) =>
        activity.snippet.title.toLowerCase().includes('exercise') ||
        activity.snippet.title.toLowerCase().includes('fitness') ||
        activity.snippet.title.toLowerCase().includes('workout')
    );
    if (exerciseVideos.length > 0) {
        insights.push({
            id: '1',
            title: 'Exercise Pattern Detected',
            description: 'Analyze your exercise habits and get tailored recommendations.',
            link: '/exercise-pattern',
        });
    }

    // Financial Opportunity
    const financeVideos = activities.filter((activity) =>
        activity.snippet.title.toLowerCase().includes('finance') ||
        activity.snippet.title.toLowerCase().includes('investment') ||
        activity.snippet.title.toLowerCase().includes('money')
    );
    if (financeVideos.length > 0) {
        insights.push({
            id: '2',
            title: 'Financial Opportunity',
            description: 'Discover ways to improve your financial health.',
            link: '/financial-opportunity',
        });
    }

    // Learning Recommendation
    const learningVideos = activities.filter((activity) =>
        activity.snippet.title.toLowerCase().includes('learn') ||
        activity.snippet.title.toLowerCase().includes('education') ||
        activity.snippet.title.toLowerCase().includes('course')
    );
    if (learningVideos.length > 0) {
        insights.push({
            id: '3',
            title: 'Learning Recommendation',
            description: 'Find courses and materials to upskill effectively.',
            link: '/learning-recommendation',
        });
    }

    // Locations of Interest
    const travelVideos = activities.filter((activity) =>
        activity.snippet.title.toLowerCase().includes('travel') ||
        activity.snippet.title.toLowerCase().includes('location') ||
        activity.snippet.title.toLowerCase().includes('destination')
    );
    if (travelVideos.length > 0) {
        insights.push({
            id: '4',
            title: 'Locations of Interest',
            description: 'Explore interesting sites using Google Maps, YouTube, and financial data.',
            link: '/locations-of-interest',
        });
    }

    // Chat to Like-Minded People
    const likeMindedSubscriptions = subscriptions.filter((subscription) =>
        subscription.snippet.title.toLowerCase().includes('community') ||
        subscription.snippet.title.toLowerCase().includes('group') ||
        subscription.snippet.title.toLowerCase().includes('forum')
    );
    if (likeMindedSubscriptions.length > 0) {
        insights.push({
            id: '5',
            title: 'Chat to Like-Minded People',
            description: 'Connect with like-minded individuals and make new friends.',
            link: '/chat',
        });
    }

    return insights;
};