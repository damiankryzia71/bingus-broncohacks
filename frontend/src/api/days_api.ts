import { Days } from "@/interfaces/Days";

const api: string = "http://localhost:8000/app";

export async function getDays(): Promise<Days[]> {
    const result = await fetch(`${api}/days/`);
    const days: Days[] = await result.json();
    return days;
}

export async function postDays(days: Days): Promise<Days> {
    const result = await fetch(`${api}/days/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(days)
    });

    const newDay = await result.json();
    return newDay;
}