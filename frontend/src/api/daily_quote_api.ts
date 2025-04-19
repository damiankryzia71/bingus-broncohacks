import { DailyQuotes } from "@/interfaces/DailyQuotes";

const api: string = "http://localhost:8000/app";

export async function postDailyQuote(quote: DailyQuotes) {
    const result = await fetch(`${api}/daily-quotes/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(quote)
    });
    const newQuote = await result.json();
    return newQuote;
}