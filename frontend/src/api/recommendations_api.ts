import { Recommendations } from "@/interfaces/Recommendations";

const api: string = "http://localhost:8000/app";

export async function getRecommendations(): Promise<Recommendations[]> {
    const result = await fetch(`${api}/recommendations/`);
    const recs: Recommendations[] = await result.json();
    return recs;
}

export async function postRecommendationArray(recs: Recommendations[]): Promise<Recommendations[]> {
    const results: Recommendations[] = [];
    recs.forEach(async (rec: Recommendations) => {
        const result = await fetch(`${api}/recommendations/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(rec)
        });
        const newRec = await result.json();
        results.push(newRec);
    });

    return results;
}