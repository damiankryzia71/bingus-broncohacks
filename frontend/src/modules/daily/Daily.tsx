import { useState, useEffect } from "react";
import { getUser } from "@/api/daily_api";
import NewUserForm from "./components/NewUserForm";
import Greeting from "./components/Greeting";
import { Users } from "@/interfaces/users";

export default function Daily() {
    const [getStartedClicked, setGetStartedClicked] = useState(false);
    const [userExists, setUserExists] = useState<boolean>();
    const [user, setUser] = useState<Users>();

    useEffect(() => {
        async function fetchData() {
            const result = await getUser();
            if (result?.id) {
                console.log(result);
                setUserExists(true);
                setUser(result);
            }
            else setUserExists(false);
        }

        fetchData();
    }, []);

    function onSuccessRegister(user: Users) {
        setUserExists(true);
        setUser(user);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-2xl space-y-6">
                <h1 className="text-3xl font-bold text-center mb-4">Check-In Buddy</h1>

                <div className="bg-white shadow-md rounded-2xl p-6">
                    <Greeting onGetStarted={() => setGetStartedClicked(true)} />
                </div>

                {getStartedClicked && !userExists && (
                    <div className="bg-white shadow-md rounded-2xl p-6">
                        <NewUserForm onSuccess={onSuccessRegister} />
                    </div>
                )}
            </div>
        </div>
    );
}
