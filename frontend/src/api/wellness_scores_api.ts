import { WellnessScores } from "@/interfaces/WellnessScores";

const api: string = "http://localhost:8000/app";

export async function getDailyScores(): Promise<WellnessScores[]> {
    const result = await fetch(`${api}/daily-quotes/`);
    const quotes: WellnessScores[] = await result.json();
    return quotes;
}

export async function postWellnessScores(score: WellnessScores) {
    const result = await fetch(`${api}/wellness-scores/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(score)
    });
    const newScore = await result.json();
    return newScore;
}