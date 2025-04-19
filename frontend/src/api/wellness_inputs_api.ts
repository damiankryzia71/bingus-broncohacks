import { WellnessInputs } from "@/interfaces/WellnessInputs";

const api: string = "http://localhost:8000/app";

export async function postWellnessInputs(inputs: WellnessInputs): Promise<WellnessInputs> {
    console.log("PAYLOAD BEING SENT", inputs);
    const result = await fetch(`${api}/wellness-inputs/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(inputs)
    });

    const newInput = await result.json();


    return newInput;
}