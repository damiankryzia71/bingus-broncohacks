const api: string = "http://localhost:8000/app";

const userId: number = 3; // assume user is always logged in for this app

export async function getUser() {
        const result = await fetch(`${api}/users/${userId}`);
        const user = await result.json();
        return user;
}

export async function postUsers(user: any) {
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