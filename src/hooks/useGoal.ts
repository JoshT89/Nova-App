import { useState, useEffect } from "react";

type Goal = {
    id: string;
    title: string;
    description: string;
    progress: number;
    milestones: Array<{
        title: string;
        completed: boolean;
    }>;
};

export function useGoal(goalId: string) {
    const [goal, setGoal] = useState<Goal | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            const goals = {
                '1': {
                    id: '1',
                    title: "Get Healthier",
                    description: "Focus on improving physical and mental well-being through exercise, nutrition, and mindfulness practices.",
                    progress: 60,
                    milestones: [
                        { title: "Start daily meditation", completed: true },
                        { title: "Exercise 3 times per week", completed: true },
                        { title: "Improve sleep schedule", completed: false },
                        { title: "Eat more vegetables", completed: false },
                    ],
                },
                '2': {
                    id: '2',
                    title: "Save Money",
                    description: "Build financial security through smart budgeting, investing, and spending habits.",
                    progress: 45,
                    milestones: [
                        { title: "Create monthly budget", completed: true },
                        { title: "Set up emergency fund", completed: true },
                        { title: "Cut unnecessary subscriptions", completed: false },
                        { title: "Start retirement contributions", completed: false },
                    ],
                },
                '3': {
                    id: '3',
                    title: "Learn New Skills",
                    description: "Expand knowledge and capabilities through structured learning and practical application.",
                    progress: 30,
                    milestones: [
                        { title: "Choose learning path", completed: true },
                        { title: "Complete online course", completed: false },
                        { title: "Build practice project", completed: false },
                        { title: "Join study group", completed: false },
                    ],
                }
            };

            setGoal(goals[goalId as keyof typeof goals] || null);
            setLoading(false);
        }, 1000);
    }, [goalId]);

    return { goal, loading };
}