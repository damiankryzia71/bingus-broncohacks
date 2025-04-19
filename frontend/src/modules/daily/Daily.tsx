import { useState, useEffect } from "react";
import { getUser } from "@/api/users_api";
import NewUserForm from "./components/NewUserForm";
import Greeting from "./components/Greeting";
import { Users } from "@/interfaces/Users";
import DailyForm from "./components/DailyForm";
import { Days } from "@/interfaces/Days";
import { getDays, postDays } from "@/api/days_api";
import { Recommendations } from "@/interfaces/Recommendations";
import { DailyQuotes } from "@/interfaces/DailyQuotes";
import { WellnessScores } from "@/interfaces/WellnessScores";
import { getRecommendations } from "@/api/recommendations_api";
import { getDailyQuotes } from "@/api/daily_quote_api";
import { getDailyScores } from "@/api/wellness_scores_api";

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
    const [recommendations, setRecommendations] = useState<Recommendations[]>();
    const [dailyScore, setDailyScore] = useState<WellnessScores>();
    const [dailyQuote, setDailyQuote] = useState<DailyQuotes>();

    useEffect(() => {
        async function fetchData() {
            const user = await getUser();

            const todayDate = new Date();
            const today: Days = {
                date_field: `${todayDate.getFullYear()}-${(todayDate.getMonth() + 1).toString().length === 1 ? "0" + (todayDate.getMonth() + 1) : todayDate.getMonth() + 1}-${todayDate.getDate()}`
            };

            if (user) {
                setUser(user);
                setUserExists(true);

                const days = await getDays();
                const todayDb = days.find((d: Days) => (d.date_field == today.date_field));

                if (todayDb) {
                    setToday(todayDb);

                    const recommendationsResult = await getRecommendations();
                    setRecommendations(recommendationsResult.filter((r: Recommendations) => r.user === user.id && r.day === today.id));

                    const dailyQuoteResult = await getDailyQuotes();
                    setDailyQuote(dailyQuoteResult.find((q: DailyQuotes) => (q.user === user.id && q.day === today.id)));

                    const dailyScoreResult = await getDailyScores();
                    setDailyScore(dailyScoreResult.find((s: WellnessScores) => (s.user === user.id && s.day === today.id)));

                    if (recommendationsResult.length > 0) setNewDay(false); else setNewDay(true);
                }
                else {
                    setNewDay(true);
                    const result: Days = await postDays(today);
                    setToday(result);
                }
            }
            else {
                setUserExists(false);
                setNewDay(true);
                const result: Days = await postDays(today);
                setToday(result);
            }
        }

        fetchData();
    }, []);

    function onSuccessRegister(user: Users) {
        setUserExists(true);
        setUser(user);
    }

    function onSuccessDailySubmit(resultRecommendations: Recommendations[], resultQuote: DailyQuotes, resultScore: WellnessScores) {
        setRecommendations(resultRecommendations);
        setDailyQuote(resultQuote);
        setDailyScore(resultScore);
        setNewDay(false);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-2xl space-y-6">
                {userExists ?
                    (newDay && user && today ?
                        <DailyForm user={user} day={today} onSuccess={onSuccessDailySubmit} />
                        :
                        <div>Display Recommendations, Daily Quote, Daily Score</div>
                    )
                    :
                    (
                        <div className="flex flex-col gap-10">
                            <Greeting onGetStarted={() => { setGetStartedClicked(true) }} />
                            <div>
                                {getStartedClicked ?
                                    <NewUserForm onSuccess={onSuccessRegister} />
                                    :
                                    null
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
