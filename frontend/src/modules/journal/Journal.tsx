import { Card } from "@/components/ui/card";
const dummyCards = [
    {
      id: 1,
      title: 'Inspiring Journey',
      description: 'Embark on a quest full of challenges and discover hidden truths along the way.',
      link: '/details/1',
    },
    {
      id: 2,
      title: 'Mystery of the Night',
      description: 'Delve into enigmatic stories that reveal the beauty of the unseen world.',
      link: '/details/2',
    },
    {
      id: 3,
      title: 'Adventure Awaits',
      description: 'Prepare for unexpected twists and turns on this epic adventure.',
      link: '/details/3',
    },
    {
      id: 4,
      title: 'The Essence of Time',
      description: 'Reflect on the fleeting moments that make life truly extraordinary.',
      link: '/details/4',
    },
    {
      id: 5,
      title: 'Wonders of the World',
      description: 'Explore inspiring narratives and timeless stories from every corner of the globe.',
      link: '/details/5',
    },
  ];



export default function Journal() {
    return <div>Journal Page
        <div className="flex h-screen">
            <div className="overflow-y-scroll">
            {dummyCards.map((card) => (
                <div
                key={card.id}
                className="card m-4 p-4 border rounded shadow-sm"
                >
                <h2 className="text-xl font-bold mb-2">{card.title}</h2>
                <p className="mb-2">{card.description}</p>
                <a className="text-blue-500 hover:underline" href={card.link}>
                    Read More
                </a>
                </div>
            ))}
            </div>
        </div>
    </div>;
}