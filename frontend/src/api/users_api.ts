import { Users } from "@/interfaces/Users";

const api: string = "http://localhost:8000/app";

export async function getUser(): Promise<Users> {
        const result = await fetch(`${api}/users/`);
        const users = await result.json();
        const user = users[0];
        return user;
}

export async function postUsers(user: Users): Promise<Users> {
    const result = await fetch(`${api}/users/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    const newUser = await result.json();
    return newUser;
}