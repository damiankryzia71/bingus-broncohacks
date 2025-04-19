import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";


export default function Home() {
    const [text, setText] = useState<string>("");

    useEffect(() => {
        async function fetchData() {
            const result = await fetch("http://localhost:8000/app");
            const text = await result.text();
            setText(text);
        }

        fetchData();
    }, []);

    return (
        <div>
            <h1>Home Page</h1>
            <div>API RESULT: {text}</div>
        </div>
    );
}