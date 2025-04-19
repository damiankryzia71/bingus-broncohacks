import { Card, CardContent } from "@/components/ui/card";
import { Car } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const dummyCards = [
  {
    title: "Active Rest",
    cards: [
      { id: 1, title: "Go for a Walk", description: "Enjoy fresh air and nature.", link: "#" },
      { id: 2, title: "Stretch", description: "Loosen up with a quick stretch.", link: "#" },
      { id: 3, title: "Dance Break", description: "Play music and dance!", link: "#" },
    ],
  },
  {
    title: "Passive Rest",
    cards: [
      { id: 5, title: "Read a Book", description: "Escape into a different world.", link: "#" },
      { id: 6, title: "Meditate", description: "Calm your mind.", link: "#" },
      { id: 7, title: "Watch a Movie", description: "Enjoy a relaxing film.", link: "#" },
    ],
  },
  {
    title: "Music",
    cards: [
      { id: 9, title: "Favorite Playlist", description: "Play your top hits.", link: "#" },
      { id: 10, title: "Classical Relaxation", description: "Calm classical music.", link: "#" },
      { id: 11, title: "Upbeat Mix", description: "Energetic songs to boost your mood.", link: "#" },
    ],
  },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col space-y-12 p-8">

      {/* Daily Quote */}
      <div className="text-center">
        <h2 className="text-2xl italic text-gray-700 underline">
          The key to a healthy life is having a healthy mind
        </h2>
      </div>

      {/* Wellness Progress */}
      <div className="flex flex-col items-end space-y-2">
        <div className="text-right">
          <div className="text-lg font-bold text-gray-700">Wellness Level</div>
          <div className="text-sm text-gray-500">Hang in there!</div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3">
          <Progress value={10} className="h-4" />
        </div>
      </div>

      {/* Sections with Cards */}
      <div className="flex flex-col space-y-12">
        {dummyCards.map((section) => (
          <div key={section.title}>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{section.title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {section.cards.map((card) => (
                <Card key={card.id} className="p-4 hover:shadow-md transition">
                  <CardContent className="flex flex-col space-y-2">
                    <h3 className="text-lg font-semibold">{card.title}</h3>
                    <p className="text-gray-600">{card.description}</p>
                    <a href={card.link} className="text-blue-500 hover:underline text-sm">
                      Read More
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}