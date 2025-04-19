import { useState } from "react";

import { Button } from "@/components/ui/button";

export default function Greeting({ onGetStarted }: { onGetStarted: () => void }) {
    const [getStartedClicked, setGetStartedClicked] = useState<boolean>(false);

    return (
        <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Hey there, welcome! 👋</h2>
            {getStartedClicked ? 
                <p className="text-lg text-gray-700 mb-4">
                    Before we dive in, I’d love to get to know you a little better. <br />
                    Let’s start with a few quick questions about you. <br />
                    Please, answer as honestly as possible so that I can help you better!
                </p> 
            : 
                <p className="text-lg text-gray-700 mb-4">
                    I'm your check-in buddy — here to support you on your wellness journey. <br />
                </p>
            }
            {!getStartedClicked && <Button onClick={() => { setGetStartedClicked(true); onGetStarted(); }}>Get Started</Button>}
        </div>
    );
}
