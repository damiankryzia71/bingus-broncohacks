import { WellnessNotes } from "@/interfaces/WellnessNotes";

const api: string = "http://localhost:8000/app";

export async function postWellnessNotes(note: WellnessNotes): Promise<WellnessNotes> {
    const result = await fetch(`${api}/wellness-notes/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
    });

    const newNote = await result.json();
    return newNote;
}