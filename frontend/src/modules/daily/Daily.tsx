import { useState, useEffect } from "react";
import { getUser } from "@/api/users_api";
import NewUserForm from "./components/NewUserForm";
import Greeting from "./components/Greeting";
import { Users } from "@/interfaces/Users";
import DailyForm from "./components/DailyForm";
import { WellnessInputs } from "@/interfaces/WellnessInputs";
import { WellnessNotes } from "@/interfaces/WellnessNotes";
import { Days } from "@/interfaces/Days";
import { getDays, postDays } from "@/api/days_api";
import { Recommendations } from "@/interfaces/Recommendations";

const recommendationCategories = {
    "1": "Active Rest",
    "2": "Food",
    "3": "Music",
    "4": "Passive Rest",
    "5": "Productivity"
};

export default function Daily() {
    const [getStartedClicked, setGetStartedClicked] = useState(false);
    const [userExists, setUserExists] = useState<boolean>();
    const [user, setUser] = useState<Users>();
    const [newDay, setNewDay] = useState<boolean>();
    const [today, setToday] = useState<Days>();
    const [wellnessInputs, setWellnessInputs] = useState<WellnessInputs[]>([]);
    const [wellnessNote, setWellnessNote] = useState<WellnessNotes>();
    const [recommendations, setRecommendations] = useState<Recommendations[]>();

    useEffect(() => {
        async function fetchData() {
            const result = await getUser();
            const days = await getDays();

            if (result?.id) {
                console.log(result);
                setUserExists(true);
                setUser(result);
            }
            else setUserExists(false);

            const today = new Date();
            const todayDb = days.find(d => {
                const date = new Date(d.date_field);
                console.log(date.getFullYear(), date.getMonth() + 1, date.getDate() + 1);
                console.log(today.getFullYear(), today.getMonth(), today.getDate());
                return (date.getFullYear() == today.getFullYear()) && (date.getMonth() + 1 == today.getMonth()) && (date.getDate() + 1 == today.getDate());
            });

            if (todayDb) {
                setNewDay(true);
                setToday(todayDb);
            }
            else {
                setNewDay(false);
                const today = new Date();
                const day: Days = {
                    date_field: `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
                };
                const resultDays = await postDays(day);
                setToday(resultDays);
            }
        }

        fetchData();
    }, []);

    function onSuccessRegister(user: Users) {
        setUserExists(true);
        setUser(user);
    }

    function onSuccessDailySubmit(resultInputs: WellnessInputs[], resultNote: WellnessNotes, resultRecommendations: Recommendations[]) {
        console.log("RESULT INPUTS FRONTEND", resultInputs);
        setWellnessInputs(resultInputs);
        setWellnessNote(resultNote);
        setRecommendations(resultRecommendations);
        setNewDay(true);

        console.log("GPT RECS", resultRecommendations);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-2xl space-y-6">
                <h1 className="text-3xl font-bold text-center mb-4">Check-In Buddy</h1>

                <h2>Today: {today?.date_field}</h2>

                {!userExists &&
                    <div className="bg-white shadow-md rounded-2xl p-6">
                        <Greeting onGetStarted={() => setGetStartedClicked(true)} />
                    </div>
                }

                {(user && today) ?
                    newDay ? 
                    <div className="bg-white shadow-md rounded-2xl p-6">
                        New Day
                    </div>
                    :
                    <div className="bg-white shadow-md rounded-2xl p-6">
                        <DailyForm user={user} day={today} onSuccess={onSuccessDailySubmit} />
                    </div>
                    :
                    getStartedClicked ?
                        <div className="bg-white shadow-md rounded-2xl p-6">
                            <NewUserForm onSuccess={onSuccessRegister} />
                        </div>
                        :
                        null
                }
            </div>
        </div>
    );
}
